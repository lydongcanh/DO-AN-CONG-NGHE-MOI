import React, { Component } from "react";
import { Table, Tag, Modal, Button, Divider } from "antd";
import TeacherAddScoreModal from "./teacher-add-score-modal";
import ScoreRepo from "../../repository/prop/score-repository";
import ScoreboardRepo from "../../repository/prop/scoreboard-repository";
import scoreTypes from "../../types/scoreTypes";

/** [Required props: visible, onOk, onCancel, semester, subject, students] */
export default class TeacherAddScoresModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addScoreModalVisible: false,
            selectedStudent: {},
            selectedType: "",
            scoreboardId: "",
            renderScores: {},
            newScores: [],
            scoreboards: [],
        };

        this.handleAddSingleScoreButton = this.handleAddSingleScoreButton.bind(this);
        this.handleAddMultipleScoreButton = this.handleAddMultipleScoreButton.bind(this);
        this.handleAddScoreModalOk = this.handleAddScoreModalOk.bind(this);
        this.handleAddScoreModalCancel = this.handleAddScoreModalCancel.bind(this);
    }

    async componentWillReceiveProps(props) {
        let renderScores = {};
        let scoreboards = [];

        for (let i = 0; i < props.students.length; i++) {
            const student = props.students[i];
            const scoreboardResult = await ScoreboardRepo.getScoreboardsByStudentIdSemesterGrade(
                student.id, props.semester, student.grade
            );
            scoreboards.push(scoreboardResult);

            const studentScores = await ScoreRepo.getScoreByScoreboardId(scoreboardResult.id);
            renderScores[`${scoreboardResult.id}`] =  studentScores;
        }

        this.setState({
            renderScores: renderScores,
            scoreboards: scoreboards
        });
    }

    get columns() {
        let result = [
            {
                title: "TT",
                dataIndex: "count",
                key: "count"
            },
            {
                title: "Tên",
                dataIndex: "studentName",
                key: "studentName"
            },
            {
                title: "Ngày sinh",
                dataIndex: "studentBirthday",
                key: "studentBirthday"
            }
        ];

        for (let i = 0; i < scoreTypes.length; i++) {
            const type = scoreTypes[i];
            result.push({
                title: () => {
                    if (type == "Kiểm tra miệng")
                        return "Kiểm tra miệng";

                    return (
                        <span>
                            {type}
                            <Divider type="vertical" />
                            <Button
                                onClick={() => this.handleAddMultipleScoreButton(type)}
                                size="small"
                                shape="circle"
                                icon="plus"
                            />
                        </span>
                    );
                },
                dataIndex: type,
                key: type,
                render: (scores, row, index) => {
                    let views = [];

                    if (scores && scores.length > 0) {
                        for (let i = 0; i < scores.length; i++) {
                            views.push(
                                <Tag
                                    key={scores[i].id}
                                    color={this.getTagColorWithScore(scores[i].value)}>
                                    {scores[i].value}
                                </Tag>
                            )
                        }
                    }

                    views.push(
                        <Button
                            key={"AddSingleButton" + index}
                            onClick={() => this.handleAddSingleScoreButton(type, index)}
                            size="small"
                            shape="circle"
                            icon="plus" />
                    );

                    return views;
                }
            });
        }

        return result;
    }

    get dataSource() {
        const students = this.props.students;
        const scoreboards = this.state.scoreboards;

        if (!students || students.length < 1 || !scoreboards || scoreboards.length < 1)
            return [];

        let result = [];
        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const scoreboard = scoreboards[i];
            const scores = this.state.renderScores[`${scoreboard.id}`];

            let item = {
                count: i + 1,
                studentName: student.name,
                studentBirthday: student.birthday,
            }

            for (let j = 0; j < scoreTypes.length; j++) {
                const type = scoreTypes[j];
                const matchedScore = scores.filter(score => score.type == type);
                item[`${type}`] = matchedScore;
            }

            result.push(item);
        }

        return result;
    }

    handleAddScoreModalOk(value, type, multiplier, scoreboardId) {
        const newScore = {
            value: value,
            type: type,
            multiplier: multiplier,
            scoreboardId: scoreboardId
        };
        
        let renderScores = this.state.renderScores;
        renderScores[`${scoreboardId}`] = [...renderScores[`${scoreboardId}`], newScore];
        console.log("render score", renderScores);

        this.setState(state => ({
            newScores: [...state.newScores, newScore],
            renderScores: renderScores
        }));

        this.handleAddScoreModalCancel();
    }

    handleAddScoreModalCancel() {
        this.setState({
            addScoreModalVisible: false,
            selectedStudent: {},
            selectedType: "",
        });
    }

    /** Nút nhập từng điểm trong từng ô */
    handleAddSingleScoreButton(type, index) {
        this.setState({
            selectedStudent: this.props.students[index],
            selectedType: type,
            scoreboardId: this.state.scoreboards[index].id,
            addScoreModalVisible: true
        });
    }

    /** Nút nhập nhiều điểm trên đầu headers */
    handleAddMultipleScoreButton(type) {
        console.log("insert multiple", type);
    }

    getTagColorWithScore(score) {
        if (score < 5) {
            return "red";
        }

        return "blue";
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onOk={() => this.props.onOk(this.state.newScores, this.props.subject)}
                onCancel={this.props.onCancel}
                okText="Lưu"
                cancelText="Hủy"
                closable={false}
                centered
                width={1000}
            >
                <Table
                    title={() => "Nhập điểm"}
                    rowKey={record => record.count}
                    bordered
                    size="small"
                    columns={this.columns}
                    dataSource={this.dataSource}
                />
                <TeacherAddScoreModal
                    student={this.state.selectedStudent}
                    type={this.state.selectedType}
                    scoreboardId={this.state.scoreboardId}
                    onOk={this.handleAddScoreModalOk}
                    onCancel={this.handleAddScoreModalCancel}
                    visible={this.state.addScoreModalVisible}
                />
            </Modal>
        );
    }
}
import React, { Component } from "react";
import { Table, Tag, Modal, InputNumber, Progress, message } from "antd";
import ScoreRepo from "../../repository/prop/score-repository";
import ScoreboardRepo from "../../repository/prop/scoreboard-repository";
import scoreTypes, { getMultiplierFromType } from "../../types/scoreTypes";

/** [Required props: visible, onFinish, semester, subject, students] */
export default class TeacherAddScoresModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scoreboardId: "",
            oldScores: {},
            addScoresProgressValue: 0,
            newScores: {},
            scoreboards: [],
        };

        this.handleAddSingleScoreButton = this.handleAddSingleScoreButton.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
        this.resetAndFinish = this.resetAndFinish.bind(this);
    }

    async componentWillReceiveProps(props) {
        let oldScores = {};
        let scoreboards = [];

        for (let i = 0; i < props.students.length; i++) {
            const student = props.students[i];
            const scoreboardResult = await ScoreboardRepo.getScoreboardsByStudentIdSemesterGrade(
                student.id, props.semester, student.grade
            );
            scoreboards.push(scoreboardResult);

            const studentScores = await ScoreRepo.getScoreByScoreboardId(scoreboardResult.id);
            oldScores[`${scoreboardResult.id}`] =  studentScores;
        }

        this.setState({
            oldScores: oldScores,
            scoreboards: scoreboards
        });
    }

    get columns() {
        let result = [
            {
                title: "Tên",
                dataIndex: "studentName",
                key: "studentName",
                align: "center",
                sorter: (a, b) => a.studentName.localeCompare(b.studentName)
            },
            {
                title: "Ngày sinh",
                dataIndex: "studentBirthday",
                key: "studentBirthday",
                align: "center",
            }
        ];

        for (let i = 0; i < scoreTypes.length; i++) {
            const type = scoreTypes[i];
            result.push({
                align: "center",
                dataIndex: type,
                key: type,
                title: type,
                render: (scores, row, index) => {
                    let views = [];

                    // Render các điểm có sẵn.
                    let hasScore = false;
                    if (scores && scores.length > 0) {
                        hasScore = true;
                        for (let i = 0; i < scores.length; i++) {
                            views.push(
                                <Tag
                                    key={"Tag" + row.valueOf() + index.valueOf() + scores[i].id}
                                    color={this.getTagColorWithScore(scores[i].value)}>
                                    {scores[i].value}
                                </Tag>
                            )
                        }
                    }

                    // Điểm giữa kỳ & cuối kỳ chỉ có 1 điểm duy nhất.
                    if (hasScore && (type == "Giữa kỳ" || type == "Cuối kỳ"))
                        return views;

                    views.push(
                        <InputNumber 
                            key={"InputNumber" + row.valueOf() + index.valueOf()}
                            min={0}
                            max={10}
                            step={0.01}
                            onChange={async (value) => await this.handleAddSingleScoreButton(row, value, type)}
                        />
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
            const scores = this.state.oldScores[`${scoreboard.id}`];

            let item = {
                count: i + 1,
                studentName: student.name,
                studentBirthday: student.birthday,
            }

            if (scores && scores.length > 0) {
                for (let j = 0; j < scoreTypes.length; j++) {
                    const type = scoreTypes[j];
                    const matchedScore = scores.filter(score => score.type == type);
                    item[`${type}`] = matchedScore;
                }
            }

            result.push(item);
        }

        return result;
    }

    /** Lưu toàn bộ điểm mới */
    async handleSaveButton() {
        // Lọc những điểm nhập rồi xóa đi.
        let validScores = [];
        const newScores = this.state.newScores;
        for (let prop in newScores) {
            if (Object.prototype.hasOwnProperty.call(newScores, prop)) {
                if (newScores[prop] && newScores[prop].value)
                    validScores.push(newScores[prop]);
            }
        }

        for(let i = 0; i < validScores.length; i++) {
            const score = validScores[i];
            await ScoreRepo.createScore(
                score.type,
                score.value,
                this.props.subject,
                score.multiplier,
                score.scoreboardId
            );
            const percent = (i + 1) / validScores.length * 100;
            this.setState({addScoresProgressValue: percent});
        }

        message.success("Nhập điểm thành công.");
        this.resetAndFinish();
    }

    /** Nút nhập từng điểm trong từng ô */
    async handleAddSingleScoreButton(row, value, type) {
        const student = this.props.students[row.count - 1];
        const scoreboard = await ScoreboardRepo.getScoreboardsByStudentIdSemesterGrade(student.id, this.props.semester, student.grade);
        const scoreboardId = scoreboard.id;

        const newScore = {
            value: value,
            type: type,
            multiplier: getMultiplierFromType(type),
            scoreboardId: scoreboardId
        };
        
        let newScores = this.state.newScores;
        newScores[`${scoreboardId}`] = newScore;

        this.setState({
            newScores: newScores
        });
    }

    getTagColorWithScore(score) {
        if (score < 5) {
            return "red";
        }

        return "blue";
    }

    resetAndFinish() {
        this.setState({
            newScores: {},
            addScoresProgressValue: 0,
            oldScores: {},
            scoreboard: [],
            scoreboardId: ""
        });
        this.props.onFinish();
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onOk={this.handleSaveButton}
                onCancel={this.resetAndFinish}
                title="Nhập điểm"
                centered
                closable={false}
                okText="Lưu"
                cancelText="Hủy"
                width={1000}
            >
                <Progress 
                    width="100%"
                    showInfo={false}
                    percent={this.state.addScoresProgressValue}
                />
                <br/><br/>
                <Table
                    rowKey={record => record.count}
                    bordered
                    title={() => <h3>Danh sách học sinh trong lớp</h3>}
                    size="small"
                    columns={this.columns}
                    dataSource={this.dataSource}
                />
            </Modal>
        );
    }
}
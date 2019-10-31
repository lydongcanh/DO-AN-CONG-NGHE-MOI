import React, { Component } from "react";
import { Table, Button, Divider } from "antd";
import TeacherAddScoresModal from "../../components/teachers/teacher-add-scores-modal";
import AccountRepo from "../../repository/prop/account-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";
import StudentRepo from "../../repository/prop/student-repository";
import TeacherRepo from "../../repository/prop/teacher-repository";
import ScoreRepo from "../../repository/prop/score-repository";

export default class TeacherScoresPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            students: [],
            subject: "",
            semester: "",
            addScoresModalVisible: false
        }

        this.handleInsertScoreButton = this.handleInsertScoreButton.bind(this);
        this.handleAddScoreModalFinish = this.handleAddScoreModalFinish.bind(this);
    }

    get columns() {
        return [
            {
                title: "TT",
                dataIndex: "count",
                key: "count",
            },
            {
                title: "Khối",
                dataIndex: "grade",
                key: "grade",
            },
            {
                title: "Tên",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Chức năng",
                render: (value) => {
                    return (
                        <span>
                            <Button 
                                type="primary" 
                                onClick={async () => await this.handleInsertScoreButton(value, "HK1")}
                            >
                                Nhập điểm học kỳ 1
                            </Button>
                            <Divider type="vertical"/>
                            <Button 
                                type="primary" 
                                onClick={async () => await this.handleInsertScoreButton(value, "HK2")}
                            >
                                Nhập điểm học kỳ 2
                            </Button>
                        </span>
                    );
                }
            }
        ];
    }

    async handleInsertScoreButton(studyclass, semester) {
        const students = await StudentRepo.getStudentsByClassId(studyclass.id);

        this.setState({
            students: students,
            semester: semester,
            addScoresModalVisible: true
        });
    }

    handleAddScoreModalFinish() {
        this.setState({
            addScoresModalVisible: false
        })
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const account = await AccountRepo.getAccountWithUsername(params.username);
        const schedules = await ScheduleRepo.getSchedulesByTeacherId(account.teacherId);
        const teacher = await TeacherRepo.getTeacherById(account.teacherId);
        const subject = teacher.subject;
        
        if (!schedules || schedules.length < 1)
            return;

        let classes = [];
        for(let i = 0; i < schedules.length; i++) {
            if (!classes.map(c => c.id).includes(schedules[i].classId)) {
                let studyclass = await ClassRepo.getStudyclassById(schedules[i].classId);
                studyclass.count = classes.length + 1;
                classes.push(studyclass);
            }
        }

        this.setState({
            classes: classes,
            subject: subject
        });
    }

    render() {
        return (
            <div>
                <Table
                    title={() => <h2 style={{textAlign: "start"}}>Danh sách các lớp giảng dạy</h2>}
                    bordered
                    pagination={{hideOnSinglePage: true}}
                    rowKey={record => record.count}
                    columns={this.columns}
                    dataSource={this.state.classes}
                />
                <TeacherAddScoresModal 
                    subject={this.state.subject}
                    semester={this.state.semester}
                    onFinish={this.handleAddScoreModalFinish}
                    students={this.state.students}
                    visible={this.state.addScoresModalVisible}
                />
            </div>
        );
    }
}
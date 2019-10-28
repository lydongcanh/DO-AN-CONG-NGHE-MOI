import React, { Component } from "react";
import { Table, Button, Modal } from "antd";
import TeacherAddScoresModal from "../../components/teachers/teacher-add-scores-modal";
import AccountRepo from "../../repository/prop/account-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";
import StudentRepo from "../../repository/prop/student-repository";

export default class TeacherScoresPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            students: [],
            addScoresModalVisible: false
        }

        this.handleInsertScoreButton = this.handleInsertScoreButton.bind(this);
        this.handleAddScoreModalCancel = this.handleAddScoreModalCancel.bind(this);
        this.handleAddScoreModalOk = this.handleAddScoreModalOk.bind(this);
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
                        <Button type="primary" onClick={async () => await this.handleInsertScoreButton(value)}>Nhập điểm</Button>
                    );
                }
            }
        ];
    }

    async handleInsertScoreButton(studyclass) {
        const students = await StudentRepo.getStudentsByClassId(studyclass.id);

        this.setState({
            students: students,
            addScoresModalVisible: true
        });
    }

    handleAddScoreModalCancel() {
        this.setState({
            addScoresModalVisible: false
        })
    }

    async handleAddScoreModalOk() {

    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const account = await AccountRepo.getAccountWithUsername(params.username);
        const schedules = await ScheduleRepo.getSchedulesByTeacherId(account.teacherId);
        
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
            classes: classes
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
                    onOk={this.handleAddScoreModalOk}
                    onCancel={this.handleAddScoreModalCancel}
                    students={this.state.students}
                    visible={this.state.addScoresModalVisible}
                />
            </div>
        );
    }
}
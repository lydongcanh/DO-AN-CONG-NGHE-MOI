import React, { Component } from "react";
import { Table, Button, Divider, Modal } from "antd";
import TeacherAddScores from "../../components/teachers/teacher-add-scores";

import mockDB from "../../repository/mock/mockDB";

export default class TeacherScoresPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: [],
            students: [],
            addScoresModalVisible: false
        }

        this.handleInsertScoreButton = this.handleInsertScoreButton.bind(this);
        this.handleCancelAddScoreModal = this.handleCancelAddScoreModal.bind(this);
    }

    get columns() {
        return [
            {
                title: "Id",
                dataIndex: "id",
                key: "id",
            },
            {
                title: "Lớp",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Năm bắt đầu",
                dataIndex: "startYear",
                key: "startYear",
            },
            {
                title: "Năm kết thúc",
                dataIndex: "endYear",
                key: "endYear",
            },
            {
                title: "Trạng thái",
                dataIndex: "state",
                key: "state"
            },
            {
                title: "Chức năng",
                render: (value) => {
                    return (
                        <span>
                            <Button type="primary" onClick={() => this.handleInsertScoreButton(value)}>Xem điểm</Button>
                            <Divider type="vertical" />
                            <Button type="primary">Nhập điểm</Button>
                        </span>
                    );
                }
            }
        ];
    }

    handleInsertScoreButton(e) {
        const students = mockDB.getStudentInClass(e.id);
        console.log(e, students);

        this.setState({
            students: students,
            addScoresModalVisible: true
        });
    }

    handleCancelAddScoreModal() {
        this.setState({
            addScoresModalVisible: false
        })
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const account = mockDB.getAccountWithUsername(params.username);
        const classes = mockDB.getTeacherClasses(account.teacherId);

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
                    columns={this.columns}
                    dataSource={this.state.classes}
                />
                <Modal 
                    visible={this.state.addScoresModalVisible}
                    footer={null} 
                    width="80%"
                    closable={false}
                    centered
                    onCancel={this.handleCancelAddScoreModal}
                >
                    <TeacherAddScores students={this.state.students}/>
                </Modal>
            </div>
        );
    }
}
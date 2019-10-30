import React, { Component } from "react";
import { Tag, Row, Col, Button, Table, Input } from "antd";
import StudentCreate from "../../components/students/student-create";
import StudentUpdate from "../../components/students/student-update";
import StudentRepo from "../../repository/prop/student-repository";

const { Search } = Input;

export default class AdminStudentsPage extends Component {
    columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            align: "center"
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            align: "center",
            render: gender => {
                return (
                    <Tag color={this.getGenderTagColor(gender)}>
                        {gender}
                    </Tag>
                )
            }
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            align: "center"
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
            align: "center"
        },
        {
            title: "Số điện thoại",
            key: "phoneNumber",
            align: "center",
            dataIndex: "phoneNumber",
        },
        {
            title: "Chức năng",
            key: "action",
            align: "center",
            render: student => {
                return (<Button type="primary" onClick={() => this.handleUpdateStudentClick(student)}>Sửa</Button>);
            }
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            searchedStudents: [],
            createStudentVisible: false,
            updateStudentVisible: false,
            updatingStudent: {}
        };

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleOnSearchStudent = this.handleOnSearchStudent.bind(this);
        this.handleCreateStudentSuccess = this.handleCreateStudentSuccess.bind(this);
        this.handleUpdateStudentClick = this.handleUpdateStudentClick.bind(this);
        this.handleUpdateStudentSuccess = this.handleUpdateStudentSuccess.bind(this);
    }

    title = () => {
        return (
            <Row type="flex" justify="start">
                <Col span={5}>
                    <h3>Danh sách tìm kiếm học sinh</h3>
                </Col>
                <Col span={3} offset={16}>
                    <Button onClick={this.handleCreateButtonClick}>
                        Thêm
                    </Button>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div>
                <Search 
                    placeholder="Nhập tên học sinh"
                    onSearch={this.handleOnSearchStudent}
                />
                <br/><br/>
                <Table 
                    title={this.title}
                    pagination={{pageSize: 9}} 
                    columns={this.columns} 
                    rowKey={record => record.id}
                    dataSource={this.state.searchedStudents}
                    bordered
                />
                <StudentCreate 
                    visible={this.state.createStudentVisible}
                    handleCancel={() => this.setState({createStudentVisible: false})}
                    handleSaveSuccess={this.handleCreateStudentSuccess}
                />
                <StudentUpdate
                    visible={this.state.updateStudentVisible}
                    handleCancel={() => this.setState({updateStudentVisible: false})}
                    handleSaveSuccess={this.handleUpdateStudentSuccess}
                    student={this.state.updatingStudent}
                />
            </div>
        );
    }

    handleCreateButtonClick() {
        this.setState({
            createStudentVisible: true
        });
    }

    handleUpdateStudentClick(student) {
        this.setState({
            updateStudentVisible: true,
            updatingStudent: student
        });
    }

    handleCreateStudentSuccess(student) {        
        let students = [student];
        this.setState({
            createStudentVisible: false,
            searchedStudents: students,
            updatingStudent: {}
        });
    }

    handleUpdateStudentSuccess(student) {
        let students = [student];
        this.setState({
            updateStudentVisible: false,
            searchedStudents: students
        })
    }

    async handleOnSearchStudent(value) {
        const seacherStudent = await StudentRepo.getStudentsByName(value);
        this.setState({
            searchedStudents: seacherStudent
        });
    }

    getGenderTagColor(gender) {
        if (gender == "Nam") {
            return "red";
        } else if (gender == "Nữ") {
            return "geekblue"
        } else {
            return "cyan";
        }
    }
}
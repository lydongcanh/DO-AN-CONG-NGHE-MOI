import React, { Component } from "react";
import { Tag, Row, Col, Button, Table, Input } from "antd";
import StudentCreate from "../../components/students/student-create";
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
            dataIndex: "phoneNumber",
        },
    ];

    constructor(props) {
        super(props);

        this.state = {
            searchedStudents: [],
            createStudentVisible: false
        };

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleOnSearchStudent = this.handleOnSearchStudent.bind(this);
        this.handleCreateStudentSuccess = this.handleCreateStudentSuccess.bind(this);
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
            </div>
        );
    }

    handleCreateButtonClick() {
        this.setState({
            createStudentVisible: true
        });
    }

    handleCreateStudentSuccess(student) {
        console.log("created student", student);
        
        let students = [student];
        this.setState({
            createStudentVisible: false,
            searchedStudents: students
        });
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
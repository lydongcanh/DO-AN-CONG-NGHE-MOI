import React, { Component } from "react";
import { Table, Tag, Switch, Button, Row, Col } from "antd";
import TeacherSearchInput from "../../components/teachers/teacher-search-input";
import TeacherCreate from "../../components/teachers/teacher-create";

export default class AdminTeachersPage extends Component {
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
            title: "Môn",
            dataIndex: "subject",
            key: "subject",
            align: "center"
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
            title: "Email",
            key: "email",
            dataIndex: "email",
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
            searchedTeachers: [],
            createTeacherVisible: false
        };

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleOnSearchTeacher = this.handleOnSearchTeacher.bind(this);
        this.handleCreateTeacherSuccess = this.handleCreateTeacherSuccess.bind(this);
    }

    title = () => {
        return (
            <Row type="flex" justify="start">
                <Col span={5}>
                    <h3>Danh sách tìm kiếm giáo viên</h3>
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
                <TeacherSearchInput onSearchTeacher={this.handleOnSearchTeacher}/>
                <br/><br/>
                <Table 
                    title={this.title}
                    pagination={{pageSize: 9}} 
                    columns={this.columns} 
                    rowKey={record => record.id}
                    dataSource={this.state.searchedTeachers}
                    bordered
                />
                <TeacherCreate 
                    visible={this.state.createTeacherVisible}
                    handleCancel={() => this.setState({createTeacherVisible: false})}
                    handleSaveSuccess={this.handleCreateTeacherSuccess}
                />
            </div>
        );
    }

    handleCreateButtonClick() {
        this.setState({
            createTeacherVisible: true
        });
    }

    handleCreateTeacherSuccess(teacher) {
        let teachers = [teacher];
        this.setState({
            createTeacherVisible: false,
            searchedTeachers: teachers
        });
    }

    handleOnSearchTeacher(teachers) {
        this.setState({
            searchedTeachers: teachers
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
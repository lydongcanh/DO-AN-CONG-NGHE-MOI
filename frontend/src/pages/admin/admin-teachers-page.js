import React, { Component } from "react";
import { Table, Tag, Switch, Button } from "antd";
import TeacherSearchInput from "../../components/teachers/teacher-search-input";
import TeacherCreate from "../../components/teachers/teacher-create";

export default class AdminTeachersPage extends Component {
    columns = [
        {
            title: "TT",
            dataIndex: "count",
            key: "count",
            align: "center"
        },
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
            title: "Còn giảng dạy",
            key: "state",
            dataIndex: "state",
            align: "center",
            render: (record) => {
                return (
                    <Switch 
                        defaultChecked={record == "active"}
                        disabled
                    />
                );
            }
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

    render() {
        return (
            <div>
                <TeacherSearchInput onSearchTeacher={this.handleOnSearchTeacher}/>
                <br/><br/>
                <Table 
                    title={() => {
                        return (
                            <span>
                                <h2 style={{textAlign: "start"}}>
                                    Danh sách giáo viên
                                    <Button onClick={this.handleCreateButtonClick}>Thêm</Button>
                                </h2>
                            </span>
                        );
                    }}
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

    async handleCreateTeacherSuccess(teacher) {
        this.setState({
            createTeacherVisible: false,
            searchedTeachers: []
        })
    }

    handleOnSearchTeacher(teachers) {
        for(let i = 0; i < teachers.length; i++) {
            teachers[i].count = i + 1;
        }

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
import React, { Component } from "react";
import { Table, Tag, Switch, Button, Row, Col } from "antd";
import TeacherSearchInput from "../../components/teachers/teacher-search-input";
import TeacherCreate from "../../components/teachers/teacher-create";
import TeacherUpdate from "../../components/teachers/teacher-update";
import SubjectSelect from "../../components/subject-select";
import TeacherRepo from "../../repository/prop/teacher-repository";

export default class AdminTeachersPage extends Component {
    columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            align: "center",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            align: "center",
            sorter: (a, b) => a.gender.localeCompare(b.gender),
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
            align: "center",
            sorter: (a, b) => a.subject.localeCompare(b.subject)
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
        {
            title: "Chức năng",
            key: "action",
            align: "center",
            render: (teacher) => {
                return (<Button type="primary" onClick={() => this.handleUpdateButtonClick(teacher)}>Sửa</Button>);
            }
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            searchedTeachers: [],
            createTeacherVisible: false,
            updateTeacherVisible: false,
            updatingTeacher: {}
        };

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleUpdateButtonClick = this.handleUpdateButtonClick.bind(this);
        this.handleOnSearchTeacher = this.handleOnSearchTeacher.bind(this);
        this.handleCreateTeacherSuccess = this.handleCreateTeacherSuccess.bind(this);
        this.handleUpdateTeacherSuccess = this.handleUpdateTeacherSuccess.bind(this);
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
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
                <Row type="flex" justify="space-between">
                    <Col span={20}>
                        <TeacherSearchInput onSearchTeacher={this.handleOnSearchTeacher} />
                    </Col>
                    <Col span={3}>
                        <SubjectSelect onChange={this.handleSubjectSelectChange}/>
                    </Col>
                </Row>
                <br /><br />

                <Table
                    title={this.title}
                    pagination={{ pageSize: 9 }}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={this.state.searchedTeachers}
                    bordered
                />
                <TeacherCreate
                    visible={this.state.createTeacherVisible}
                    handleCancel={() => this.setState({ createTeacherVisible: false })}
                    handleSaveSuccess={this.handleCreateTeacherSuccess}
                />
                <TeacherUpdate
                    teacher={this.state.updatingTeacher}
                    visible={this.state.updateTeacherVisible}
                    handleCancel={() => this.setState({ updateTeacherVisible: false })}
                    handleSaveSuccess={this.handleUpdateTeacherSuccess}
                />
            </div>
        );
    }

    handleCreateButtonClick() {
        this.setState({
            createTeacherVisible: true
        });
    }

    handleUpdateButtonClick(teacher) {
        this.setState({
            updateTeacherVisible: true,
            updatingTeacher: teacher
        });
    }

    handleCreateTeacherSuccess(teacher) {
        let teachers = [teacher];
        this.setState({
            createTeacherVisible: false,
            searchedTeachers: teachers
        });
    }

    handleUpdateTeacherSuccess(teacher) {
        let teachers = [teacher];
        this.setState({
            updateTeacherVisible: false,
            searchedTeachers: teachers
        });
    }

    handleOnSearchTeacher(teachers) {
        this.setState({
            searchedTeachers: teachers
        });
    }

    async handleSubjectSelectChange(subject) {
        const teachers = await TeacherRepo.getTeachersBySubject(subject);
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
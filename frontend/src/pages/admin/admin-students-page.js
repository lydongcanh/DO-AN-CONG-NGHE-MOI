import React, { Component } from "react";
import { Tag, Row, Col, Button, Table, Input, Select, Divider } from "antd";
import StudentCreate from "../../components/students/student-create";
import StudentUpdate from "../../components/students/student-update";
import StudentScoresUpdate from "../../components/students/student-scores-update";
import StudentRepo from "../../repository/prop/student-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";
import grades from "../../types/grades";

const { Search } = Input;
const { Option } = Select;

export default class AdminStudentsPage extends Component {
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
                return (
                    <span>
                        <Button type="primary" onClick={() => this.handleUpdateStudentClick(student)}>Sửa</Button>
                        <Divider type="vertical"/>
                        <Button type="primary" onClick={() => this.handleUpdateStudentScoresClick(student)}>Điểm</Button>
                    </span>
                );
            }
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            searchedStudents: [],
            studyclass: "",
            studyclasses: [],
            createStudentVisible: false,
            updateStudentVisible: false,
            updateStudentScoresVisible: false,
            updatingStudent: {}
        };

        this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
        this.handleOnSearchStudent = this.handleOnSearchStudent.bind(this);
        this.handleCreateStudentSuccess = this.handleCreateStudentSuccess.bind(this);
        this.handleUpdateStudentClick = this.handleUpdateStudentClick.bind(this);
        this.handleUpdateStudentScoresClick = this.handleUpdateStudentScoresClick.bind(this);
        this.handleGradeSelectChange = this.handleGradeSelectChange.bind(this);
        this.handleStudyclassSelectChange = this.handleStudyclassSelectChange.bind(this);
        this.handleUpdateStudentSuccess = this.handleUpdateStudentSuccess.bind(this);
        this.handleStudentScoresUpdateFinish = this.handleStudentScoresUpdateFinish.bind(this);
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

    get gradeOptions() {
        let options = [];
        for (let i = 0; i < grades.length; i++) {
            options.push(
                <Option
                    value={grades[i]}
                    key={grades[i]}
                >
                    {grades[i]}
                </Option>
            );
        }
        return options;
    }

    get classOptions() {
        const studyclasses = this.state.studyclasses;
        if (!studyclasses)
            return [];

        let options = [];
        for (let i = 0; i < studyclasses.length; i++) {
            options.push(
                <Option
                    value={studyclasses[i].name}
                    key={studyclasses[i].name}
                >
                    {studyclasses[i].name}
                </Option>
            );
        }
        return options;
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col span={18}>
                        <Search
                            placeholder="Nhập tên học sinh"
                            onSearch={this.handleOnSearchStudent}
                        />
                    </Col>

                    <Col span={3}>
                        <Select
                            placeholder="Chọn lớp"
                            style={{width: "90%"}}
                            onChange={this.handleGradeSelectChange}
                            value={this.state.grade}
                        >
                            {this.gradeOptions}
                        </Select>
                    </Col>

                    <Col span={3}>
                        <Select
                            placeholder="Chọn khối"
                            style={{width: "90%"}}
                            onChange={this.handleStudyclassSelectChange}
                            value={this.state.studyclass}
                        >
                            {this.classOptions}
                        </Select>
                    </Col>
                </Row>

                <br /><br />
                <Table
                    title={this.title}
                    pagination={{ pageSize: 9 }}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={this.state.searchedStudents}
                    bordered
                />
                <StudentCreate
                    visible={this.state.createStudentVisible}
                    handleCancel={() => this.setState({ createStudentVisible: false })}
                    handleSaveSuccess={this.handleCreateStudentSuccess}
                />
                <StudentUpdate
                    visible={this.state.updateStudentVisible}
                    handleCancel={() => this.setState({ updateStudentVisible: false })}
                    handleSaveSuccess={this.handleUpdateStudentSuccess}
                    student={this.state.updatingStudent}
                />
                <StudentScoresUpdate
                    student={this.state.updatingStudent}
                    visible={this.state.updateStudentScoresVisible}
                    onFinish={this.handleStudentScoresUpdateFinish}
                />
            </div>
        );
    }

    handleStudentScoresUpdateFinish() {
        this.setState({
            updateStudentScoresVisible: false
        });
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

    handleUpdateStudentScoresClick(student) {
        this.setState({
            updateStudentScoresVisible: true,
            updatingStudent: student
        });
    }

    async handleCreateStudentSuccess(student) {
        let students = [student];
        this.setState({
            createStudentVisible: false,
            searchedStudents: students,
            updatingStudent: {}
        });
    }

    async handleUpdateStudentSuccess(student) {
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

    async handleGradeSelectChange(grade) {
        const studyclasses = await ClassRepo.getStudyclassByGrade(grade);

        this.setState({
            grade: grade,
            studyclasses: studyclasses,
            studyclass: studyclasses[0].name
        });
    }

    async handleStudyclassSelectChange(studyclassName) {
        const studyclass = await ClassRepo.getStudyclassByGradeAndName(this.state.grade, studyclassName);
        const students = await StudentRepo.getStudentsByClassId(studyclass.id);

        this.setState({
            studyclass: studyclass.name,
            searchedStudents: students
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
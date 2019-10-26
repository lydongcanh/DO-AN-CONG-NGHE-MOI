import React, { Component } from "react";
import { Dropdown, Button, Menu, Row, Col, Input, Icon } from "antd";
import StudentRepository from "../repository/prop/student-repository";
import ClassRepository from "../repository/prop/studyclass-repository";

const { Search } = Input;

/** [Required props: onSearchStudent, onSearchClass] */
export default class StudentSearchInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            classes: [],
            gradeDropdownText: "Chọn khối",
            classDropdownText: "Chọn lớp",
            classDropdownActive: false,
            searchedName: ""
        };

        this.handleGradeMenuClick = this.handleGradeMenuClick.bind(this);
        this.handleClassMenuClick = this.handleClassMenuClick.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    get gradeMenu() {
        return (
            <Menu onClick={this.handleGradeMenuClick}>
                <Menu.Item key="10">
                    Khối 10
                </Menu.Item>
                <Menu.Item key="11">
                    Khối 11
                </Menu.Item>
                <Menu.Item key="12">
                    Khối 12
                </Menu.Item>
            </Menu>
        );
    }

    get classMenu() {
        let menus = [];
        for(let i = 0; i < this.state.classes.length; i++) {
            menus.push(
                <Menu.Item key={i}>
                    {this.state.classes[i].name}
                </Menu.Item>
            );
        }

        return (
            <Menu onClick={this.handleClassMenuClick}>
                {menus}
            </Menu>
        );
    }

    render() {
        return (
            <Row style={{textAlign: "end"}}>

                <Col span={18}>
                    <Search
                        placeholder="Nhập tên học sinh"
                        onChange={this.handleSearchChange}
                        name="searchedName"
                        value={this.state.searchedName}
                        onSearch={this.handleOnSearch}
                    />
                </Col>

                <Col span={3}>
                    <Dropdown overlay={this.gradeMenu}>
                        <Button>
                            {this.state.gradeDropdownText} <Icon type="down"/>
                        </Button>
                    </Dropdown>
                </Col>

                <Col span={3}>
                    <Dropdown overlay={this.classMenu} disabled={!this.state.classDropdownActive}>
                        <Button>
                            {this.state.classDropdownText} <Icon type="down"/>
                        </Button>
                    </Dropdown>
                </Col>

            </Row>
        );
    }

    /** Xử lý khi tìm kiếm bằng tên */
    async handleOnSearch() {
        let students = await StudentRepository.getStudentsByName(this.state.searchedName);
        this.props.onSearchStudent(students);
    }

    handleSearchChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /** Xử lý khi tìm kiếm với khối */
    async handleGradeMenuClick(e) {
        let result = await ClassRepository.getStudyclassByGrade(Number(e.key));

        this.setState(_ => ({
            gradeDropdownText: e.item.props.children,
            classDropdownText: "Chọn lớp",
            classes: result,
            classDropdownActive: true
        }));
    }

    /** Xử lý khi tìm kiếm với lớp */
    handleClassMenuClick(e) {
        this.setState(_ => ({
            classDropdownText: e.item.props.children
        }));

        let students = StudentRepository.getStudentsByClassId(this.state.classes[e.key].id);
        this.props.onSearchClass(students);
    }
}
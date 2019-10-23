import React, { Component } from "react";
import { Dropdown, Button, Menu, Row, Col, Input, Icon } from "antd";

import MockDB from "../repository/mock/mockDB";
const mockDB = new MockDB();

const { Search } = Input;

export default class StudentSearchInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            classes: [],
            gradeDropdownText: "Chọn khối",
            classDropdownText: "Chọn lớp",
            classDropdownActive: false,
        };

        this.handleGradeMenuClick = this.handleGradeMenuClick.bind(this);
        this.handleClassMenuClick = this.handleClassMenuClick.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
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
                <Menu.Item key={this.state.classes[i].id}>
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

    handleOnSearch(e) {
        // TODO: update table
    }

    handleGradeMenuClick(e) {
        let result = mockDB.getClassWithGrade(Number(e.key));

        this.setState(_ => ({
            gradeDropdownText: e.item.props.children,
            classes: result,
            classDropdownActive: true
        }));
    }

    handleClassMenuClick(e) {
        this.setState(_ => ({
            classDropdownText: e.item.props.children
        }));
        // TODO: update table
    }
}
import React, { Component } from "react";
import { Button, Row, Col, Input} from "antd";
import { Link } from "react-router-dom";

import MockDB from "../../repository/mock/mockDB";
const mockDB = new MockDB();

const { Search } = Input;

export default class StudentSearchInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            classes: [],
            searchedName: ""
        };
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    render() {
        return (
            <Row style={{textAlign: "end"}}>
                <Col span={21}>
                    <Search
                        placeholder="Nhập tên học sinh"
                        onChange={this.handleSearchChange}
                        name="searchedName"
                        value={this.state.searchedName}
                        onSearch={this.handleOnSearch}
                    />
                </Col>

                <Col span={3}>
                    <Button>
                        <Link to={`/admin/studentcreate`}>
                            Thêm
                        </Link>
                    </Button>
                </Col>
            </Row>
        );
    }
    /** Xử lý khi tìm kiếm bằng tên */
    handleOnSearch() {
        let students = mockDB.getStudentWithName(this.state.searchedName);
        this.props.onSearchStudent(students);
    }

    handleSearchChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

}
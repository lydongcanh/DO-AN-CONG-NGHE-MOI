import React, { Component } from "react";
import { Input } from "antd";

import MockDB from "../repository/mock/mockDB";
const mockDB = new MockDB();

const { Search } = Input;
 
/** [Required props: onSearchTeacher] */
export default class TeacherSearchInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedName: ""
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
    }

    render() {
        return (
            <Search
                placeholder="Nhập tên giáo viên"
                onChange={this.handleSearchChange}
                name="searchedName"
                value={this.state.searchedName}
                onSearch={this.handleOnSearch}
            />
        );
    }

    /** Xử lý khi tìm kiếm bằng tên */
    handleOnSearch() {
        let teachers = mockDB.getTeachersWithName(this.state.searchedName);
        this.props.onSearchTeacher(teachers);
    }

    handleSearchChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}
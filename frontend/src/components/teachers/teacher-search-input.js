import React, { Component } from "react";
import { Input } from "antd";
import TeacherRepository from "../../repository/prop/teacher-repository";

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
    async handleOnSearch() {
        let teachers = await TeacherRepository.getTeachersByName(this.state.searchedName);
        this.props.onSearchTeacher(teachers);
    }

    handleSearchChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}
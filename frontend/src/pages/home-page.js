import React, { Component } from "react";
import StudentSearchInput from "../components/student-search-input";
import StudentTable from "../components/student-table";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedStudent: []
        }
        
        this.handleSearchedStudent = this.handleSearchedStudent.bind(this);
    }

    render() {
        return (
            <div>
                <StudentSearchInput onSearchStudent={this.handleSearchedStudent} onSearchClass={this.handleSearchedStudent}/>
                <br/>
                <StudentTable students={this.state.searchedStudent}/>
            </div>
        );
    }

    /** Xử lý sự kiện sau khi nhập tìm kiếm học sinh bằng tên hoặc lớp
     * @param students Danh sách học sinh tìm thấy
     */
    handleSearchedStudent(students) {
        this.setState({
            searchedStudent: students
        })
    }
}

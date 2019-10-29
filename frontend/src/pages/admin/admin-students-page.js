import React, { Component } from "react";
import StudentTableAdmin from "../../components/student/student-table-admin";
import NewButton from "../../components/student/student-newbutton";
import StudentSearchInput from "../../components/students/student-search-input"
import { Row ,Col} from "antd";

export default class AdminStudentsPage extends Component {
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
                <div>
                    <Row gutter={48}>
                        <Col span={21}>
                            <StudentSearchInput onSearchStudent={this.handleSearchedStudent} onSearchClass={this.handleSearchedStudent}/>     
                        </Col>
                        <Col span={2}>
                            <NewButton></NewButton>
                        </Col>
                    </Row>
                </div>
                <br/>
                <div>
                    <StudentTableAdmin students={this.state.searchedStudent}></StudentTableAdmin> 
                </div>
            </div>
        );
    }
    handleSearchedStudent(students) {
        this.setState({
            searchedStudent: students
        })
    }
}

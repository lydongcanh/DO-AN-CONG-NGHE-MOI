import React, { Component } from "react";
import { Table, Row , Col} from "antd";
import TeacherSearchInput from "../../components/teacher-search-input";
import NewButton from "../../components/teachers/teacher-newbutton";
import TeacherTable from "../../components/teachers/teacher-table-admin"

export default class AdminTeachersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedTeachers: []
        };

        this.handleOnSearchTeacher = this.handleOnSearchTeacher.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                <Row gutter={48}>
                    <Col span={21}>
                        <TeacherSearchInput onSearchTeacher={this.handleOnSearchTeacher}/>
                    </Col>
                    <Col spam={2}>
                        <NewButton></NewButton>
                    </Col>
                </Row>
                </div>
                <br/>
                <div>              
                    <TeacherTable teachers={this.state.searchedTeachers}>
                    </TeacherTable>
                </div>
            </div>
        );
    }

    handleOnSearchTeacher(teachers) {
        //alert(`${teachers}`);
        this.setState({
            searchedTeachers: teachers
        });
    }
}
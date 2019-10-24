import React, { Component } from "react";
import StudentTableAdmin from "../../components/student/student-table-admin";
import StudentSearchAddNew from "../../components/student/student-search-addnew";

export default class AdminStudentsPage extends Component {
    render() {
        return (
            <div>
                <h2>Trang quản lý học sinh</h2>
                <div>
                    <StudentSearchAddNew></StudentSearchAddNew>
                </div>
                <div>
                    <StudentTableAdmin></StudentTableAdmin> 
                </div>
            </div>
        );
    }
}
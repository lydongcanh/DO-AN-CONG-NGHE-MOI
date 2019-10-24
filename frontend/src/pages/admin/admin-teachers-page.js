import React, { Component } from "react";
import { Table } from "antd";
import TeacherSearchInput from "../../components/teacher-search-input";

export default class AdminTeachersPage extends Component {
    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
        },
        {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email"
        },
        {
            title: "Số điện thoại",
            key: "phoneNumber",
            dataIndex: "phoneNumber",
        },
    ];

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
                <TeacherSearchInput onSearchTeacher={this.handleOnSearchTeacher}/>
                <br/><br/>
                <h2 style={{textAlign: "start"}}>Danh sách giáo viên</h2>
                <Table pagination={{pageSize: 9}} 
                       columns={this.columns} 
                       rowKey={record => record.id}
                       dataSource={this.state.searchedTeachers}/>
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
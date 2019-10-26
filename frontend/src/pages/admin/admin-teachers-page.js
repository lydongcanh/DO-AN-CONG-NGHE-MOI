import React, { Component } from "react";
import { Table, Row , Col} from "antd";
import TeacherSearchInput from "../../components/teacher-search-input";
import NewButton from "../../components/teachers/teacher-newbutton"

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
                <h2 style={{textAlign: "start"}}>Danh sách giáo viên</h2>
                <Table pagination={{pageSize: 9}} 
                columns={this.columns} 
                rowKey={record => record.id}
                dataSource={this.state.searchedTeachers}/>
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
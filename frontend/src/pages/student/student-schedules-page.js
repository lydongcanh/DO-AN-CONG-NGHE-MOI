import React, { Component } from "react";
import { Table } from "antd";
import MockDB from "../../repository/mock/mockDB";
const mockDB = new MockDB();

export default class StudentSchedulesPage extends Component {
    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Bắt đầu",
            dataIndex: "from",
            key: "from"
        },
        {
            title: "Kết thúc",
            dataIndex: "to",
            key: "to"
        },
        {
            title: "Trạng thái",
            dataIndex: "state",
            key: "state"
        },
        {
            title: "Môn",
            dataIndex: "subject",
            key: "subject"
        },
        {
            title: "Giáo viên",
            dataIndex: "teacher",
            key: "teacher"
        },
    ];

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            data: params
        })
    }

    render() {
        const id = this.state.data.id;
        if (!id)
            return <h3>Thông tin học sinh không hơp lệ.</h3>

        let schedules = mockDB.getStudentSchedules(id);
        if (!schedules || schedules.length == 0)
            return <h3>Học sinh này hiện chưa có thời khóa biểu: {id}</h3>
        
        return <Table dataSource={schedules} columns={this.columns} rowKey={record => record.id}/>
    }
}
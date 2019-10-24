import React, { Component } from "react";
import { Table } from "antd";
import MockDB from "../../repository/mock/mockDB";
const mockDB = new MockDB();

export default class StudentScoresPage extends Component {
    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Môn",
            dataIndex: "subject",
            key: "subject"
        },
        {
            title: "Hệ số",
            dataIndex: "multiplier",
            key: "multiplier"
        },
        {
            title: "Điểm",
            dataIndex: "value",
            key: "value"
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

        let scores = mockDB.getStudentScores(id);
        if (!scores || scores.length == 0)
            return <h3>Học sinh này hiện chưa có điểm số nào.</h3>
        
        return <Table dataSource={scores} columns={this.columns} rowKey={record => record.id}/>
    }
}
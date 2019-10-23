import React, { Component } from "react";
import { Divider, Table } from "antd";

export default class StudentTable extends Component {
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
            title: "Số điện thoại",
            key: "phoneNumber",
            dataIndex: "phoneNumber",
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, __) => (
                <span>
                    <a>Xem điểm</a>
                    <Divider type="vertical" />
                    <a>Xem thời khóa biểu</a>
                </span>
            ),
        },
    ];

    render() {
        return (
            <div>
                <h2 style={{textAlign: "start"}}>Danh sách học sinh</h2>
                <Table columns={this.columns} rowKey={record => record.id} dataSource={this.props.students} />
            </div>
        );
    }
}
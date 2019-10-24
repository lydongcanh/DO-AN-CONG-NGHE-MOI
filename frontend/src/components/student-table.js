import React, { Component } from "react";
import { Divider, Table, Button } from "antd";
import { Link } from "react-router-dom";

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
            render: (text, record) => (
                <span>
                    <Button>
                        <Link to={`/studentscores/${record.id}`}>
                            Xem điểm
                        </Link>
                    </Button>
                    <Divider type="vertical" />
                    <Button>
                        <Link to={`/studentschedules/${record.id}`}>
                            Xem thời khóa biểu
                        </Link>
                    </Button>
                </span>
            ),
        },
    ];

    render() {
        return (
            <div>
                <h2 style={{textAlign: "start"}}>Danh sách học sinh</h2>
                <Table pagination={{pageSize: 9}} columns={this.columns} rowKey={record => record.id} dataSource={this.props.students} />
            </div>
        );
    }
}
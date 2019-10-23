import React, { Component } from "react";
import { Divider, Table } from "antd";

const data = [
    {
        "id": 0,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 1
    },
    {
        "id": 1,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 1
    },
    {
        "id": 2,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 2
    },
    {
        "id": 3,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 2
    },
    {
        "id": 4,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 4
    },
    {
        "id": 5,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 3
    },
    {
        "id": 6,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 4
    },
    {
        "id": 7,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 5
    },
    {
        "id": 8,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 6
    },
    {
        "id": 9,
        "name": "Lorem ipsum dolor sir amet",
        "gender": "Nam",
        "birthday": Date.now(),
        "address": "Lorem ipsum dolor sir amet",
        "phoneNumber": "0123456789",
        "state": "active",
        "classId": 6
    },
];

export default class StudentTable extends Component {
    columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>,
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
                    <a>Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                </span>
            ),
        },
    ];

    render() {
        return (
            <Table columns={this.columns} dataSource={data} />
        );
    }
}
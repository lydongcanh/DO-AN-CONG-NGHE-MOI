import React, { Component } from "react";
import { Tag, Divider, Table, Button } from "antd";
import { Link } from "react-router-dom";

export default class StudentTable extends Component {
    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "key"
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: gender => {
                return (
                    <Tag color={this.getGenderTagColor(gender)}>
                        {gender}
                    </Tag>
                )
            }
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday"
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber"
        },
        {
            title: "",
            render: (_, record) => (
                <span>
                    <Button type="primary">
                        <Link to={`/studentscores/${record.id}`}>
                            Xem điểm
                        </Link>
                    </Button>
                    <Divider type="vertical" />
                    <Button type="primary">
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
                <Table title={() => <h2 style={{textAlign: "start"}}>Danh sách học sinh</h2>}
                       pagination={{pageSize: 9}} 
                       bordered
                       columns={this.columns} 
                       rowKey={record => record.id} 
                       dataSource={this.props.students} />
            </div>
        );
    }

    getGenderTagColor(gender) {
        if (gender == "Nam") {
            return "red";
        } else if (gender == "Nữ") {
            return "geekblue"
        } else {
            return "cyan";
        }
    }
}
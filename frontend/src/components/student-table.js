import React, { Component } from "react";
import { Tag, Divider, Table, Button } from "antd";
import { Link } from "react-router-dom";

export default class StudentTable extends Component {
    get columns () {
        return [
            {
                title: "TT",
                dataIndex: "count",
                key: "count"
            },
            {
                title: "Tên",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Khối",
                dataIndex: "grade",
                key: "grade"
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
                render: (_, record) => {
                    console.log("record", record);
                    return (
                    <span>
                        <Button type="primary">
                            <Link to={`/studentscores/${record.id}`}>
                                Xem điểm
                            </Link>
                        </Button>
                        <Divider type="vertical" />
                        <Button type="primary">
                            <Link to={`/studentschedules/0`}>
                                Xem thời khóa biểu
                            </Link>
                        </Button>
                    </span>
                )},
            },
        ];
    }

    get dataSource() {
        const students = this.props.students;
        if (!students || students.length < 1) 
            return [];

        const result = [];
        for(let i = 0; i < students.length; i++) {
            let item = new Object(students[i]);
            item.count = i + 1;
            result.push(item);
        }

        return result;
    }

    render() {
        return (
            <div>
                <Table title={() => <h2 style={{textAlign: "start"}}>Danh sách học sinh</h2>}
                       pagination={{pageSize: 9}} 
                       bordered
                       columns={this.columns} 
                       rowKey={record => record.id} 
                       dataSource={this.dataSource} />
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
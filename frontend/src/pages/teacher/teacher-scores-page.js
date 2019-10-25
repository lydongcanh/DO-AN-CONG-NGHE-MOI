import React, { Component } from "react";
import { Table, Button, Divider } from "antd";

import mockDB from "../../repository/mock/mockDB";

export default class TeacherScoresPage extends Component {
    columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Lớp",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Năm bắt đầu",
            dataIndex: "startYear",
            key: "startYear",
        },
        {
            title: "Năm kết thúc",
            dataIndex: "endYear",
            key: "endYear",
        },
        {
            title: "Trạng thái",
            dataIndex: "state",
            key: "state"
        },
        {
            title: "Chức năng",
            render: () => {
                return (
                    <span>
                        <Button type="primary">Xem điểm</Button>
                        <Divider type="vertical" />
                        <Button type="primary">Nhập điểm</Button>
                    </span>
                );
            }
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            classes: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const account = mockDB.getAccountWithUsername(params.username);
        const classes = mockDB.getTeacherClasses(account.teacherId);

        this.setState({
            classes: classes
        });
    }

    render() {
        return (
            <Table
                title={() => <h2 style={{textAlign: "start"}}>Danh sách lớp học</h2>}
                bordered
                columns={this.columns}
                dataSource={this.state.classes}
            />
        );
    }
}
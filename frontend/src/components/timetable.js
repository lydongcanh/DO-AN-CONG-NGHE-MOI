import React, { Component } from "react";
import { DatePicker, Table, Col, Row } from "antd"; 
import schoolTimes from "../types/schoolTimes";

export default class TimeTable extends Component {

    /** Hiển thị tựa đề & datepicker */
    tableTitle = () => {
        return (
            <Row>
                <Col span={3}>
                    <h2 style={{ textAlign: "start" }}>Thời khóa biểu</h2>
                </Col>
                <Col span={3}>
                    <DatePicker style={{ textAlign: "end" }} />
                </Col>
            </Row>
        );
    }

    /** Hiển thị cột thời gian trong bảng */
    renderTime = (time) => {
        if (!time)
            return "";

        let result = {
            children: <p style={{ textAlign: "center" }}>{time.name}</p>,
        }

        if (time.type == "break") {
            result.props = {
                colSpan: 8,
            }
        }

        return result;
    }

    /** Hiển thị các cột còn lại trang bảng */
    renderNormalCels = (value, row, index) => {
        const result = {
            children: value,
            props: {},
        };

        if (index == 3 || index == 6 || index == 9)
            result.props.rowSpan = 0;

        return result;
    }

    columns = [
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
            render: this.renderTime
        },
        {
            title: "Thứ hai",
            dataIndex: "mon",
            key: "mon",
            render: this.renderNormalCels
        },
        {
            title: "Thứ ba",
            dataIndex: "tues",
            key: "tues",
            render: this.renderNormalCels
        },
        {
            title: "Thứ tư",
            dataIndex: "wed",
            key: "web",
            render: this.renderNormalCels
        },
        {
            title: "Thứ năm",
            dataIndex: "thurs",
            key: "thurs",
            render: this.renderNormalCels
        },
        {
            title: "Thứ sáu",
            dataIndex: "fri",
            key: "fri",
            render: this.renderNormalCels
        },
        {
            title: "Thứ bảy",
            dataIndex: "sar",
            key: "sar",
            render: this.renderNormalCels
        },
        {
            title: "Chủ nhật",
            dataIndex: "sun",
            key: "sun",
            render: this.renderNormalCels
        },
    ]

    get tableSource() {
        let result = [];

        for(let i = 0; i < schoolTimes.length; i++) {
            result.push({
                time: schoolTimes[i],
            });
        }

        return result;
    }

    render() {
        return (
            <div>
                <Table 
                    size="middle"
                    pagination={{pageSize: 12, hideOnSinglePage: true}}
                    rowKey={record => record.time.name}
                    title={this.tableTitle}
                    bordered
                    dataSource={this.tableSource} 
                    columns={this.columns} 
                    rowKey={record => record.id}
                />
            </div>
        );
    }
}
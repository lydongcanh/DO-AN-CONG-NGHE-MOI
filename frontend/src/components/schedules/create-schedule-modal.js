import React, { Component } from "react";
import { Modal, Table, Button, Card } from "antd";
import CreateScheduleDetailsModal from "./create-schedule-details-modal";
import schoolTimes from "../../types/schoolTimes";

/** [Required props: visible, onCancel, onOk, studyclass] */
export default class AdminScheduleModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scheduleDetailsVisible: false,
            scheduleDetailsTime: undefined,
            scheduleDetailsDate: undefined
        };

        this.handleAddSchedule = this.handleAddSchedule.bind(this);
        this.handleScheduleDetailsModalCancel = this.handleScheduleDetailsModalCancel.bind(this);
        this.handleScheduleDetailsModalOk = this.handleScheduleDetailsModalOk.bind(this);
    }

    get columns() {
        return [
            {
                title: "Thời gian",
                dataIndex: "time",
                key: "time",
                align: "center",
                render: this.renderTime
            },
            {
                title: "Thứ hai",
                dataIndex: "mon",
                key: "mon",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ hai")
            },
            {
                title: "Thứ ba",
                dataIndex: "tues",
                key: "tues",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ ba")
            },
            {
                title: "Thứ tư",
                dataIndex: "wed",
                key: "web",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ tư")
            },
            {
                title: "Thứ năm",
                dataIndex: "thurs",
                key: "thurs",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ năm")
            },
            {
                title: "Thứ sáu",
                dataIndex: "fri",
                key: "fri",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ sáu")
            },
            {
                title: "Thứ bảy",
                dataIndex: "sar",
                key: "sar",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ bảy")
            },
            {
                title: "Chủ nhật",
                dataIndex: "sun",
                key: "sun",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Chủ nhật")
            },
        ]
    }

    get tableSource() {
        let result = [];

        for (let i = 0; i < schoolTimes.length; i++) {
            let schoolTime = schoolTimes[i];

            let data = {
                time: schoolTime,
            }

            // TODO: push data here...

            result.push(data);
        }

        return result;
    }

    /** Hiển thị cột thời gian trong bảng */
    renderTime = (time) => {
        if (!time)
            return;

        if (time.type == "break") {
            return ({
                children: (
                    <Card size="small">
                        <p>{time.name}</p>
                    </Card>
                ),
                props: {
                    colSpan: 8,
                    style: { textAlign: "center" }
                }
            });
        }

        return <p>{time.name}</p>
    }

    /** Hiển thị các cột còn lại trang bảng */
    renderNormalCels = (record, data, index, date) => {
        let result = {
            props: {}
        };

        if (index == 3 || index == 6 || index == 9)
            result.props.colSpan = 0;

        if (record) {
            // TODO render value...
            result.children = "record";
        } else {
            result.children = (
                <Button
                    onClick={() => this.handleAddSchedule(record, data, index, date)}
                    size="small"
                    shape="circle"
                    icon="plus" 
                />
            );
        }

        return result;
    }

    /** Nút thêm thời khóa biểu từng tiết */
    handleAddSchedule(_, __, index, date) {
        const schoolTime = schoolTimes[index];

        this.setState({
            scheduleDetailsVisible: true,
            scheduleDetailsTime: schoolTime.name,
            scheduleDetailsDate: date,
        });
    }

    handleScheduleDetailsModalCancel() {
        this.setState({
            scheduleDetailsVisible: false
        });
    }

    handleScheduleDetailsModalOk(value) {
        console.log("Ok", value);
    }

    render() {
        return (
            <Modal
                width={1000}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                visible={this.props.visible}
                cancelText="Hủy"
                okText="Lưu"
                closable={false}
            >
                <Table
                    size="small"
                    dataSource={this.tableSource}
                    pagination={{ hideOnSinglePage: true, defaultPageSize: 12 }}
                    bordered
                    title={() => <h3>Thời khóa biểu lớp {this.props.studyclass.grade}{this.props.studyclass.name}</h3>}
                    columns={this.columns}
                />
                <CreateScheduleDetailsModal
                    time={this.state.scheduleDetailsTime}
                    date={this.state.scheduleDetailsDate}
                    visible={this.state.scheduleDetailsVisible}
                    onCancel={this.handleScheduleDetailsModalCancel}
                    onOk={this.handleScheduleDetailsModalOk}
                />
            </Modal>
        );
    }
}
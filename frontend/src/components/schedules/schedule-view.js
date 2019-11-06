import React, { Component } from "react"
import { Card, Tabs, Table } from "antd";
import schoolTimes from "../../types/schoolTimes";

const { TabPane } = Tabs;

/** Required props: scheduleDetails, extraTitle, extraInfo */
export default class ScheduleView extends Component {
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
                dataIndex: "Thứ hai",
                key: "Thứ hai",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ hai")
            },
            {
                title: "Thứ ba",
                dataIndex: "Thứ ba",
                key: "Thứ ba",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ ba")
            },
            {
                title: "Thứ tư",
                dataIndex: "Thứ tư",
                key: "Thứ tư",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ tư")
            },
            {
                title: "Thứ năm",
                dataIndex: "Thứ năm",
                key: "Thứ năm",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ năm")
            },
            {
                title: "Thứ sáu",
                dataIndex: "Thứ sáu",
                key: "Thứ sáu",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ sáu")
            },
            {
                title: "Thứ bảy",
                dataIndex: "Thứ bảy",
                key: "Thứ bảy",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Thứ bảy")
            },
            {
                title: "Chủ nhật",
                dataIndex: "Chủ nhật",
                key: "Chủ nhật",
                align: "center",
                render: (record, data, index) => this.renderNormalCels(record, data, index, "Chủ nhật")
            },
        ]
    }

    getTableSource(semester) {
        let result = [];

        for (let i = 0; i < schoolTimes.length; i++) {
            let schoolTime = schoolTimes[i];

            let data = {
                time: schoolTime,
            }

            for(let j = 0; j < this.props.scheduleDetails.length; j++) {
                const scheduleDetail = this.props.scheduleDetails[j];

                if (scheduleDetail.semester == semester &&
                    scheduleDetail.time == schoolTime.name) {
                    data[`${scheduleDetail.date}`] = scheduleDetail;
                }
            }

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
    renderNormalCels = (schedule, data, index, date) => {
        let result = {
            props: {}
        };

        if (index == 3 || index == 6 || index == 9)
            result.props.colSpan = 0;

        if (schedule) {
            result.children = (
                <span>
                    <p><b>Môn: </b>{schedule.subject}</p>
                    <p><b>{this.props.extraTitle}: </b>{this.props.extraInfo[schedule.teacherId]}</p>
                </span>
            );
        } else {
            result.children = "-";
        }

        return result;
    }

    render() {
        return (
            <Tabs
                defaultActiveKey="HK1"
            >
                <TabPane tab="HK1" key="HK1">
                    <Table
                        dataSource={this.getTableSource("HK1")}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 12 }}
                        bordered
                        title={() => <h3>Thời khóa biểu học kỳ 1</h3>}
                        columns={this.columns}
                    />
                </TabPane>
                <TabPane tab="HK2" key="HK2">
                    <Table
                        dataSource={this.getTableSource("HK2")}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 12 }}
                        bordered
                        title={() => <h3>Thời khóa biểu học kỳ 2</h3>}
                        columns={this.columns}
                    />
                </TabPane>
            </Tabs>
        );
    }
}
import React, { Component } from "react";
import { DatePicker, Card , Table, Col, Row } from "antd"; 
import schoolTimes from "../types/schoolTimes";
import moment from "moment"

const { WeekPicker } = DatePicker;

/** [Required props: getSchedules(from, to)] */
export default class TimeTable extends Component {

    takenCol = [];
    
    constructor(props) {
        super(props);

        this.state = {
            pickedTime: moment()
        }

        this.handleWeekPickerOnChange = this.handleWeekPickerOnChange.bind(this);
    }

    /** Hiển thị tựa đề & datepicker */
    tableTitle = () => {
        return (
            <Row>
                <Col span={3}>
                    <h2 style={{ textAlign: "start" }}>Thời khóa biểu</h2>
                </Col>
                <Col span={3}>
                    <WeekPicker 
                        allowClear={false}
                        onChange={this.handleWeekPickerOnChange}
                        defaultValue={moment()} 
                        style={{ textAlign: "end" }} 
                    />
                </Col>
            </Row>
        );
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
                    style: {textAlign: "center"}
                }
            });
        }

        return <p>{time.name}</p>
    }

    /** Hiển thị các cột còn lại trang bảng */
    renderNormalCels = (value, _, index) => {
        let result = {
            props: {}
        };

        if (index == 3 || index == 6 || index == 9)
            result.props.colSpan = 0;

        if (!value)
            return result;

        result.children = (
                <Card size="small">
                    <p>{value.subject}</p>
                </Card>
        );
        //result.props.rowSpan = value.length;

        return result;
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
                render: this.renderNormalCels
            },
            {
                title: "Thứ ba",
                dataIndex: "tues",
                key: "tues",
                align: "center",
                render: this.renderNormalCels
            },
            {
                title: "Thứ tư",
                dataIndex: "wed",
                key: "web",
                align: "center",
                render: this.renderNormalCels
            },
            {
                title: "Thứ năm",
                dataIndex: "thurs",
                key: "thurs",
                align: "center",
                render: this.renderNormalCels
            },
            {
                title: "Thứ sáu",
                dataIndex: "fri",
                key: "fri",
                align: "center",
                render: this.renderNormalCels
            },
            {
                title: "Thứ bảy",
                dataIndex: "sar",
                key: "sar",
                align: "center",
                render: this.renderNormalCels
            },
            {
                title: "Chủ nhật",
                dataIndex: "sun",
                key: "sun",
                align: "center",
                render: this.renderNormalCels
            },
        ]
    }

    get tableSource() {
        let result = [];

        let startDate = this.getMonday(this.state.pickedTime)
        let endDate = this.getSunday(this.state.pickedTime);

        let schedules = this.props.getSchedules(startDate, endDate);
        
        for(let i = 0; i < schoolTimes.length; i++) {
            let schoolTime = schoolTimes[i];

            let data = {
                time: schoolTime,
            }

            for(let j = 0; j < schedules.length; j++) {
                let schedule = schedules[j];
                if (schoolTime.timeCode >= schedule.startTime &&
                    schoolTime.timeCode < schedule.startTime + schedule.length) {
                    data[`${schedule.weekday}`] = schedule;
                }
            }

            result.push(data);
        }

        return result;
    }

    /** Lấy ngày đầu tiên trong tuần */
    getMonday(today) {
        let day = new Date(today);
        let first = day.getDate() - day.getDay() + 1;

        return new Date(day.setDate(first));
    }
    
    /** Lấy ngày cuối trong tuần */
    getSunday(today) {
        let day = new Date(today);
        let first = day.getDate() - day.getDay() + 1;
        let last = first + 6;

        return new Date(day.setDate(last));
    }

    handleWeekPickerOnChange(date) {
        this.setState({
           pickedTime: date
        });
    }

    render() {
        return (
            <div>
                <Table 
                    size="middle"
                    bordered
                    pagination={{pageSize: 12, hideOnSinglePage: true}}
                    rowKey={record => record.time.name}
                    title={this.tableTitle}
                    dataSource={this.tableSource} 
                    columns={this.columns} 
                    rowKey={record => record.id}
                />
            </div>
        );
    }
}
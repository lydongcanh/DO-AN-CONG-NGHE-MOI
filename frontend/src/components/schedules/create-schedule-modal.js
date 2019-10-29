import React, { Component } from "react";
import { Modal, Table, Button, Card, Tabs } from "antd";
import CreateScheduleDetailsModal from "./create-schedule-details-modal";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import TeacherRepo from "../../repository/prop/teacher-repository";
import schoolTimes from "../../types/schoolTimes";

const { TabPane } = Tabs;

/** [Required props: visible, onCancel, onOk, studyclass] */
export default class AdminScheduleModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scheduleDetailsVisible: false,
            scheduleDetailsTime: undefined,
            scheduleDetailsDate: undefined,
            oldDetails: [],
            newDetails: [],
            teacherTitles: {},
            semester: "HK1"
        };

        this.handleAddSchedule = this.handleAddSchedule.bind(this);
        this.handleScheduleDetailsModalCancel = this.handleScheduleDetailsModalCancel.bind(this);
        this.handleScheduleDetailsModalOk = this.handleScheduleDetailsModalOk.bind(this);
        this.handleTabsChange = this.handleTabsChange.bind(this);
    }

    async componentWillReceiveProps(props) {
        const oldDetails = await ScheduleRepo.getSchedulesByClassId(props.studyclass.id);
        const allTeachers = await TeacherRepo.getAllTeachers();
    
        let teacherTitles = {};
        allTeachers.forEach(teacher => {
            teacherTitles[`${teacher.id}`] = teacher.name;
        });

        this.setState({
            oldDetails: oldDetails,
            teacherTitles: teacherTitles
        });
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
        const scheduleDetails = this.state.oldDetails.concat(this.state.newDetails);

        for (let i = 0; i < schoolTimes.length; i++) {
            let schoolTime = schoolTimes[i];

            let data = {
                time: schoolTime,
            }

            for(let j = 0; j < scheduleDetails.length; j++) {
                let scheduleDetail = scheduleDetails[j];
                scheduleDetail.teacherName = this.state.teacherTitles[`${scheduleDetail.teacherId}`];
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
                <Card size="small">
                    <p>{schedule.subject}</p>
                    <p>{schedule.teacherName}</p>
                </Card>
            );
        } else {
            result.children = (
                <Button
                    onClick={() => this.handleAddSchedule(schedule, data, index, date)}
                    size="small"
                    shape="circle"
                    icon="plus" 
                />
            );
        }

        return result;
    }

    handleTabsChange(semester) {
        this.setState({
            semester: semester
        });
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

    handleScheduleDetailsModalOk(teacher, subject, time, date) {
        const schedule = {
            time: time,
            date: date,
            semester: this.state.semester,
            state: "active",
            subject: subject,
            teacher: teacher,
            studyclass: this.props.studyclass
        };

        this.setState(state => ({
            scheduleDetailsVisible: false,
            newDetails: [...state.newDetails, schedule]
        }));
    }

    render() {
        return (
            <Modal
                width={1000}
                onOk={async () => await this.props.onOk(this.state.newDetails)}
                onCancel={this.props.onCancel}
                visible={this.props.visible}
                cancelText="Hủy"
                okText="Lưu"
                closable={false}
            >
                <Tabs 
                    defaultActiveKey="HK1"
                    onChange={this.handleTabsChange}
                >
                    <TabPane tab="HK1" key="HK1">
                        <Table
                            size="small"
                            dataSource={this.getTableSource("HK1")}
                            pagination={{ hideOnSinglePage: true, defaultPageSize: 12 }}
                            bordered
                            title={() => <h3>Thời khóa biểu học kì 1 lớp {this.props.studyclass.grade}{this.props.studyclass.name}</h3>}
                            columns={this.columns}
                        />
                    </TabPane>
                    <TabPane tab="HK2" key="HK2">
                        <Table
                            size="small"
                            dataSource={this.getTableSource("HK2")}
                            pagination={{ hideOnSinglePage: true, defaultPageSize: 12 }}
                            bordered
                            title={() => <h3>Thời khóa biểu học kì 2 lớp {this.props.studyclass.grade}{this.props.studyclass.name}</h3>}
                            columns={this.columns}
                        />
                    </TabPane>
                </Tabs>

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
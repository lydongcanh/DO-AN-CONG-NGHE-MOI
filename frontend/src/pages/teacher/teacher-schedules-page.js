import React, { Component } from "react";
import { Tabs, Table, Card } from "antd";
import AccountRepo from "../../repository/prop/account-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";
import schoolTimes from "../../types/schoolTimes";

const { TabPane } = Tabs;

export default class TeacherSchedulesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacherId: "",
            scheduleDetails: [],
            classNames: {}
        }
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

        for (let i = 0; i < schoolTimes.length; i++) {
            let schoolTime = schoolTimes[i];

            let data = {
                time: schoolTime,
            }

            for(let j = 0; j < this.state.scheduleDetails.length; j++) {
                const scheduleDetail = this.state.scheduleDetails[j];

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
                <p>{schedule.subject} - {this.state.classNames[schedule.classId]}</p>
            );
        } else {
            result.children = "-";
        }

        return result;
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const account = await AccountRepo.getAccountWithUsername(params.username);
        const scheduleDetails = await ScheduleRepo.getSchedulesByTeacherId(account.teacherId);
        
        if (!scheduleDetails)
            return;

        let classNames = {};
        for(let i = 0; i < scheduleDetails.length; i++) {
            const schedule = scheduleDetails[i];
            if (!classNames.hasOwnProperty(schedule.teacherId)) {
                const studyclass = await ClassRepo.getStudyclassById(schedule.classId);
                classNames[`${schedule.classId}`] = studyclass.grade + studyclass.name;
            }
        }

        this.setState({
            scheduleDetails: scheduleDetails,
            classNames: classNames
        });
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
                        title={() => <h3>Lịch dạy học kì 1</h3>}
                        columns={this.columns}
                    />
                </TabPane>
                <TabPane tab="HK2" key="HK2">
                    <Table
                        dataSource={this.getTableSource("HK2")}
                        pagination={{ hideOnSinglePage: true, defaultPageSize: 12 }}
                        bordered
                        title={() => <h3>Lịch dạy học kì 2</h3>}
                        columns={this.columns}
                    />
                </TabPane>
            </Tabs>

        );
    }
}
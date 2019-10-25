import React, { Component } from "react";
import TimeTable from "../../components/timetable";

import mockDB from "../../repository/mock/mockDB";

export default class TeacherSchedulesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schedules: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const account = mockDB.getAccountWithUsername(params.username);
        const schedules = mockDB.getTeacherSchedules(account.teacherId);

        this.setState({
            schedules: schedules
        })
    }

    render() {
        return (
            <TimeTable />
        );
    }
}
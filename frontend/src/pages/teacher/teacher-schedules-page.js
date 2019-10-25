import React, { Component } from "react";
import TimeTable from "../../components/timetable";

import mockDB from "../../repository/mock/mockDB";

export default class TeacherSchedulesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacherId: ""
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const account = mockDB.getAccountWithUsername(params.username);

        this.setState({
            teacherId: account.teacherId
        })
    }

    render() {
        return (
            <TimeTable getSchedules={(from, to) => mockDB.getTeacherSchedulesInRange(this.state.teacherId, from, to)}/>
        );
    }
}
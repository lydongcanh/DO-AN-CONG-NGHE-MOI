import React, { Component } from "react";
import TimeTable from "../../components/timetable";

import mockDB from "../../repository/mock/mockDB";

export default class StudentSchedulesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {}
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const student = mockDB.getStudentWithId(params.id);

        this.setState({
            student: student
        })
    }

    render() {
        if (!this.state.student)
            return <h3>Thông tin học sinh không hơp lệ.</h3>
        
        return ( 
            <TimeTable getSchedules={(from, to) => mockDB.getStudentSchedulesInRange(this.state.student.id, from, to)}/>
        );
    }
}
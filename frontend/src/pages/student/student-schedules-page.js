import React, { Component } from "react";
import ScheduleView from "../../components/schedules/schedule-view";
import StudentRepo from "../../repository/prop/student-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";

export default class StudentSchedulesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            scheduleDetails: [],
            classNames: []
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const student = await StudentRepo.getStudentById(params.id);
        const scheduleDetails = await ScheduleRepo.getSchedulesByClassId(student.classId);

        if (!scheduleDetails)
            return;

        let classNames = {};
        for (let i = 0; i < scheduleDetails.length; i++) {
            const schedule = scheduleDetails[i];
            if (!classNames.hasOwnProperty(schedule.teacherId)) {
                const studyclass = await ClassRepo.getStudyclassById(schedule.classId);
                classNames[`${schedule.classId}`] = studyclass.grade + studyclass.name;
            }
        }

        this.setState({
            student: student,
            scheduleDetails: scheduleDetails,
            classNames: classNames
        })
    }

    render() {
        if (!this.state.student)
            return <h3>Thông tin học sinh không hơp lệ.</h3>

        return (
            <ScheduleView
                scheduleDetails={this.state.scheduleDetails}
                classNames={this.state.classNames}
            />
        );
    }
}
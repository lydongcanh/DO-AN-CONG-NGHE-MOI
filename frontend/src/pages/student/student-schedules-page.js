import React, { Component } from "react";
import ScheduleView from "../../components/schedules/schedule-view";
import StudentRepo from "../../repository/prop/student-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import TeacherRepo from "../../repository/prop/teacher-repository";

export default class StudentSchedulesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            student: {},
            scheduleDetails: [],
            teacherNames: {}
        }
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const student = await StudentRepo.getStudentById(params.id);
        const scheduleDetails = await ScheduleRepo.getSchedulesByClassId(student.classId);

        if (!scheduleDetails)
            return;

        let teacherNames = {};
        for (let i = 0; i < scheduleDetails.length; i++) {
            const schedule = scheduleDetails[i];
            if (!teacherNames.hasOwnProperty(schedule.teacherId)) {
                const teacher = await TeacherRepo.getTeacherById(schedule.teacherId);
                teacherNames[`${schedule.teacherId}`] = teacher.name;
            }
        }

        this.setState({
            student: student,
            scheduleDetails: scheduleDetails,
            teacherNames: teacherNames
        })
    }

    render() {
        if (!this.state.student)
            return <h3>Thông tin học sinh không hơp lệ.</h3>

        return (
            <ScheduleView
                scheduleDetails={this.state.scheduleDetails}
                teacherNames={this.state.teacherNames}
            />
        );
    }
}
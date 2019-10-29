import React, { Component } from "react";
import ScheduleView from "../../components/schedules/schedule-view";
import AccountRepo from "../../repository/prop/account-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";

export default class TeacherSchedulesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacherId: "",
            scheduleDetails: [],
            classNames: {}
        }
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
            <ScheduleView
                scheduleDetails={this.state.scheduleDetails}
                classNames={this.state.classNames}
            />
        );
    }
}
import React, { Component } from "react";
import { Modal, Form, Select, message } from "antd";
import TeacherRepo from "../../repository/prop/teacher-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import subjects from "../../types/subjects";

const { Option } = Select;

/** Required props: time, date, semester, classId, visible, onCalcel, onOk */
export default class CreateScheduleDetailsModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: subjects[0],
            selectedTeacherId: "",
            availableTeachers: [],
        };
        
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
        this.handleTeacherSelectChange = this.handleTeacherSelectChange.bind(this);
        this.handleOnOk = this.handleOnOk.bind(this);
    }

    get teacherSelectOptions() {
        let options = [];
        const teachers = this.state.availableTeachers;
        for(let i = 0; i < teachers.length; i++) {
            options.push(
                <Option 
                    value={teachers[i].id}
                    key={teachers[i].id}
                >
                    {teachers[i].name} ({teachers[i].email})
                </Option>
            );
        }
        return options;
    }

    get subjectSelectOptions() {
        let options = [];
        for(let i = 0; i < subjects.length; i++) {
            options.push(
                <Option 
                    value={subjects[i]}
                    key={subjects[i]}
                >
                    {subjects[i]}
                </Option>
            );
        }
        return options;
    }

    async componentWillReceiveProps(_) {
        const allTeacher = await TeacherRepo.getTeachersBySubject(subjects[0]);
        const availableTeachers = await this.filterUnavailableTeacher(allTeacher);        

        this.setState({
            subject: subjects[0],
            availableTeachers: availableTeachers,
            selectedTeacherId: availableTeachers.length > 0 ? availableTeachers[0].id : ""
        });
    }

    async handleSubjectSelectChange(subject) {
        const allTeacher = await TeacherRepo.getTeachersBySubject(subject);
        const availableTeachers = await this.filterUnavailableTeacher(allTeacher);        

        this.setState({
            subject: subject,
            availableTeachers: availableTeachers,
            selectedTeacherId: availableTeachers.length > 0 ? availableTeachers[0].id : ""
        });
    }

    handleTeacherSelectChange(teacher) {  
        this.setState({
           selectedTeacherId: teacher
        });
    }

    async handleOnOk() {
        const teacherId = this.state.selectedTeacherId;
        if (!teacherId || teacherId == "") {
            message.error("Hiện tại không có giáo viên thích hợp cho môn học này.");
            return;
        }

        const teacher = await TeacherRepo.getTeacherById(this.state.selectedTeacherId);
        if (!teacher) {
            message.error("Hiện tại không có giáo viên thích hợp cho môn học này.");
            return;
        }

        const result = await ScheduleRepo.createSchedule(
            this.props.classId,
            teacherId,
            this.props.time,
            this.props.date,
            this.props.semester,
            "active",
            this.state.subject
        );

        if (result && !result.error) {
            message.success("Thêm thời khóa biểu thành công.");
            this.props.onOk(result);
        } else {
            message.error("Thêm thời khóa biểu thất bại.");
            console.log(result);
        }
    }

    async filterUnavailableTeacher(teachers) {
        let result = [];
        for(let i = 0; i < teachers.length; i++) {
            const teacher = teachers[i];
            const schedules = await ScheduleRepo.getSchedulesByTeacherId(teacher.id);

            if (!schedules || schedules.length < 1) {
                result.push(teacher);
                continue;
            }

            if (this.checkAvailableSchedules(schedules))
                result.push(teacher);
        }

        // console.log("filterUnavailableTeacher",{
        //     all: teachers,
        //     result: result
        // });

        return result;
    }

    checkAvailableSchedules(schedules) {
        for(let j = 0; j < schedules.length; j++) {
            const schedule = schedules[j];
            if (schedule.time == this.props.time &&
                schedule.date == this.props.date)
                return false;
        }
        return true;
    }

    render() {
        return (
            <Modal
                cancelText="Hủy"
                okText="Lưu"
                centered
                closable={false}
                title={`Thời khóa biểu ${this.props.date} ${this.props.time}`}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.handleOnOk}
            >
                <Form>
                    <Form.Item label="Môn học">
                        <Select
                            value={this.state.subject}
                            onChange={this.handleSubjectSelectChange}
                            placeholder="Chọn môn học"
                        >
                            {this.subjectSelectOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Giáo viên">
                        <Select
                            value={this.state.selectedTeacherId}
                            onChange={this.handleTeacherSelectChange}
                            placeholder="Chọn giáo viên"
                        >
                            {this.teacherSelectOptions}
                        </Select>
                    </Form.Item>
                </Form>    
            </Modal>
        );
    }
}
import React, { Component } from "react";
import { Modal, Form } from "antd";
import TeacherRepo from "../../repository/prop/teacher-repository";
import ScheduleRepo from "../../repository/prop/schedule-repository";
import SubjectSelect from "../subject-select";
import TeacherSimpleSelect from "../../components/teachers/teacher-simple-select";
import subjects from "../../types/subjects";

/** Required props: time, date, visible, onCalcel, onOk */
export default class CreateScheduleDetailsModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: subjects[0],
            teacher: {},
            availableTeachers: [],
        };
        
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
        this.handleTeacherSelectChange = this.handleTeacherSelectChange.bind(this);
    }

    async componentWillReceiveProps(_) {
        const allTeacher = await TeacherRepo.getTeachersBySubject(subjects[0]);
        console.log("componentWillReceiveProps all teachers", allTeacher);

        const availableTeachers = await this.filterUnavailableTeacher(allTeacher);        
        console.log("componentWillReceiveProps available teachers", availableTeachers);

        this.setState({
            teacher: {},
            subject: subjects[0],
            availableTeachers: availableTeachers
        });
    }

    async handleSubjectSelectChange(subject) {
        const allTeacher = await TeacherRepo.getTeachersBySubject(subject);
        console.log("handleSubjectSelectChange all teachers", allTeacher);

        const availableTeachers = await this.filterUnavailableTeacher(allTeacher);        
        console.log("handleSubjectSelectChange available teachers", availableTeachers);

        this.setState({
            subject: subject,
            availableTeachers: availableTeachers
        });
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
            
            for(let j = 0; j < schedules.length; j++) {
                const schedule = schedules[j];
                if (schedule.time == this.props.time &&
                    schedule.date == this.props.date)
                    continue;

                result.push(teacher);
            }
        }
        return result;
    }

    handleTeacherSelectChange(teacher) {        
        this.setState({
            teacher: teacher
        })
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
                onOk={() => this.props.onOk(this.state.teacher, this.state.subject, this.props.time, this.props.date)}
            >
                <Form>
                    <Form.Item label="Môn học">
                        <SubjectSelect
                            onChange={this.handleSubjectSelectChange}
                        />
                    </Form.Item>
                    <Form.Item label="Giáo viên">
                        <TeacherSimpleSelect
                            defaultValue={this.subject}
                            onChange={this.handleTeacherSelectChange}
                            teachers={this.state.availableTeachers}
                        />
                    </Form.Item>
                </Form>    
            </Modal>
        );
    }
}
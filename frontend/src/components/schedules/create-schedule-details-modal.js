import React, { Component } from "react";
import { Modal, Form } from "antd";
import TeacherRepo from "../../repository/prop/teacher-repository";
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

    async componentDidMount() {
        const availableTeachers = await TeacherRepo.getTeachersBySubject(subjects[0]);
        this.setState({
            availableTeachers: availableTeachers
        });
    }

    async handleSubjectSelectChange(subject) {
        const availableTeachers = await TeacherRepo.getTeachersBySubject(subject);
        this.setState({
            subject: subject,
            availableTeachers: availableTeachers
        });
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
                            onChange={this.handleTeacherSelectChange}
                            teachers={this.state.availableTeachers}
                        />
                    </Form.Item>
                </Form>    
            </Modal>
        );
    }
}
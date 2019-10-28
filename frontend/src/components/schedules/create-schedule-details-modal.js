import React, { Component } from "react";
import { Modal, Form } from "antd";
import TeacherRepository from "../../repository/prop/teacher-repository";
import SubjectSelect from "../subject-select";
import subjects from "../../types/subjects";

/** Required props: time, date, visible, onCalcel, onOk */
export default class CreateScheduleDetailsModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: subjects[0]
        };

        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
    }

    handleSubjectSelectChange(subject) {
        this.setState({
            subject: subject
        });
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
                onOk={() => this.props.onOk()}
            >
                <Form>
                    <Form.Item label="Môn học">
                        <SubjectSelect
                            onChange={this.handleSubjectSelectChange}
                        />
                    </Form.Item>
                    <Form.Item label="Giáo viên">
                
                    </Form.Item>
                </Form>    
            </Modal>
        );
    }
}
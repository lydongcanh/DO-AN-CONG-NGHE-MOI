import React, { Component } from "react";
import { Modal, Form, Input, Button } from "antd";
import GradeSelect from "../../components/grade-select";
import StudentRepo from "../../repository/prop/student-repository";
import grades from "../../types/grades";

/** Required props: onOk, onCancel, visible */
class CreateClassModal extends Component {

    constructor(props) {
        super(props);

        this.handleGradeSelectChange = this.handleGradeSelectChange.bind(this);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);

        this.state = {
            grade: grades[0],
            name: undefined,
        }
    }

    /** Sự kiện chọn khối */
    handleGradeSelectChange(grade) {
        this.setState({
            grade: grade
        });

        this.setState({
            searchedStudents: StudentRepo.getStudent
        })
    }

    /** Sử kiện nhập tên */
    handleNameInputChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    /** Chọn khối */
    gradeSelect(getFieldDecorator) {
        return getFieldDecorator("grade", {
        })(<GradeSelect defaultValue={grades[0]} onChange={this.handleGradeSelectChange} />);
    }

    /** Nhập tên */
    nameInput(getFieldDecorator) {
        return getFieldDecorator("name", {   
            rules: [
                { required: true, message: "Tên lớp không được bỏ trống." },
                { max: 10, message: "Vượt quá số ký tự cho phép." }
            ],
        })(<Input onChange={this.handleNameInputChange} placeholder="Nhập tên lớp"/>);
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="Thêm lớp học"
                closable={false}
                okText="Lưu"
                cancelText="Hủy"
                onOk={() => this.props.onOk(this.state)}
                onCancel={this.props.onCancel}
                visible={this.props.visible}
            >
                <Form>
                    <Form.Item label="Khối">
                        {this.gradeSelect(getFieldDecorator)}
                    </Form.Item>
                    <Form.Item label="Tên lớp">
                        {this.nameInput(getFieldDecorator)}
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}

export default Form.create()(CreateClassModal);
import React, { Component } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import GradeSelect from "../../components/grade-select";
import ClassRepo from "../../repository/prop/studyclass-repository";
import grades from "../../types/grades";

/** Required props: onOk, onCancel, visible */
class CreateClassModal extends Component {

    constructor(props) {
        super(props);

        this.handleGradeSelectChange = this.handleGradeSelectChange.bind(this);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            grade: grades[0],
            name: "",
        }
    }

    /** Sự kiện chọn khối */
    handleGradeSelectChange(grade) {
        this.setState({
            grade: grade
        });
    }

    /** Sử kiện nhập tên */
    handleNameInputChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (error, values) => {
            if (error)
                return;

            const grade = this.state.grade;
            const name = this.state.name;
            const oldClass = await ClassRepo.getStudyclassByGradeAndName(grade, name);
            console.log(oldClass);
            if (oldClass && oldClass.name) {
                message.error(`Tạo lớp học không thành công. Đã có lớp tên "${name}" trong khối ${grade}.`);
                return;
            }

            const result = ClassRepo.createStudyclass(name, grade);

            if (result && !result.error) {
                message.success('Thêm lớp học thành công!');
                //this.setState({id: "null"});
                this.props.onOk();
            } else {
                message.error("Thêm lớp học không thành công.");
                console.log(result, this.state);
            }
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
                onOk={() => this.props.onOk(this.state)}
                onCancel={this.props.onCancel}
                footer={null}
                visible={this.props.visible}
            >
                <Form style={{textAlign: "left"}} onSubmit={this.handleSubmit}>
                    <Form.Item label="Khối">
                        {this.gradeSelect(getFieldDecorator)}
                    </Form.Item>

                    <Form.Item label="Tên lớp">
                        {this.nameInput(getFieldDecorator)}
                    </Form.Item>

                    <Form.Item style={{ textAlign: "right" }}>
                            <Button onClick={this.props.onCancel} style={{ marginRight: "10px" }}>Huỷ</Button>
                            <Button type="primary" htmlType="submit">Lưu</Button>
                        </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(CreateClassModal);
import React, { Component } from "react";
import { Form, Button, message, Input, Radio, DatePicker, Modal } from "antd";
import StudentRepo from "../../repository/prop/student-repository";
import moment from "moment";

/** [Required props : handleCancel, handleSaveSucces, student] */
class UpdateStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.student.id,
            value: this.props.student.gender,
            birthday: this.props.student.birthday,
            name: this.props.student.name,
            address: this.props.student.address,
            phoneNumber: this.props.student.phoneNumber,
            state: this.props.student.state,
        }

        this.onChange = this.onChange.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
        this.handleChangeRadioGroup = this.handleChangeRadioGroup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        if (!props || props.student.id == this.state.id)
            return;

        this.setState({
            id: props.student.id,
            value: props.student.gender,
            birthday: props.student.birthday,
            address: props.student.address,
            name: props.student.name,
            phoneNumber: props.student.phoneNumber,
            state: props.student.state
        });
    }

    RadioSelect() {
        return (
            <Radio.Group onChange={this.handleChangeRadioGroup} value={this.state.value}>
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                closable={false}
                visible={this.props.visible}
                width="35%"
                footer={null}
                title="Cập nhật thông tin học sinh"
                onCancel={this.props.handleCancel}>
                <Form style={{ textAlign: "left" }} onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('name', {
                            initialValue: this.state.name,
                            rules: [
                                { required: true, message: 'Tên học sinh không được bỏ trống.' },
                                {
                                    pattern: new RegExp(/^[A-Za-z]+([\ A-Za-z]+)*/),
                                    message: "Tên học sinh không hợp lệ."
                                },
                                { max: 30, message: 'Vượt quá số ký tự cho phép.' }
                            ],
                        })(<Input placeholder="Tên" name="name" onChange={this.onChange}></Input>)}
                    </Form.Item>
                    <Form.Item >
                        {this.RadioSelect()}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('birthday', {
                            initialValue: moment(`"${this.state.birthday}"`),
                            rules: [
                                { required: true, message: 'Ngày sinh không được bỏ trống.' }
                            ],
                        })(<DatePicker
                            placeholder="Chọn ngày sinh"
                            name="birthday"
                            onChange={(date, dateString) => this.onChangeDatePicker(date, dateString)}
                            format="DD/MM/YYYY"
                            disabledDate={d => !d || d.isAfter(moment())}
                        />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('address', {
                            initialValue: this.state.address,
                            rules: [
                                { required: true, message: 'Địa chỉ không được bỏ trống.' },
                                { max: 40, message: 'Vượt quá số ký tự cho phép.' }
                            ],
                        })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            initialValue: this.state.phoneNumber,
                            rules: [
                                { required: true, message: 'Số điện thoại không được để trống.' },
                                {
                                    pattern: new RegExp(/^0+\d{9}$/g),
                                    message: "Số điện thoại phải bắt đầu bằng số 0 và có 10 số."
                                }
                            ],
                        })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={this.props.handleCancel} style={{ marginRight: "10px" }}>Huỷ</Button>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </div>
                </Form>
            </Modal>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err)
                return;

            const student = {
                id: this.props.student.id,
                name: this.state.name,
                gender: this.state.value,
                classId: this.props.student.classId,
                grade: this.props.student.grade,
                birthday: this.state.birthday,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                state: this.state.state
            };

            const result = await StudentRepo.updateStudent(student);

            if (result && !result.error) {
                message.success('Cập nhật thông tin học sinh thành công!');
                this.props.handleSaveSuccess(student);
            } else {
                message.error("Cập nhật thông tin học sinh không thành công.");
                console.log(result, student, this.state);
            }
        });
    };

    handleChangeRadioGroup(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubjectSelectChange(subject) {
        this.setState({
            subject: subject
        });
    }

    onChange(e) {
        if (e.target !== undefined) {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    onChangeDatePicker(defaultValue, dateString) {
        this.setState({
            birthday: dateString
        });
    }
}
export default Form.create()(UpdateStudent);
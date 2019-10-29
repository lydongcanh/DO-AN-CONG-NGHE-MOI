import React, { Component } from "react";
import { Form, Button, Input, message, Radio, DatePicker, Modal } from "antd";
import TeacherRepo from "../../repository/prop/teacher-repository";
import SubjectSelect from "../../components/subject-select"
import subjects from "../../types/subjects";

/** [Require handleCancel, handleSaveSuccess] */
class CreateTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: subjects[0],
            visible: false,
            value: "Nam",
            teacher: {},
            valueDatepicker: '',
        }
        this.onChange = this.onChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    RadioSelect() {
        return (
            <Radio.Group onChange={this.handleChange} value={this.state.value} name="gender">
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
                onCancel={this.props.handleCancel}
                header={null}
                footer={null}
                width="35%">
                <div>
                    <Form style={{ textAlign: "left" }} onSubmit={this.handleSubmit}>
                        <h2>Thêm giáo viên</h2>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: 'Vui lòng nhập tên' },
                                    {
                                        pattern: new RegExp(/^[A-Za-z]+([\ A-Za-z]+)*/),
                                        message: "Tên không hợp lệ"
                                    },
                                    { max: 30, message: ' Vượt quá ký tự cho phép' }
                                ],
                            })(<Input placeholder="Tên" name="name" onChange={this.onChange}></Input>)}
                        </Form.Item>
                        <Form.Item >
                            {this.RadioSelect()}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('birthday', {
                                rules: [
                                    { required: true, message: 'Vui lòng chọn ngày' }
                                ],
                            })(<DatePicker placeholder="Chọn ngày sinh" name="birthday" onChange={(date, dateString) => this.onChangeDatePicker(date, dateString)} format="DD/MM/YYYY"></DatePicker>)}
                        </Form.Item>
                        <Form.Item>
                            <SubjectSelect onChange={this.handleSubjectSelectChange}></SubjectSelect>
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('address', {
                                rules: [
                                    { required: true, message: 'Vui lòng nhập địa chỉ' },
                                    { max: 40, message: ' Vượt quá ký tự cho phép' }
                                ],
                            })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('mail', {
                                rules: [
                                    { required: true, message: 'Vui lòng nhập email' },
                                    {
                                        pattern: new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
                                        message: "email không hợp lệ"
                                    },
                                    { max: 30, message: ' Vượt quá ký tự cho phép' }
                                ],
                            })(<Input placeholder="Email" name="email" onChange={this.onChange}></Input>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: 'Số điện thoại không hợp lệ' },
                                    {
                                        pattern: new RegExp(/^0+\d{9}$/g),
                                        message: "Sai định dạng số điện thoại"
                                    }
                                ],
                            })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button onClick={this.props.handleCancel} style={{ marginRight: "10px" }}>Huỷ</Button>
                            <Button type="primary" htmlType="submit" onClick={this.handleSaveClick}>Lưu</Button>
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log("submit");

        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const teacher = {
                    name: this.state.name,
                    gender: this.state.value,
                    birthday: this.state.valueDatepicker,
                    address: this.state.address,
                    email: this.state.email,
                    phoneNumber: this.state.phoneNumber,
                    subject: this.subject,
                }

                const result = await TeacherRepo.createTeacher(
                    teacher.name,
                    teacher.gender,
                    teacher.subject,
                    teacher.birthday,
                    teacher.address,
                    teacher.email,
                    teacher.phoneNumber,
                    "active"
                );

                if (!result.error) {
                    message.success('Thêm giáo viên thành công!');
                    await this.props.handleSaveSuccess(teacher);
                } else {
                    message.error("Thêm giáo viên thất bại!");
                    console.log("ERROR", result);
                }
            }
        });
    }

    handleSubjectSelectChange(subject) {
        this.setState({
            subject: subject
        });
    }

    handleChange(e) {
        this.setState({
            value: e.target.value,
            [e.target.name]: e.target.value
        })
    }

    /* set gia tri tren field*/
    onChange(e) {
        if (e.target !== undefined) this.setState({
            [e.target.name]: e.target.value
        })
        console.log('a', e.target.value)
    }

    // Lay gia tren datepicker
    onChangeDatePicker(date, dateString) {
        this.setState({
            valueDatepicker: dateString
        })
    }

    /* Luu giao vien */
    async handleSaveClick() {

        console.log("handleSaveClick");

        // if (!result.error) {
        //     message.success('Thêm giáo viên thành công!');
        //     await this.props.handleSaveSuccess(teacher);
        // } else {
        //     message.error("Thêm giáo viên thất bại!");
        //     console.log("ERROR", result);
        // }
    }
}
export default Form.create()(CreateTeacher);
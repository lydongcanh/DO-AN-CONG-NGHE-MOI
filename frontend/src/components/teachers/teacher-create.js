import React, { Component } from "react";
import { Form, Button, Input, message, Radio, DatePicker, Modal } from "antd";
import TeacherRepo from "../../repository/prop/teacher-repository";
import AccountRepo from "../../repository/prop/account-repository";
import SubjectSelect from "../../components/subject-select"
import subjects from "../../types/subjects";
import moment from "moment";

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
                title="Thêm giáo viên"
                footer={null}
                width="35%">
                <div>
                    <Form style={{ textAlign: "left" }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Tên">
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: 'Tên giáo viên không được bỏ trống.' },
                                    {
                                        pattern: new RegExp(/^[A-Za-z]+([\ A-Za-z]+)*/),
                                        message: "Tên giáo viên không hợp lệ."
                                    },
                                    { max: 30, message: 'Vượt quá số ký tự cho phép.' }
                                ],
                            })(<Input placeholder="Tên" name="name" onChange={this.onChange}></Input>)}
                        </Form.Item>

                        <Form.Item label="Giới tính">
                            {this.RadioSelect()}
                        </Form.Item>

                        <Form.Item label="Ngày sinh">
                            {getFieldDecorator('birthday', {
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

                        <Form.Item label="Môn giảng dạy">
                            <SubjectSelect 
                                onChange={this.handleSubjectSelectChange}
                                defaultValue={subjects[0]}
                            />
                        </Form.Item>

                        <Form.Item label="Địa chỉ">
                            {getFieldDecorator('address', {
                                rules: [
                                    { required: true, message: 'Địa chỉ không được bỏ trống.' },
                                    { max: 40, message: 'Vượt quá số ký tự cho phép.' }
                                ],
                            })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>)}
                        </Form.Item>

                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: 'Email không được để trống.' },
                                    {
                                        pattern: new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
                                        message: "Email không hợp lệ."
                                    },
                                    { max: 30, message: 'Vượt quá số ký tự cho phép.' }
                                ],
                            })(<Input placeholder="Email" name="email" onChange={this.onChange}></Input>)}
                        </Form.Item>

                        <Form.Item label="Số điện thoại">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: 'Số điện thoại không được để trống.' },
                                    {
                                        pattern: new RegExp(/^0+\d{9}$/g),
                                        message: "Số điện thoại phải bắt đầu bằng số 0 và có 10 số."
                                    }
                                ],
                            })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                        </Form.Item>
                        
                        <Form.Item label="Tài khoản">
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: 'Tài khoản không được để trống.' },
                                    { max: 30, message: "Vượt quá số ký tự cho phép." }
                                ],
                            })(<Input placeholder="Tài khoản" name="username" onChange={this.onChange}></Input>)}
                        </Form.Item>

                        <Form.Item label="Mật khẩu">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: 'Mật khẩu không được để trống' },
                                    {
                                        pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                                        message: "Mật khẩu phải có ít nhất 8 ký tự gồm ít nhất 1 chữ & 1 số."
                                    }
                                ],
                            })(<Input placeholder="Mật khẩu" type="password" name="password" onChange={this.onChange}></Input>)}
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

    async handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err)
                return;

            const otherAccount = await AccountRepo.getAccountWithUsername(this.state.username);
            if (otherAccount.username) {
                message.error("Thêm giáo viên không thành công, tài khoản đã tồn tại.");
                return;
            }

            const teacher = {
                name: this.state.name,
                gender: this.state.value,
                birthday: this.state.valueDatepicker,
                address: this.state.address,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                subject: this.subject,
            }

            const account = {
                username: this.state.username,
                password: this.state.password
            };

            const createdTeacher = await TeacherRepo.createTeacher(
                teacher.name,
                teacher.gender,
                teacher.subject,
                teacher.birthday,
                teacher.address,
                teacher.email,
                teacher.phoneNumber,
                "active"
            );

            await AccountRepo.createAccount(
                account.username,
                account.password,
                "teacher",
                createdTeacher.id
            );

            message.success("Thêm giáo viên thành công.");
            this.props.handleSaveSuccess(teacher)
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
    }

    // Lay gia tren datepicker
    onChangeDatePicker(date, dateString) {
        this.setState({
            valueDatepicker: dateString
        });
    }

    /* Luu giao vien */
    async handleSaveClick() {
        console.log("handleSaveClick");
    }
}
export default Form.create()(CreateTeacher);
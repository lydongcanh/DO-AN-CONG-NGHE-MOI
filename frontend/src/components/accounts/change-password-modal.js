import React, { Component } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import AccountRepo from "../../repository/prop/account-repository";

/** Required props: oldAccount, visible, onCancel, onSuccess(newAccount) */
class ChangePasswordModal extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            oldPassword: "",
            newPassword: "",
            checkPassword: ""
        }
    }

    onChange(e) {
        if (e.target !== undefined) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    async onValidate(error, values) {

    }

    async onSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (error, values) =>  {
            if (error)
                return;

            if (this.state.newPassword !== this.state.checkPassword) {
                message.error("Mật khẩu được nhập lại không trùng khớp với mật khẩu mới.");
                return;
            }
            
            const oldAccount = this.props.account;
            if (oldAccount.password !== this.state.oldPassword) {
                message.error("Mật khẩu cũ không hợp lệ.");
                return;
            }

            const newAccount = {
                username: this.props.account.username,
                password: this.state.newPassword,
                type: this.props.account.type,
                teacherId: this.props.account.teacherId
            }
            const result = await AccountRepo.updateAccount(newAccount);

            if (result && !result.error) {
                message.success("Đổi mật khẩu thành công.");
                this.props.onSuccess(newAccount);
            } else {
                message.error("Đổi mật khẩu không thành công.");
                console.log(result);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                closable={false}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                title="Đổi mật khẩu"
                footer={null}
            >
                <Form style={{ textAlign: "left" }} onSubmit={this.onSubmit}>
                    <Form.Item>
                        {getFieldDecorator('oldPassword', {
                            rules: [
                                { required: true, message: 'Mật khẩu cũ không được để trống.' },
                                //{
                                    //pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                                    //message: "Mật khẩu phải có ít nhất 8 ký tự gồm ít nhất 1 chữ & 1 số."
                                //}
                            ],
                        })(<Input placeholder="Mật khẩu cũ" type="password" name="oldPassword" onChange={this.onChange}></Input>)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                { required: true, message: 'Mật khẩu mới không được để trống.' },
                                {
                                    pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                                    message: "Mật khẩu phải có ít nhất 8 ký tự gồm ít nhất 1 chữ & 1 số."
                                }
                            ],
                        })(<Input placeholder="Mật khẩu mới" type="password" name="newPassword" onChange={this.onChange}></Input>)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('checkPassword', {
                            rules: [
                                { required: true, message: 'Mật khẩu mới không được để trống.' },
                                {
                                    pattern: new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                                    message: "Mật khẩu phải có ít nhất 8 ký tự gồm ít nhất 1 chữ & 1 số."
                                }
                            ],
                        })(<Input placeholder="Nhập lại mật khẩu mới" type="password" name="checkPassword" onChange={this.onChange}></Input>)}
                    </Form.Item>

                    <Form.Item style={{ textAlign: "right" }}>
                        <Button onClick={this.props.onCancel} style={{ marginRight: "10px" }}>Huỷ</Button>
                        <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(ChangePasswordModal);
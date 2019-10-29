import React, { Component } from "react";
import { Button, message, Form, Input, Modal, Icon } from "antd";
import AccountRepository from "../repository/prop/account-repository";

/**
 * [Required props: handleCancel, handleLoginSuccess, visible]
 */
class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }

        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                title="Đăng nhập"
                footer={null}
                width="30%"
                style={{ textAlign: "center" }}>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('Username', {
                            rules: [
                                { required: true, message: 'Tài khoản không được bỏ trống.' },
                                {
                                    pattern: new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/),
                                    message: "Tài khoản hoặc mật khẩu không hợp lệ."
                                },
                                { max: 30, message: 'Vượt quá số ký tự cho phép.' }
                            ],
                        })(<Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="text"
                            name="username"
                            placeholder="Tài khoản"
                            onChange={this.handleChange} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('Password', {
                            rules: [
                                { required: true, message: 'Mật khẩu không được bỏ trống.' },
                                { max: 30, message: 'Vượt quá số ký tự cho phép.' }
                            ],
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            onChange={this.handleChange} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                            htmlType="submit"
                            onClick={this.handleLoginButton}
                            style={{ width: "100%" }}>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err)
                return;

        });
    };

    handleChange(e) {
        //gan gia tri khi nhap
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleLoginButton(e) {
        let account = await AccountRepository.getAccountWithUsername(this.state.username);
        if (!account || account.password != this.state.password) {
            message.error('Tài khoản hoặc mật khẩu không đúng.');
        } else {
            this.props.handleLoginSuccess(account);
        }
    }
}
export default Form.create()(LoginModal);
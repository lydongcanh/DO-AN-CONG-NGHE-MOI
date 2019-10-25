import React, { Component } from "react";
import { Button, Form, Input, Modal, Icon } from "antd";
import AccountRepository from "../repository/prop/account-repository";

/**
 * [Required props: handleCancel, handleLoginSuccess, visible]
 */
export default class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            username: "teacher1",
            password: "123",
        }

        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <Modal 
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                title="Đăng nhập"
                footer={null}
                width="30%"
                style={{ textAlign: "center" }}>
                <Form>
                    <Form.Item>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="text" 
                               name="username" 
                               placeholder="Tài khoản" 
                               value={this.state.username} 
                               onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               type="password" 
                               name="password" 
                               placeholder="Mật khẩu" 
                               value={this.state.password} 
                               onChange={this.handleChange} />
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

    handleChange(e) {
        //gan gia tri khi nhap
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async handleLoginButton() {
        let account = await AccountRepository.getAccountWithUsername(this.state.username);
        if (!account || account.password != this.state.password) {
            alert(JSON.stringify(account));
        } else {
            this.props.handleLoginSuccess(account);
        }
    }
}

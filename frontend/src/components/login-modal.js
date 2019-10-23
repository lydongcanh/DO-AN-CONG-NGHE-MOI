import React, { Component } from "react";
import { Button, Form, Input, Modal } from "antd";

import MockDB from "../repository/mock/mockDB";
const mockDB = new MockDB();

/**
 * [Required props: handleCancel, handleLoginSuccess, visible]
 */
export default class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            username: "",
            password: "",
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
                closable={false}
                footer={null}
                style={{ textAlign: "center" }}>
                <Form>
                    <Form.Item>
                        <Input type="text" name="username" placeholder="Tài khoản" value={this.state.username} onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Input type="password" name="password" placeholder="Mật khẩu" value={this.state.password} onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleLoginButton} style={{ width: "100%" }}>
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

    handleLoginButton() {
        let account = mockDB.getAccount(this.state.username, this.state.password);
        this.props.handleLoginSuccess(account);
    }
}

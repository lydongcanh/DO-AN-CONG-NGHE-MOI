import React, { Component } from "react";
import { Menu, Dropdown, Layout, Row, Col, Button, Icon } from "antd";
import LoginModal from "../components/login-modal";

const { Header } = Layout;

export default class MyHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginModalVisible: false
        };

        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleLoginModal = this.handleLoginModal.bind(this);
    }

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1">
                Thông tin giáo viên
            </Menu.Item>
            <Menu.Item key="2">
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    get loginPanel() {
        if (this.props.teacher) {
            return (
                <Dropdown.Button overlay={this.menu} icon={<Icon type="user" />}>
                    {this.props.teacher.name}
                </Dropdown.Button>            );
        } else {
            return (
                <Button onClick={this.handleLoginButton}>
                    Đăng nhập
                </Button>
            );
        }
    }

    render() {
        return (
            <Header>
                <Row justify="end">
                    <Col span={16} style={{color: "white"}}>
                        Phần mềm quản lý trường THPT
                    </Col>
                    <Col span={8} style={{textAlign: "end"}}>
                        {this.loginPanel}
                    </Col>
                </Row>
                <LoginModal handleOk={this.handleLoginModal} visible={this.state.loginModalVisible} />
            </Header>
        );
    }

    // Xử lý sự kiện nhấn nút đăng nhập
    handleLoginButton(e) {
        this.setState({
            loginModalVisible: true
        });

        console.log("state", this.state);
    }

    // Xử lý sự kiện nhấn nút đăng nhập trong login modal
    handleLoginModal() {
        this.setState({
            loginModalVisible: false
        });
    }

    // Xử lý sự kiện khi nhấn vào dropdown menu
    handleMenuClick(e) {
        if (e.key == 1) {
            // TODO: Hiện thông tin giáo viên
        } else if (e.key == 2) {
            // TODO: Đăng xuất
        } else {
            // Lỗi logic ??
        }
    }
}
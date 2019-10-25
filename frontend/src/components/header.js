import React, { Component } from "react";
import { Menu, Dropdown, Layout, Row, Col, Button, Icon, Affix } from "antd";
import { Link } from "react-router-dom";
import LoginModal from "../components/login-modal";

const { Header } = Layout;

export default class MyHeader extends Component {
    constructor(props) {
        super(props);

        this.handleLoginButton = this.handleLoginButton.bind(this);
        this.handleAccountMenuClick = this.handleAccountMenuClick.bind(this);
        this.handleLoginModalCancel = this.handleLoginModalCancel.bind(this);
        this.handleLoginModalSuccess = this.handleLoginModalSuccess.bind(this);

        this.state = {
            loginModalVisible: false, // Ẩn, hiện login modal
            account: null // Lưu thông tin tài khoản sau khi đăng nhập
        };
    }

    get accountMenu() {
        if (this.state.account.type == "teacher") {
            return (
                <Menu onClick={this.handleAccountMenuClick}>
                    <Menu.Item key="info">
                        <Link to={`/teacher/${this.state.account.username}`}>
                            Thông tin giáo viên
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        Đăng xuất
                    </Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu onClick={this.handleAccountMenuClick}>
                    <Menu.Item key="logout">
                        Đăng xuất
                    </Menu.Item>
                </Menu>
            );
        }
    };

    get loginPanel() {
        if (!this.state.account || !this.state.account.type) {
            return (
                <Button onClick={this.handleLoginButton}>
                    Đăng nhập
                </Button>
            );
        } else {
            return (
                <Dropdown.Button overlay={this.accountMenu} icon={<Icon type="user" />}>
                    {this.state.account.username}
                </Dropdown.Button>
            );
        }
    }

    get featuresPanel() {
        if (!this.state.account || !this.state.account.type) {
            return (
                <Col span={16}>
                    <Link to="/" style={{ color: "white"}}>
                        Phần mềm quản lý trường THPT
                    </Link>
                </Col>
            );
        }

        if (this.state.account.type == "teacher") {
            return (
                <Col span={16}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['home']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="home">
                            <Link to="/">
                                Trang chủ
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="schedules">
                            <Link to={`/teacherschedules/${this.state.account.username}`}>
                                Xem lịch dạy
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="scores">
                            <Link to={`/teacherscores/${this.state.account.username}`}>
                                Nhập điểm
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            );
        }

        if (this.state.account.type == "admin") {
            return (
                <Col span={16}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['home']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="home">
                            <Link to="/">
                                Trang chủ
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="teachers">
                            <Link to="/admin/teachers">
                                Quản lý giáo viên
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="students">
                            <Link to="/admin/students">
                                Quản lý học sinh
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="classes">
                            <Link to="/admin/classes">
                                Quản lý lớp học
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="schedules">
                            <Link to="/admin/schedules">
                                Quản lý thời khóa biểu
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>
            );
        }
    }

    /** Xử lý sự kiện khi nhấn vào dropdown menu */
    handleAccountMenuClick(e) {
        if (e.key == "info") {
            // TODO: Hiện thông tin giáo viên
        } else if (e.key == "logout") {
            this.setState({
                account: null
            }); 
        } else {
            alert(`Lỗi sự kiện menu dropdown: ${JSON.stringify(e)}`);
            // Lỗi logic ??
        }
    }

    /** Xử lý sự kiện nhấn nút đăng nhập */
    handleLoginButton() {
        this.setState({
            loginModalVisible: true
        });
    }

    /** 
     * Xử lý sự kiện nhấn nút đăng nhập trong login modal 
     * @param account Thông tin tài khoản trả về nếu đăng nhập thành công.
     */
    handleLoginModalCancel() {
        this.setState({
            loginModalVisible: false
        });
    }

    handleLoginModalSuccess(account) {
        this.setState({
            loginModalVisible: false
        });

        this.setState({
            account: account
        });
    }

    render() {
        return (
            <Affix offsetTop={0}>
                <Header>
                    <Row justify="space-between">
                        {this.featuresPanel}
                        <Col span={8} style={{ textAlign: "end" }}>
                            {this.loginPanel}
                        </Col>
                    </Row>
                    <LoginModal handleCancel={this.handleLoginModalCancel}
                        handleLoginSuccess={this.handleLoginModalSuccess}
                        visible={this.state.loginModalVisible} />
                </Header>
            </Affix>
        );
    }
}
import React , {Component} from "react";
import {Menu,Dropdown,Form, Row, Col, Button, Icon, Input, Radio, DatePicker} from "antd";
import MockDB from "../../repository/mock/mockDB";
const mockDB = new MockDB();

export default class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            classes: [],
            value : 1,
            gradeDropdownText: "Chọn khối",
            classDropdownText: "Chọn lớp",
            classDropdownActive: false,
        }
        this.onChange = this.onChange.bind(this);
        this.handleGradeMenuClick = this.handleGradeMenuClick.bind(this);
        this.handleClassMenuClick = this.handleClassMenuClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }
    get gradeMenu() {
        return (
            <Menu onClick={this.handleGradeMenuClick}>
                <Menu.Item key="10">
                    Khối 10
                </Menu.Item>
                <Menu.Item key="11">
                    Khối 11
                </Menu.Item>
                <Menu.Item key="12">
                    Khối 12
                </Menu.Item>
            </Menu>
        );
    }
    get classMenu() {
        let menus = [];
        for(let i = 0; i < this.state.classes.length; i++) {
            menus.push(
                <Menu.Item key={i}>
                    {this.state.classes[i].name}
                </Menu.Item>
            );
        }
        return (
            <Menu onClick={this.handleClassMenuClick}>
                {menus}
            </Menu>
        );
    }
    render(){
        return(
            <div>
                <Row gutter={48}>
                    <Col span={8}></Col>
                    <Col span={8} >
                    <Form>
                        <h2>Thêm học sinh</h2>
                        <Row gutter={24} style={{textAlign: "end"}}>
                                    <Form.Item>
                                        <Input placeholder="Tên"></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={2}>Nữ</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Địa chỉ"></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Số điện thoại"></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Dropdown overlay={this.gradeMenu}>
                                            <Button>
                                                {this.state.gradeDropdownText} <Icon type="down"/>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown overlay={this.classMenu} disabled={!this.state.classDropdownActive}>
                                            <Button>
                                                {this.state.classDropdownText} <Icon type="down"/>
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                    <Form.Item>
                                        <DatePicker placeholder="Chọn ngày sinh"></DatePicker>
                                    </Form.Item>
                            </Row>
                            <Button type="primary" onClick={this.handleSaveClick}>Lưu</Button>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
               
            </div>
        )
    }
    onChange(e){
        this.setState({
            value : e.target.value
        });
    }
    handleGradeMenuClick(e) {
        let result = mockDB.getClassWithGrade(Number(e.key));

        this.setState(_ => ({
            gradeDropdownText: e.item.props.children,
            classDropdownText: "Chọn lớp",
            classes: result,
            classDropdownActive: true
        }));
    }
    handleClassMenuClick(e) {
        this.setState(_ => ({
            classDropdownText: e.item.props.children
        }));
    }
    handleSaveClick(e){
        //luu du lieu
    }
}
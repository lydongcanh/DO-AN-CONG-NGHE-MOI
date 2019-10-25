import React , {Component} from "react";
import {Menu,Dropdown,Form, Row, Col, Button, Icon, Input, Radio, DatePicker} from "antd";
import mockDB from "../../repository/mock/mockDB";

export default class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            student: {},
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
    componentDidMount() {
        const { match: { params } } = this.props;
        const student = mockDB.getStudentWithId(params.id);
        this.setState({
            student: student
        })
    }
    getClass() {
        const classes = mockDB.getClassesWithStudentId(this.state.student.id);
        this.setState({
            classes: classes
        })
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
        //kiem tra gender set value for radiobutton
        if(this.state.student.gender === "Nam")
        { 
            this.state.value = 1 
        }else this.state.value = 2 
        //set value grade,classname for dropdown button
        console.log('a',this.state.classes.grade);
        return(
            <div>
                <Row gutter={48} style={{textAlign: "left"}}>
                    <Col span={8}></Col>
                    <Col span={8} >
                    <Form>
                        <h2>Sửa thông tin học sinh</h2>
                                    <Form.Item>
                                        <Input placeholder="Tên" value={this.state.student.name}></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>Nam</Radio>    
                                            <Radio value={2}>Nữ</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Địa chỉ" value={this.state.student.address}></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Số điện thoại" value={this.state.student.phoneNumber}></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Tình Trạng" value={this.state.student.state}></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Dropdown overlay={this.gradeMenu}>
                                            <Button>
                                                {this.state.classes.grade} <Icon type="down"/>
                                            </Button>
                                        </Dropdown>
                                        <Dropdown overlay={this.classMenu} disabled={!this.state.classDropdownActive}>
                                            <Button>
                                                {this.state.classes.name} <Icon type="down"/>
                                            </Button>
                                        </Dropdown>
                                    </Form.Item>
                                    <Form.Item>
                                        <DatePicker placeholder="Chọn ngày sinh" ></DatePicker>
                                    </Form.Item>
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
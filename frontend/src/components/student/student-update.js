import React , {Component} from "react";
import {Menu,Dropdown,Form, Row, Col, Button, Icon, Input, Radio, DatePicker} from "antd";
import mockDB from "../../repository/mock/mockDB";
import moment from "moment";

export default class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            classe :{},
            classes: [],
            value : 1,
            gradeDropdownText: '',
            classDropdownText: '',
            classDropdownActive: false,
        }
        this.onChange = this.onChange.bind(this);
        this.handleGradeMenuClick = this.handleGradeMenuClick.bind(this);
        this.handleClassMenuClick = this.handleClassMenuClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handlechangDate = this.handlechangDate.bind(this);
        this.getClass();
    }
    async getClass() {
        // const classe = await mockDB.getClassWithId(this.props.student.classId);
        // this.setState({
        //     classe: classe
        // })
        // console.log('gender',this.props.student.gender);
        // console.log('gen')
        // console.log("classs", this.state.classe)
        // this.setState({
        //     gradeDropdownText: "Khối " + this.state.classe.grade,
        //     classDropdownText: this.state.classe.name
        // })
        // console.log(this.state.classe)
        // if(this.props.student.gender === "Nam")
        // { 
        //     this.setState({
        //         value : 1 
        //     })
        // }else  this.setState({
        //     value : 2
        // })
       
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
       console.log('a',this.props.student);
        return(
                <div>
                    <h2>Sửa thông tin học sinh</h2>
                    <Form>
                        {/* <Form.Item>
                            <Input placeholder="Tên" value={this.props.student.name}></Input>
                                </Form.Item>
                                <Form.Item>
                                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                                        <Radio value={1}>Nam</Radio>    
                                        <Radio value={2}>Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item>
                                    <Input placeholder="Địa chỉ" value={this.props.student.address}></Input>
                                </Form.Item>
                                <Form.Item>
                                    <Input placeholder="Số điện thoại" value={this.props.student.phoneNumber}></Input>
                                </Form.Item>
                                <Form.Item>
                                    <Input placeholder="Tình Trạng" value={this.props.student.state}></Input>
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
                                    <DatePicker  value={moment(`"${this.props.student.birthday}"`, 'DD-MM-YYYY')} onChange={this.handlechangDate}></DatePicker>
                                </Form.Item>
                                 <Button type="primary" onClick={this.handleSaveClick}>Lưu</Button> */}
                                  <Form.Item>
                                <Input placeholder="Tên"></Input>
                            </Form.Item>
                            <Form.Item >
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
                        <Button type="primary" onClick={this.handleSaveClick}>Lưu</Button>
                    </Form>
            </div>
        )
    }
    handlechangDate(e){
       
        console.log(`date`,this.state.date);
    }
    onChange(e){
        this.setState({
            value : e.target.value
        });
        console.log(`asfasf`,e.target.value);
    }
    handleGradeMenuClick(e) {
        let result = mockDB.getClassWithGrade(Number(e.key));
        console.log('a',e);
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
        this.props.handleSaveSucces();
    }
}
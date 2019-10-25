import React , {Component} from "react";
import {Menu,Dropdown,Form, Row, Col, Button, Icon, Input, Radio, DatePicker,Modal} from "antd";
import mockDB from "../../repository/mock/mockDB";
import moment from "moment";

export default class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            student: {},
            classe : {},
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
    }
   
    // async componentDidMount() {
    //     const { match: { params } } = this.props;
    //     const student = await mockDB.getStudentWithId(params.id);
    //     this.setState({
    //         student: student 
    //     })
    //     console.log("student",this.state.student );
    //     if(this.state.student.gender === "Nam")
    //     { 
    //         this.state.value = 1 
    //     }else this.state.value = 2 
    //     await this.getClass();
    //     this.setState({
    //         gradeDropdownText: "Khối " + this.state.classe.grade,
    //         classDropdownText: this.state.classe.name
    //     })
    // }
    async getClass() {
        const classe = await mockDB.getClassWithId(this.state.student.classId);
        this.setState({
            classe: classe,
        })
        console.log("classs", this.state.classe)
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
       console.log('a',this.props.name);
        return(
            <Modal
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                header={null}
                footer={null}
                width="40%">
                <div>
                    <h2>Sửa thông tin học sinh</h2>
                    <Form>
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
                                            {this.state.gradeDropdownText} <Icon type="down"/>                                            </Button>
                                   </Dropdown>
                                    <Dropdown overlay={this.classMenu} disabled={!this.state.classDropdownActive}>
                                        <Button>
                                            {this.state.classDropdownText} <Icon type="down"/>
                                        </Button>
                                    </Dropdown>
                                </Form.Item>
                                <Form.Item>
                                    <DatePicker  defaultValue={moment(`"${this.state.student.birthday}"`, 'DD-MM-YYYY')}></DatePicker>
                                </Form.Item>
                                 <Button type="primary" onClick={this.handleSaveClick}>Lưu</Button>
                    </Form>
                </div>
            </Modal>
        )
    }
    
    onChange(e){
        this.setState({
            value : e.target.value
        });
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
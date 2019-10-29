import React , {Component} from "react";
import {Menu,Dropdown,Form,message, Button, Icon, Input, Radio, DatePicker, Modal} from "antd";
import StudyClassResponsitory from "../../repository/prop/studyclass-repository"
import StudentRespository from "../../repository/prop/student-repository"

//[Required props : visible ,handleCancle, handleSaveSuccess]
class CreateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            classes: [],
            value : "Nam",
            valueDatepicker:'',
            gradeDropdownText: "Chọn khối",
            classDropdownText: "Chọn lớp",
            classDropdownActive: false,
        }
        this.onChange = this.onChange.bind(this);
        this.handleGradeMenuClick = this.handleGradeMenuClick.bind(this);
        this.handleClassMenuClick = this.handleClassMenuClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    RadioSelect(){
        return(
            <Radio.Group onChange={this.handleChange} value={this.state.value} name="gender">
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
        )
    }
    DropdownSelect(){
        return(
            <div>
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
            </div>
        )
    }
    get gradeMenu() {   
        return (
            <Menu onClick={ this.handleGradeMenuClick}>
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
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal
                closable={false}
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                header={null}
                footer={null}
                width="35%">
                <div>
                    <Form style={{textAlign:"left" }} onSubmit={this.handleSubmit} >
                        <h2>Thêm học sinh</h2>
                            <Form.Item>
                            {getFieldDecorator('name', {
                                    rules: [
                                        { required: true, message: 'Vui lòng nhập tên' },
                                        {
                                            pattern : new RegExp(/^[A-Za-z]+([\ A-Za-z]+)*/),
                                            message : "Tên không hợp lệ"
                                        },
                                        { max : 30 , message :' Vượt quá ký tự cho phép'}
                                    ],
                                })(<Input placeholder="Tên" name="name" onChange={this.onChange}></Input>)}
                            </Form.Item>
                            <Form.Item >
                                {this.RadioSelect()}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('birthday', {
                                    rules: [
                                        { required: true, message: 'Vui lòng chọn ngày sinh' }
                                    ],
                                })(
                                    <DatePicker allowClear={false} placeholder="Chọn ngày sinh" name="birthday" onChange={ (date,dateString) => this.onChangeDatePicker(date,dateString)} format="DD/MM/YYYY"></DatePicker>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('address', {
                                    rules: [
                                        { required: true, message: 'Vui lòng nhập địa chỉ' },
                                        { max : 40 , message :' Vượt quá ký tự cho phép'}
                                    ],
                                })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange}></Input>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phone', {
                                    rules: [
                                        { required: true, message: 'Số điện thoại không hợp lệ' },
                                        { 
                                            pattern : new RegExp(/^0+\d{9}$/g),
                                            message : "Sai định dạng số điện thoại"
                                        }
                                    ],
                                })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                            </Form.Item>
                            <Form.Item>
                                    {this.DropdownSelect(getFieldDecorator)}
                            </Form.Item>
                            <div style={{textAlign:"right"}}>
                                <Button onClick={this.props.handleCancel} style={{marginRight:"10px"}}>Huỷ</Button>
                                <Button type="primary" htmlType="submit" onClick={this.handleSaveClick}>Lưu</Button>
                            </div>
                    </Form>
                </div>
            </Modal>
        )
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    //set gia tri khi thay doi radio group
    handleChange(e){
        this.setState({
            value : e.target.value,
            [e.target.name] : e.target.value
        })
    }
    //lay gia tri khi cac field thay doi
    onChange(e){
        if(e.target !== undefined) this.setState({
                 [e.target.name]: e.target.value
             })
         console.log('a',e.target.value)
     }
     //lay gia tri cua datepicker khi thay doi
     onChangeDatePicker(date,dateString){
        this.setState({
            valueDatepicker : dateString
        })
    }
    async handleGradeMenuClick(e) {
        let result = await StudyClassResponsitory.getStudyclassByGrade(e.key);
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
    async handleSaveClick(){
        
        // await StudentRespository.createStudent(
        //     this.state.name,
        //     this.state.value,
        //     this.state.valueDatepicker,
        //     this.state.address,
        //     this.state.phoneNumber,
        //     "Đang học"
        // )
        this.props.handleSaveSuccess();
        //Neu them thanh cong 
        message.success('Thêm học sinh thành công !')

        console.log('studnet',
            this.state.name,
            this.state.value,
            this.state.valueDatepicker,
            this.state.address,
            this.state.phoneNumber,
            "Đang học"
        )
    }
}
export default Form.create()(CreateStudent);
import React , {Component} from "react";
import {Form, Button,message, Input, Radio, DatePicker, Modal} from "antd";
import TeacherResponsitory from "../../repository/prop/teacher-repository";
import SubjectSelect from "../../components/subject-select";
import subjects from "../../types/subjects";
import moment from "moment"

//[Required props : handleCancel, handleSaveSucces, handleSubjectSelectChange]
class UpdateTeacher extends Component{
    constructor(props){
        super(props);
        this.state={
            subject : subjects[0],
            visible: false,
            value : this.props.teacher.gender,
            teacher:{},
            valueDatepicker:'',
        }
        this.onChange = this.onChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
        this.handleChangeRadioGroup = this.handleChangeRadioGroup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentWillReceiveProps(props) {
        /*set value cho gender radio button*/
        if(this.props.teacher.gender === "Nam")
        { 
            this.setState({
                value : "Nam"
            })
        }else this.setState({
                value : "Nữ"
        })
        console.log('gender teacher',this.state.value);
    }
    RadioSelect(){
        return(
            <Radio.Group onChange={this.handleChangeRadioGroup} value={this.state.value}>
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
        )
    }
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Modal
                closable={false}
                visible = {this.props.visible}
                width="35%"
                footer={null}
                header={null}
                onCancel={this.props.handleCancel}>
                    <Form style={{textAlign:"left" }} onSubmit={this.handleSubmit} >
                        <h2>Sửa thông tin giáo viên</h2>
                            <Form.Item>
                                {getFieldDecorator('name', {
                                    initialValue: this.props.teacher.name,
                                    rules: [
                                        { required: true, message: 'Vui lòng nhập tên' },
                                        {
                                            pattern : new RegExp(/^[A-Za-z]+([\ A-Za-z]+)*/),
                                            message : "Tên không hợp lệ"
                                        }
                                    ],
                                })(<Input placeholder="Tên" name="name" onChange={this.onChange}></Input>)}
                            </Form.Item>
                            <Form.Item >
                                {this.RadioSelect()}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('birthday', {
                                    initialValue: moment(`"${this.props.teacher.birthday}"`),
                                    rules: [
                                        { required: true, message: 'Vui lòng chọn ngày' }
                                    ],
                                })(<DatePicker placeholder="Chọn ngày sinh" name="birthday" onChange={ (defaultValue,dateString) => this.onChangeDatePicker(defaultValue,dateString)} format="DD/MM/YYYY"></DatePicker>)}
                            </Form.Item>
                            {/* <Form.Item>
                                {getFieldDecorator('birthday', {
                                    initialValue: this.props.teacher.subject,
                                    rules: [
                                        { required: true, message: 'Vui lòng chọn ngày' }
                                    ],
                                })(<SubjectSelect onChange={this.handleSubjectSelectChange}></SubjectSelect>)}
                            </Form.Item> */}
                            <Form.Item>
                                {getFieldDecorator('address', {
                                    initialValue: this.props.teacher.address,
                                    rules: [
                                        {required: true, message: 'Vui lòng nhập địa chỉ'}
                                    ],
                                })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('mail', {
                                    initialValue: this.props.teacher.email,
                                    rules: [
                                        { required: true, message: 'Vui lòng nhập email' },
                                        {
                                            pattern : new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
                                            message : "email không hợp lệ"
                                        }
                                    ],
                                })(<Input placeholder="Email" name="email" onChange={this.onChange}></Input>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phone', {
                                    initialValue: this.props.teacher.phoneNumber,
                                    rules: [
                                        { required: true, message: 'Số điện thoại không hợp lệ' },
                                        { 
                                            pattern : new RegExp(/^0+\d{9}$/g),
                                            message : "Sai định dạng số điện thoại"
                                        }
                                    ],
                                })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                            </Form.Item>
                            <div style={{textAlign:"right"}}>
                                <Button onClick={this.props.handleCancel} style={{marginRight:"10px"}}>Huỷ</Button>
                                <Button type="primary" htmlType="submit" onClick={this.handleSaveClick}>Lưu</Button>
                            </div>
                    </Form>
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
    handleChangeRadioGroup(e){
        this.setState({
            value : e.target.value
        });
    }
    handleSubjectSelectChange(subject) {
        this.setState({
            subject: subject
        });
    }
    onChange(e){
       if(e.target !== undefined) this.setState({
                [e.target.name]: e.target.value
            })
        console.log('a',e.target.value)
    }
    onChangeDatePicker(defaultValue,dateString){
        this.setState({
            defaultValue : dateString
        })
    }
    async handleSaveClick(){
        
        message.success('Sửa thông tin giáo viên thành công !')

        this.props.handleSaveSuccess();
        console.log(`teacher`,this.state.name,
        this.state.gender,
        this.state.valueDatepicker,
        this.state.address,
        this.state.email,
        this.state.phoneNumber);
    }
}
export default Form.create()(UpdateTeacher);
import React , {Component} from "react";
import {Form, Button, Input, Radio, DatePicker, Modal} from "antd";
import TeacherResponsitory from "../../repository/prop/teacher-repository"

export default class CreateTeacher extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            teacher:{},
            valueDatepicker:'',
        }
        this.onChange = this.onChange.bind(this);
        this.handleSaveSuccess = this.handleSaveSuccess.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
    }
    render(){
        return(
            <Modal
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                header={null}
                footer={null}
                width="40%">
                <div>
                    <Form style={{textAlign:"left" }} >
                        <h2>Thêm giáo viên</h2>
                            <Form.Item>
                                <Input placeholder="Tên" name="name" onChange={this.onChange}></Input>
                            </Form.Item>
                            <Form.Item >
                                <Radio.Group onChange={this.onChange} name="gender" >
                                    <Radio value={1}>Nam</Radio>
                                    <Radio value={2}>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <DatePicker placeholder="Chọn ngày sinh" name="birthday" onChange={ (date,dateString) => this.onChangeDatePicker(date,dateString)} format="DD/MM/YYYY"></DatePicker>
                            </Form.Item>
                            <Form.Item>
                            <Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>
                            </Form.Item>
                            <Form.Item>
                                <Input placeholder="Số điện thoại" name="email" onChange={this.onChange}></Input>
                            </Form.Item>
                            <Form.Item>
                                <Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>
                            </Form.Item>
                        <Button type="primary" htmlType="submit" onClick={this.handleSaveSuccess}>Lưu</Button>
                    </Form>
                </div>
            </Modal>
        )
    }
    onChange(e){
       if(e.target !== undefined) this.setState({
                [e.target.name]: e.target.value
            })
        console.log('a',e.target.value)
    }
    onChangeDatePicker(date,dateString){
        this.setState({
            valueDatepicker : dateString
        })
    }
    async handleSaveSuccess(){
        if(this.state.gender === 1){
            this.state.gender = "Nam"
        } else this.state.gender ="Nữ"
        await TeacherResponsitory.createTeacher(
            this.state.name,
            this.state.gender,
            this.state.valueDatepicker,
            this.state.address,
            this.state.email,
            this.state.phoneNumber,
            "Đang dạy"
        )
        this.props.handleSaveSuccess();
        console.log(`teacher`,this.state.name,
        this.state.gender,
        this.state.valueDatepicker,
        this.state.address,
        this.state.email,
        this.state.phoneNumber);
    }
}
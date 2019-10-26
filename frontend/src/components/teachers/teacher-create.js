import React , {Component} from "react";
import {Menu,Dropdown,Form, Button, Icon, Input, Radio, DatePicker, Modal} from "antd";
import mockDB from "../../repository/mock/mockDB";

export default class CreateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            teacher:{},
            value : 1
        }
        this.onChange = this.onChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
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
                                <DatePicker placeholder="Chọn ngày sinh"></DatePicker>
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
    handleSaveClick(e){
        //luu du lieu
        let teacher = this.state.teacher;
        this.props.handleSaveSuccess(teacher);
    }
}
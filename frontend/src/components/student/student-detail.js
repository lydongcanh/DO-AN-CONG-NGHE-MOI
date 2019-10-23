import React, {Component} from 'react';
import {Form,Button} from 'antd';

export default class UserDetails extends Component{
  constructor(props){
    super(props);
    this.state={
        
    }
  }
  
  render(){
    return(
        <div>
            <Form>
              <p> Tên: {this.props.id}</p>
              <p> Tên: {this.props.name}</p>
              <p> Giới tính: {this.props.gender}</p>
              <p> Ngày sinh: {this.props.birthday}</p>
              <p> Địa chỉ: {this.props.address}</p>
              <p> Số điện thoại: {this.props.phoneNumber}</p>
            </Form>
        </div>
    )
  }
 
}
 
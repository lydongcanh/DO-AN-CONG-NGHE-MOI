import React, {Component} from 'react';
import {Card,Button} from 'antd';

export default class UserDetails extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return(
        <div>
          <Card  title="Thông tin cá nhân"  style={{ width: 400 }}>
              <p> Tên: {this.props.teacher.name}</p>
              <p> Giới tính: {this.props.teacher.gender}</p>
              <p> Ngày sinh: {this.props.teacher.birthday}</p>
              <p> Địa chỉ: {this.props.teacher.address}</p>
              <p> Ngày sinh: {this.props.teacher.email}</p>
              <p> Số điện thoại: {this.props.teacher.phoneNumber}</p>
              <p> Ngày sinh: {this.props.teacher.state}</p>
          </Card>
        </div>
    )
  }
 
}
 
import React, {Component} from 'react';
import {Card,Button,Modal} from 'antd';
import StudyClassResponsitory from "../../repository/prop/studyclass-repository"

export default class UserDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      classe : {},
      visible : false,
      classname : '',
    }
  }
  async componentDidMount() {
    this.setState({
        // classe : await StudyClassResponsitory.getStudyclassById(this.props.student.classId)
        // lay tam du lieu
        classe :  await StudyClassResponsitory.getStudyclassById("9719fdf0-f9e9-11e9-9045-bb086f5199dc")
    })
    /*set value cho gender radio button*/
    this.setState({
       classname : this.state.classe.name
    })
    console.log('a',this.state.classname);
}
  render(){
    return(
      <Modal
        closable={false}
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleOk}
        header={null}
        width="30%">
          <Card  title="Thông tin cá nhân"  style={{ width:"100%"}}>
              <p> Tên: {this.props.student.name}</p>
              <p> Lớp : {this.state.classname}</p>
              <p> Giới tính: {this.props.student.gender}</p>
              <p> Ngày sinh: {this.props.student.birthday}</p>
              <p> Địa chỉ: {this.props.student.address}</p>
              <p> Số điện thoại: {this.props.student.phoneNumber}</p>
              <p> Tình trạng : {this.props.student.state}</p>
          </Card>
      </Modal>
    )
  }
 
}
 
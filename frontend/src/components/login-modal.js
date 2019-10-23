import React, { Component } from "react";
import { Button, Form, Input, Modal } from "antd";

export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state={
        username : "",
        password : "",
    }
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  render() {
    return (
      <Modal visible={this.props.visible} onCancel={this.props.handleOk} title="Đăng nhập" footer={[null]} style={{textAlign:"center"}}>
        <Form className="login-form" >
          <Form.Item><Input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} /></Form.Item>
          <Form.Item><Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" onClick={this.handleLoginButton} className="login-form-button">Đăng nhập</Button></Form.Item>
        </Form>
      </Modal>
    );
  }
  handleChange(e) {
    //gan gia tri khi nhap
    this.setState({[e.target.name]: e.target.value});
 }
  handleLoginButton(e) {
    // log username, password
    alert(`username : ${this.state.username} password : ${this.state.password}`);
    // Ẩn modal
    this.props.handleOk(e);
  }
  
}
// viet ben trang goi modal
//   constructor(props){
//     super(props);
//     this.state={
//       visible : false
//     }
//   }
//   render() { 
    
//     return (
//       <BrowserRouter>
//         <Button type="primary"  onClick={this.handleOk}>
//           Đăng nhập
//         </Button>
//         <LoginModal handleOk={this.handleCancel} visible={this.state.visible}>
          
//         </LoginModal>
//       </BrowserRouter>
//     );
//   }
//   handleOk = () => {
//     this.setState({
//       visible: true
//     });
//   }
//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };
// }

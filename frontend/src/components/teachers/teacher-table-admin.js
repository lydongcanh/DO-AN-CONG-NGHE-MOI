import React, { Component } from "react";
import { Divider, Table, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import UpdateTeacher from "../../components/teachers/teacher-update"
import TeacherResponsitory from "../../repository/prop/teacher-repository"

export default class StudentTableAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            teacher : {},
            class : {},
            visible : false
        }
        this.handleDelteClick = this.handleDelteClick.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.handleSaveStudentSuccess = this.handleSaveStudentSuccess.bind(this);
    }
    get columns(){
        return [
            {
                title: "Id",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Tên",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Giới tính",
                dataIndex: "gender",
                key: "gender",
            },
            {
                title: "Ngày sinh",
                dataIndex: "birthday",
                key: "birthday",
            },
            {
                title: "Địa chỉ",
                key: "address",
                dataIndex: "address",
            },
            {
                title: "Email",
                key: "email",
                dataIndex: "email",
            },
            {
                title: "Số điện thoại",
                key: "phoneNumber",
                dataIndex: "phoneNumber",
            },
            {
                title: "Tình trạng",
                key: "state",
                dataIndex: "state",
            },
            
            {
                title: 'Chức năng',
                key: 'action',
                render: (value) => {
                    return(
                        <div>
                        <Button onClick={ async () => this.handleUpdateButton(value)}>
                                Sửa
                        </Button>
                        <Divider type="vertical" />
                        <Button onClick={this.handleDelteClick}>
                                Xoá
                        </Button>
                        </div>
                    )
                }
            }
        ];
    }
    
    render() {
        return (
            <div>
                <h2 style={{textAlign: "start"}}>Danh sách giáo viên</h2>
                
                <div>
                    <Table title={() => <h2 style={{textAlign: "start"}}>Danh sách giáo viên</h2>}
                       pagination={{pageSize: 9}} 
                       bordered
                       columns={this.columns} 
                       rowKey={record => record.id} 
                       dataSource={this.dataSource} />
                 </div>
                {/* <UpdateStudentModal
                    student={this.state.student}
                    classe = {this.state.classe}
                    visible={this.state.visible}
                    handleCancel={this.handleCancelModal}
                    handleSaveSuccess={this.handleSaveStudentSuccess}>        
                </UpdateStudentModal> */}
                <Modal
                    visible = {this.state.visible}
                    width="40%"
                    footer={null}
                    header={null}
                    onCancel={this.handleCancelModal}>
                        <UpdateTeacher student={this.state.student} ></UpdateTeacher>
                </Modal>
            </div>
        );
    }
    get dataSource() {
        const teachers = this.props.teachers;
        if (!teachers || teachers.length < 1) 
            return [];

        const result = [];
        for(let i = 0; i < teachers.length; i++) {
            let item = new Object(teachers[i]);
            item.count = i + 1;
            result.push(item);
        }
        return result;
    }

    async handleUpdateButton(e){
        const teacher = await TeacherResponsitory.getTeacherById(e.id);
        this.setState({
            teacher : teacher,
            visible : true
        });
        console.log('studenet',this.state.teacher);
    }
    handleCancelModal(){
        this.setState({
            visible : false
        });
    }
    handleSaveStudentSuccess(){
        this.setState({
            visible : false
        });
    }
    handleDelteClick(e){
        // Xoa hoc sinh
    }
}
import React, { Component } from "react";
import { Divider, Table, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import UpdateTeacher from "../../components/teachers/teacher-update"
import mockDB from "../../repository/mock/mockDB";

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
                        <Button onClick={() => this.handleUpdateButton(value)}>
                                Sửa
                        </Button>
                        <Divider type="vertical" />
                        <Button onClick={this.handleDelteClick}>
                            <Link>
                                 Xoá
                            </Link>
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
                <Table pagination={{pageSize: 9}} columns={this.columns} rowKey={record => record.id} dataSource={this.props.teacher} />
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
                        <UpdateTeacher student={this.state.student}></UpdateTeacher>
                </Modal>
            </div>
        );
    }
    handleUpdateButton(e){
        const teacher = mockDB.getTeacherWithId(e.id); 
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
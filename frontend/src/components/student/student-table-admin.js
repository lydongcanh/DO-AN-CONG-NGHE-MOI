import React, { Component } from "react";
import { Divider, Table, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import UpdateStudent from "../../components/student/student-update"
import mockDB from "../../repository/mock/mockDB";

export default class StudentTableAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            student : {},
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
                title: "Số điện thoại",
                key: "phoneNumber",
                dataIndex: "phoneNumber",
            },
            {
                title: "Lớp",
                key: "classId",
                dataIndex: "classId",
            },
            {
                title: 'Chức năng',
                key: 'action',
                render: (value) => {
                    return(
                        <div>
                        <Button onClick={() => this.handleUpdateButton(value)}>
                                Sửa thông tin
                        </Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this.handleEditScoreButton(value)}>
                                Sửa điểm
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
                <h2 style={{textAlign: "start"}}>Danh sách học sinh</h2>
                <Table pagination={{pageSize: 9}} columns={this.columns} rowKey={record => record.id} dataSource={this.props.students} />
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
                        <UpdateStudent student={this.state.student}></UpdateStudent>
                </Modal>
            </div>
        );
    }
    handleUpdateButton(e){
        const student = mockDB.getStudentWithId(e.id); 
        this.setState({
            student : student,
            visible : true
        });
        console.log('studenet',this.state.student);
        // const classe = mockDB.getClassWithId(this.state.student.classId);
        // this.setState({
        //     classe : classe
        // })
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
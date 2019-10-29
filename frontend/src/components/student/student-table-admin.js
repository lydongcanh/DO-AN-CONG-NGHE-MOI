import React, { Component } from "react";
import { Divider, Table, Button, Modal } from "antd";
import UpdateStudent from "../../components/student/student-update";
import StudentResponsitory from "../../repository/prop/student-repository";

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
                        <Button onClick={ async () => this.handleUpdateButton(value)}>
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
                
                <UpdateStudent 
                    student={this.state.student}
                    handleCancel={this.handleCancelModal}
                    visible={this.state.visible}
                    handleSaveSuccess={this.handleSaveStudentSuccess}> 
                </UpdateStudent>
            </div>
        );
    }
    async handleUpdateButton(e){
        const student = await StudentResponsitory.getStudentById(e.id);
        this.setState({
            student : student,
            visible : true
        });
        console.log('studenttttt',this.state.student);
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
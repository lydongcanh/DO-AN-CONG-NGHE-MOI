import React, { Component } from "react";
import { Divider, Table, Button } from "antd";
import { Link } from "react-router-dom";
import UpdateStudentModal from "../../components/student/student-update"
import mockDB from "../../repository/mock/mockDB";

export default class StudentTableAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false
        }
        this.handleDelteClick = this.handleDelteClick.bind(this);
        this.handleUpdateButton = this.handleUpdateButton.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.handleSaveStudentSuccess = this.handleSaveStudentSuccess.bind(this);
    }
    columns = [
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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button onClick={this.handleUpdateButton}>
                            Sửa thông tin
                    </Button>
                    <Divider type="vertical" />
                    <Button>
                        <Link to={`/admin/studentscoreupdate/${record.id}`}>
                            Sửa điểm
                        </Link>
                    </Button>
                    <Divider type="vertical" />
                    <Button onClick={this.handleDelteClick}>
                        <Link>
                             Xoá
                        </Link>
                    </Button>
                </span>
            ),
        },
    ];
    render() {
        return (
            <div>
                <h2 style={{textAlign: "start"}}>Danh sách học sinh</h2>
                <Table pagination={{pageSize: 9}} columns={this.columns} rowKey={record => record.id} dataSource={this.props.students} />
                <UpdateStudentModal 
                    visible={this.state.visible}
                    handleCancel={this.handleCancelModal}
                    handleSaveSuccess={this.handleSaveStudentSuccess}>        
                </UpdateStudentModal>
            </div>
        );
    }
    handleUpdateButton(){
        this.setState({
            visible : true
        });
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
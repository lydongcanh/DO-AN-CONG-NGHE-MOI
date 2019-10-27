import React, { Component } from "react";
import { Table, Input, Button, Row, Col } from "antd";
import CreateClassModal from "../../components/classes/create-class-modal";
import ClassRepo from "../../repository/prop/studyclass-repository";

const { Search } = Input;

export default class AdminClassesPage extends Component {
    columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Khối",
            dataIndex: "grade",
            key: "grade"
        },
        {
            title: "Năm bắt đầu",
            dataIndex: "startYear",
            key: "startYaer"
        },
        {
            title: "Năm kết thúc",
            dataIndex: "endYear",
            key: "endYear"
        },
        {
            title: "Trạng thái",
            dataIndex: "state",
            key: "state"
        },
        {
            title: "Chức năng",
            key: "action",
            render: () => {
                return (
                    <span>
                        <Button onClick={this.handleEditClassButton}>
                            Sửa
                        </Button>
                        <Button onClick={this.handleDeleteClassButton}>
                            Xóa
                        </Button>
                    </span>
                );
            }
        }
    ];

    title = () => {
        return (
            <Row justify="end">
                <Col span={3}>
                    <h3>Danh sách lớp học</h3>
                </Col>
                <Col span={3} offset={18}>
                    <Button onClick={this.handleCreateClassButton}>
                        Thêm
                    </Button>
                </Col>
            </Row>
        );
    }

    constructor(props) {
        super(props);

        this.handleCreateClassButton = this.handleCreateClassButton.bind(this);
        this.handleEditClassButton = this.handleEditClassButton.bind(this);
        this.handleDeleteClassButton = this.handleDeleteClassButton.bind(this);
        this.handleCreateModalCancel = this.handleCreateModalCancel.bind(this);
        this.handleCreateModalOk = this.handleCreateModalOk.bind(this);

        this.state = {
            searchedClasses: [],
            createClassModelVisible: false
        }
    }

    handleCreateClassButton() {
        this.setState({
            createClassModelVisible: true
        });
    }

    handleEditClassButton(e) {
        console.log("edit", e);
    }

    handleDeleteClassButton(e) {
        console.log("delete", e);
    }

    async handleCreateModalOk(e) {
        console.log("creating...", e);
        const studentIds = e.students.map(student => student.id);
        let result = await ClassRepo.createStudyclass(e.name, e.grade, e.startYear, e.endYear, "active", studentIds);      
        console.log("created...", result);
    }

    handleCreateModalCancel() {
        this.setState({
            createClassModelVisible: false
        });
    }

    render() {
        return ( 
            <div>
                <Search/>
                <br/><br/>
                <Table 
                    title={this.title}
                    dataSource={this.state.searchedClasses}
                />
                <CreateClassModal 
                    onOk={this.handleCreateModalOk}
                    onCancel={this.handleCreateModalCancel}
                    visible={this.state.createClassModelVisible}
                />
            </div>
        );
    }
}
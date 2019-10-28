import React, { Component } from "react";
import { Table, Input, Button, Row, Col } from "antd";
import CreateClassModal from "../../components/classes/create-class-modal";
import ClassRepo from "../../repository/prop/studyclass-repository";

const { Search } = Input;

export default class AdminClassesPage extends Component {
    columns = [
        {
            title: "TT",
            dataIndex: "count",
            key: "count"
        },
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
            title: "Chức năng",
            key: "action",
            render: (record) => {
                return (
                    <Row type="flex" justify="space-between">
                        <Col span={6}>
                            <Button
                                style={{ width: "90%" }}
                                type="primary"
                                onClick={async () => this.handleEditClassButton(record)}
                            >
                                Sửa
                            </Button>
                        </Col>
                        
                        <Col span={6}>
                            <Button 
                                style={{ width: "90%" }}
                                type="primary"
                                onClick={async () => this.handleDeleteClassButton(record)}
                            >
                                Xóa
                            </Button>
                        </Col>
                                 
                        <Col span={6}>
                            <Button 
                                style={{ width: "90%" }}
                                type="primary"
                                onClick={async () => this.handleStudentsButton(record)}
                            >
                                Danh sách học sinh
                            </Button>
                        </Col>

                        <Col span={6}>
                            <Button 
                                style={{ width: "90%" }}
                                type="primary"
                                onClick={async () => this.handleSchedulesButton(record)}
                            >
                                Thời khóa biểu
                            </Button>
                        </Col>

                    </Row>
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
        this.handleStudentsButton = this.handleStudentsButton.bind(this);
        this.handleSchedulesButton = this.handleSchedulesButton.bind(this);

        this.state = {
            searchedClasses: [],
            createClassModelVisible: false
        }
    }

    async componentDidMount() {
        await this.loadAllStudyclasses();
    }

    async loadAllStudyclasses() {
        const allClasses = await ClassRepo.getAllStudyclasses();

        if (!allClasses)
            return;

        for(let i = 0; i < allClasses.length; i++)
            allClasses[i].count = i + 1;

        this.setState({
            searchedClasses: allClasses
        });
    }

    /** Nút danh sách học sinh. */
    handleStudentsButton(e) {
        console.log("Danh sách học sinh", e);
    }

    /** Nút thời khóa biểu */
    handleSchedulesButton(e) {
        console.log("Thời khóa biểu", e);
    }

    handleCreateClassButton() {
        this.setState({
            createClassModelVisible: true
        });
    }

    handleEditClassButton(e) {
        console.log("Sửa lớp", e);
    }

    async handleDeleteClassButton(e) {
        // TODO: Hiện thông báo...
        const result = await ClassRepo.deleteStudyclass(e.id);
        
        await this.loadAllStudyclasses();
    }

    async handleCreateModalOk(e) {
        // TODO: Hiện thông báo...
        let result = await ClassRepo.createStudyclass(e.name, e.grade);  

        this.setState({
            createClassModelVisible: false
        });

        await this.loadAllStudyclasses();
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
                    pagination={{hideOnSinglePage: true}}
                    columns={this.columns}
                    bordered
                    title={this.title}
                    rowKey={record => record.id}
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
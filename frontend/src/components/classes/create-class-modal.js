import React, { Component } from "react";
import { Modal, Form, InputNumber, Input, Table, Row, Col, Button } from "antd";
import GradeSelect from "../../components/grade-select";
import StudentRepo from "../../repository/prop/student-repository";
import grades from "../../types/grades";

/** Required props: onOk, onCancel, visible */
class CreateClassModal extends Component {

    constructor(props) {
        super(props);

        this.handleGradeSelectChange = this.handleGradeSelectChange.bind(this);
        this.handleStartYearChange = this.handleStartYearChange.bind(this);
        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleAddStudentToClassButton = this.handleAddStudentToClassButton.bind(this);
        this.handleRemoveStudentToClassButton = this.handleRemoveStudentToClassButton.bind(this);

        this.state = {
            grade: grades[0],
            name: undefined,
            startYear: new Date().getFullYear(),
            endYear: new Date().getFullYear() + 3,
            students: [],
            searchedStudents: []
        }
    }

    async componentDidMount() {
        this.setState({
            searchedStudents: await StudentRepo.getAllStudents()
        });
    }

    getStudentTableColumn(buttonTitle, onClickHandler) {
        return [
            {
                title: "Tên",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Chức năng",
                key: "action",
                render: (record) => {
                    return (
                        <Button onClick={() => onClickHandler(record)}>
                            {buttonTitle}
                        </Button>
                    );
                }
            }
        ];
    }

    /** Sự kiện chọn khối */
    handleGradeSelectChange(grade) {
        this.setState({
            grade: grade
        });

        this.setState({
            searchedStudents: StudentRepo.getStudent
        })
    }

    /** Sự kiện nhập năm */
    handleStartYearChange(year) {
        this.setState({
            startYear: year,
            endYear: year + 3
        });
    }

    /** Sử kiện nhập tên */
    handleNameInputChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    /** Sự kiện nút thêm học sinh vào lớp */
    handleAddStudentToClassButton(record) {
        const temp = this.state.students;
        temp.push(record);

        this.setState(state => ({
            searchedStudents: state.searchedStudents.filter(student => student.id != record.id),
            students: temp
        }));
    }

    /** Sự kiện nút xóa học sinh khỏi lớp */
    handleRemoveStudentToClassButton(record) {
        const temp = this.state.searchedStudents;
        temp.push(record);
        this.setState(state => ({
            searchedStudents: temp,
            students: state.students.filter(student => student.id != record.id)
        }));
    }

    /** Chọn khối */
    gradeSelect(getFieldDecorator) {
        return getFieldDecorator("gradeSelect", {
        })(<GradeSelect onChange={this.handleGradeSelectChange} />);
    }

    /** Năm bắt đầu - Kết thúc */
    yearsInput(getFieldDecorator) {
        return (
            <div>
                <InputNumber
                    onChange={this.handleStartYearChange}
                    value={this.state.startYear}
                />
                ~
                <InputNumber
                    disabled={true}
                    defaultValue={new Date().getFullYear() + 3}
                    value={this.state.endYear}
                />
            </div>
        );
    }

    /** Nhập tên */
    nameInput(getFieldDecorator) {
        return (
            <Input
                onChange={this.handleNameInputChange}
                placeholder="Nhập tên lớp"
            />
        );
    }

    /** Nhập danh sách học sinh */
    studentsInput(getFieldDecorator) {
        return (
            <Row type="flex" justify="space-between">
                <Col span={11}>
                    <Table
                        size="small"
                        pagination={{pageSize: 2}}
                        title={() => <h4 style={{ textAlign: "start" }}>Tìm kiếm học sinh</h4>}
                        dataSource={this.state.searchedStudents}
                        bordered
                        columns={this.getStudentTableColumn("Thêm vào lớp", this.handleAddStudentToClassButton)}
                    />
                </Col>
                <Col span={11}>
                    <Table
                        pagination={{pageSize: 2}}
                        size="small"
                        title={() => <h4 style={{ textAlign: "start" }}>Học sinh trong lớp</h4>}
                        dataSource={this.state.students}
                        bordered
                        columns={this.getStudentTableColumn("Xóa khỏi lớp", this.handleRemoveStudentToClassButton)}
                    />
                </Col>
            </Row>
        );
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title="Thêm lớp học"
                width={1000}
                closable={false}
                onOk={() => this.props.onOk(this.state)}
                onCancel={this.props.onCancel}
                visible={this.props.visible}
            >
                <Form>
                    <Form.Item label="Khối">
                        {this.gradeSelect(getFieldDecorator)}
                    </Form.Item>
                    <Form.Item label="Năm bắt đầu ~ kết thúc">
                        {this.yearsInput(getFieldDecorator)}
                    </Form.Item>
                    <Form.Item label="Tên lớp">
                        {this.nameInput(getFieldDecorator)}
                    </Form.Item>
                    <Form.Item label="Danh sách học sinh">
                        {this.studentsInput(getFieldDecorator)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(CreateClassModal);
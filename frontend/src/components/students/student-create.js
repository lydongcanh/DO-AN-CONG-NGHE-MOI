import React, { Component } from "react";
import { Form, Button, Input, message, Radio, DatePicker, Modal } from "antd";
import StudentRepo from "../../repository/prop/student-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";
import GradeSelect from "../../components/grade-select";
import StudyclassSelect from "../../components/studyclass-select";
import grades from "../../types/grades";
import moment from "moment";

/** [Require handleCancel, handleSaveSuccess] */
class CreateStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            grade: grades[0],
            studyclasses: [],
            studyclass: "A",
            visible: false,
            value: "Nam",
            student: {},
            valueDatepicker: '',
        }

        this.onChange = this.onChange.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleGradeSelectChange = this.handleGradeSelectChange.bind(this);
        this.handleStudyclassSelectChange = this.handleStudyclassSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const studyclasses = await ClassRepo.getStudyclassByGrade(grades[0]);
        this.setState({
            studyclasses: studyclasses
        });
    }

    RadioSelect() {
        return (
            <Radio.Group onChange={this.handleChange} value={this.state.value} name="gender">
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
        )
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                closable={false}
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                header={null}
                footer={null}
                width="35%">
                <div>
                    <Form style={{ textAlign: "left" }} onSubmit={this.handleSubmit}>
                        <h2>Thêm học sinh</h2>

                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: 'Tên học sinh không được bỏ trống.' },
                                    {
                                        pattern: new RegExp(/^[A-Za-z]+([\ A-Za-z]+)*/),
                                        message: "Tên học sinh không hợp lệ."
                                    },
                                    { max: 30, message: 'Vượt quá số ký tự cho phép.' }
                                ],
                            })(<Input placeholder="Tên" name="name" onChange={this.onChange}></Input>)}
                        </Form.Item>

                        <Form.Item >
                            {this.RadioSelect()}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('birthday', {
                                rules: [
                                    { required: true, message: 'Ngày sinh không được bỏ trống.' }
                                ],
                            })(<DatePicker 
                                    placeholder="Chọn ngày sinh" 
                                    name="birthday" 
                                    onChange={(date, dateString) => this.onChangeDatePicker(date, dateString)} 
                                    format="DD/MM/YYYY"
                                    disabledDate={d => !d || d.isAfter(moment())}
                                />)}
                        </Form.Item>

                        <Form.Item>
                            <GradeSelect 
                                onChange={this.handleGradeSelectChange}
                                defaultValue={grades[0]}
                            />
                        </Form.Item>

                        <Form.Item>
                            <StudyclassSelect 
                                studyclasses={this.state.studyclasses}
                                onChange={this.handleStudyclassSelectChange}
                                defaultValue={this.state.studyclasses[0]}
                            />
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('address', {
                                rules: [
                                    { required: true, message: 'Địa chỉ không được bỏ trống.' },
                                    { max: 40, message: 'Vượt quá số ký tự cho phép.' }
                                ],
                            })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>)}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: 'Số điện thoại không được để trống.' },
                                    {
                                        pattern: new RegExp(/^0+\d{9}$/g),
                                        message: "Số điện thoại phải bắt đầu bằng số 0 và có 10 số."
                                    }
                                ],
                            })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right" }}>
                            <Button onClick={this.props.handleCancel} style={{ marginRight: "10px" }}>Huỷ</Button>
                            <Button type="primary" htmlType="submit" onClick={this.handleSaveClick}>Lưu</Button>
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err)
                return;

            const studyclass = await ClassRepo.getStudyclassByGradeAndName(this.state.grade, this.state.studyclass);

            const student = {
                name: this.state.name,
                gender: this.state.value,
                birthday: this.state.valueDatepicker,
                address: this.state.address,
                grade: this.state.grade,
                phoneNumber: this.state.phoneNumber,
                state: "Đang học",
                classId: studyclass.id
            }

            const createdStudent = await StudentRepo.createStudent(
                student.name, 
                student.gender,
                student.grade,
                student.birthday,
                student.address,
                student.phoneNumber,
                student.state,
                student.classId
            );

            message.success("Thêm học sinh thành công.");
            this.props.handleSaveSuccess(createdStudent);
        });
    }

    async handleGradeSelectChange(grade) {
        const studyclasses = await ClassRepo.getStudyclassByGrade(grade);
        this.setState({
            grade: grade,
            studyclasses: studyclasses
        });
    }

    handleStudyclassSelectChange(studyclass) {
        console.log("change class:", studyclass);

        this.setState({
            studyclass: studyclass
        });
    }
    
    handleChange(e) {
        this.setState({
            value: e.target.value,
            [e.target.name]: e.target.value
        })
    }

    onChange(e) {
        if (e.target !== undefined) this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDatePicker(date, dateString) {
        this.setState({
            valueDatepicker: dateString
        });
    }

    async handleSaveClick() {
        console.log("handleSaveClick");
    }
}
export default Form.create()(CreateStudent);
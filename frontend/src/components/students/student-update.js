import React, { Component } from "react";
import { Form, Button, message, Select, Input, Radio, DatePicker, Modal } from "antd";
import StudentRepo from "../../repository/prop/student-repository";
import ClassRepo from "../../repository/prop/studyclass-repository";
import GradeSelect from "../../components/grade-select";
import StudyclassSelect from "../../components/studyclass-select";
import grades from "../../types/grades";
import moment from "moment";

const { Option } = Select;

/** [Required props : handleCancel, handleSaveSucces, student] */
class UpdateStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.student.id,
            value: this.props.student.gender,
            birthday: this.props.student.birthday,
            name: this.props.student.name,
            address: this.props.student.address,
            phoneNumber: this.props.student.phoneNumber,
            state: this.props.student.state,
            grade: grades[0],
            studyclasses: [],
            studyclass: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.handleSubjectSelectChange = this.handleSubjectSelectChange.bind(this);
        this.handleChangeRadioGroup = this.handleChangeRadioGroup.bind(this);
        this.handleGradeSelectChange = this.handleGradeSelectChange.bind(this);
        this.handleStudyclassSelectChange = this.handleStudyclassSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillReceiveProps(props) {
        if (!props || props.student.id == this.state.id)
            return;

        const studyclass = await ClassRepo.getStudyclassById(props.student.classId);
        const studyclasses = await ClassRepo.getStudyclassByGrade(props.student.grade);

        this.setState({
            id: props.student.id,
            value: props.student.gender,
            birthday: props.student.birthday,
            address: props.student.address,
            name: props.student.name,
            grade: props.student.grade,
            studyclass: studyclass.name,
            studyclasses: studyclasses,
            phoneNumber: props.student.phoneNumber,
            state: props.student.state
        });
    }

    RadioSelect() {
        return (
            <Radio.Group onChange={this.handleChangeRadioGroup} value={this.state.value}>
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
            </Radio.Group>
        )
    }

    get gradeOptions() {
        let options = [];
        for(let i = 0; i < grades.length; i++) {
            options.push(
                <Option 
                    value={grades[i]}
                    key={grades[i]}
                >
                    {grades[i]}
                </Option>
            );
        }
        return options;
    }

    get classOptions() {
        const studyclasses = this.state.studyclasses;
        if (!studyclasses)
            return [];

        let options = [];
        for(let i = 0; i < studyclasses.length; i++) {
            options.push(
                <Option 
                    value={studyclasses[i].name}
                    key={studyclasses[i].name}
                >
                    {studyclasses[i].name}
                </Option>
            );
        }
        return options;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                closable={false}
                visible={this.props.visible}
                width="35%"
                footer={null}
                title="Cập nhật thông tin học sinh"
                onCancel={this.props.handleCancel}>
                <Form style={{ textAlign: "left" }} onSubmit={this.handleSubmit} >
                    <Form.Item label="Tên">
                        {getFieldDecorator('name', {
                            initialValue: this.state.name,
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

                    <Form.Item label="Giới tính">
                        {this.RadioSelect()}
                    </Form.Item>

                    <Form.Item label="Ngày sinh">
                        {getFieldDecorator('birthday', {
                            initialValue: moment(`"${this.state.birthday}"`),
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

                    <Form.Item label="Khối">
                        <Select 
                            onChange={this.handleGradeSelectChange}
                            value={this.state.grade}
                        >
                            {this.gradeOptions}    
                        </Select>
                    </Form.Item>

                    <Form.Item label="Lớp">
                        <Select 
                            onChange={this.handleStudyclassSelectChange}
                            value={this.state.studyclass}
                        >
                            {this.classOptions}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Địa chỉ">
                        {getFieldDecorator('address', {
                            initialValue: this.state.address,
                            rules: [
                                { required: true, message: 'Địa chỉ không được bỏ trống.' },
                                { max: 40, message: 'Vượt quá số ký tự cho phép.' }
                            ],
                        })(<Input placeholder="Địa chỉ" name="address" onChange={this.onChange} ></Input>)}
                    </Form.Item>

                    <Form.Item label="Số điện thọai">
                        {getFieldDecorator('phone', {
                            initialValue: this.state.phoneNumber,
                            rules: [
                                { required: true, message: 'Số điện thoại không được để trống.' },
                                {
                                    pattern: new RegExp(/^0+\d{9}$/g),
                                    message: "Số điện thoại phải bắt đầu bằng số 0 và có 10 số."
                                }
                            ],
                        })(<Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.onChange}></Input>)}
                    </Form.Item>

                    <div style={{ textAlign: "right" }}>
                        <Button onClick={this.props.handleCancel} style={{ marginRight: "10px" }}>Huỷ</Button>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </div>
                </Form>
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
                id: this.props.student.id,
                name: this.state.name,
                gender: this.state.value,
                classId: studyclass.id,
                grade: this.state.grade,
                birthday: this.state.birthday,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                state: this.state.state
            };

            const result = await StudentRepo.updateStudent(student);

            if (result && !result.error) {
                message.success('Cập nhật thông tin học sinh thành công!');
                this.props.handleSaveSuccess(student);
            } else {
                message.error("Cập nhật thông tin học sinh không thành công.");
                console.log(result, student, this.state);
            }
        });
    };

    async handleGradeSelectChange(grade) {
        const studyclasses = await ClassRepo.getStudyclassByGrade(grade);

        this.setState({
            grade: grade,
            studyclasses: studyclasses,
            studyclass: studyclasses[0].name
        });
    }

    async handleStudyclassSelectChange(studyclassName) {
        const studyclass = await ClassRepo.getStudyclassByGradeAndName(this.state.grade, studyclassName);

        this.setState({
            studyclass: studyclass.name
        });
    }

    handleChangeRadioGroup(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubjectSelectChange(subject) {
        this.setState({
            subject: subject
        });
    }

    onChange(e) {
        if (e.target !== undefined) {
            this.setState({
                [e.target.name]: e.target.value,
            });
        }
    }

    onChangeDatePicker(defaultValue, dateString) {
        this.setState({
            birthday: dateString
        });
    }
}
export default Form.create()(UpdateStudent);
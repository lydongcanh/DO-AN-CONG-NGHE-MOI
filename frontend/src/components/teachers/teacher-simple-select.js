import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

/** Required props: onChange, teachers */
export default class TeacherSimpleSelect extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            teachers: props.teachers
        });
    }

    get select() {
        const teachers = this.state.teachers;
        if (!teachers || teachers.length < 1)
            return "Không có giáo viên phù hợp";

        let options = [];
        for(let i = 0; i < teachers.length; i++) {
            options.push(
                <Option 
                    value={teachers[i].id}
                    key={teachers[i].id}
                >
                    {teachers[i].name} ({teachers[i].email})
                </Option>
            );
        }

        return (
            <Select
                defaultValue={teachers[0].id}
                placeholder="Chọn giáo viên"
                onChange={this.props.onChange}
            >
                {options}
            </Select>
        );
    }

    getTeacherWithId(id) {
        return this.props.teachers.find(teacher => teacher.id == id);
    }

    render() {                
        return this.select;
    }
}
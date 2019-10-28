import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

/** Required props: onChange, teachers */
export default class TeacherSimpleSelect extends Component {
    
    get options() {        
        let options = [];
        const teachers = this.props.teachers;
        if (!teachers || teachers.length < 1)
            return options;

        for(let i = 0; i < teachers.length; i++) {
            options.push(
                <Option 
                    value={teachers[i].id}
                    key={teachers[i].id}
                >
                    {teachers[i].name} ({teachers[i].phoneNumber})
                </Option>
            );
        }
        return options;
    }

    get defaulTeacher() {
        const teachers = this.props.teachers;
        if (!teachers || teachers.length < 1)
            return "Không có giáo viên phù hợp";

        return teachers[0].id;
    }

    getTeacherWithId(id) {
        return this.props.teachers.find(teacher => teacher.id == id);
    }

    render() {        
        return (
            <Select
                onChange={(id) => this.props.onChange(this.getTeacherWithId(id))}
            >
                {this.options}
            </Select>
        );
    }
}
import React, { Component } from "react";
import { Select } from "antd";
import grades from "../types/grades";

const { Option } = Select;

/** Required props: onChange, defaultValue */
export default class GradeSelect extends Component {
    get options() {
        let options = [];
        for(let i = 0; i < grades.length; i++) {
            options.push(
                <Option 
                    value={grades[i]}
                    key={grades[i]}
                >
                    Khối {grades[i]}
                </Option>
            );
        }
        return options;
    }

    render() {

        return (
            <Select
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            >
                {this.options}
            </Select>
        );
    }
}
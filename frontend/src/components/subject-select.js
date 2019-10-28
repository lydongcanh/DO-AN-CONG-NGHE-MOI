import React, { Component } from "react";
import { Select } from "antd";
import subjects from "../types/subjects";

const { Option } = Select;

/** Required props: onChange */
export default class SubjectSelect extends Component {
    get options() {
        let options = [];
        for(let i = 0; i < subjects.length; i++) {
            options.push(
                <Option 
                    value={subjects[i]}
                    key={subjects[i]}
                >
                    {subjects[i]}
                </Option>
            );
        }
        return options;
    }

    render() {

        return (
            <Select
                defaultValue={subjects[0]}
                onChange={this.props.onChange}
            >
                {this.options}
            </Select>
        );
    }
}
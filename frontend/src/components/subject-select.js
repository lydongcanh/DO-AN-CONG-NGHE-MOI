import React, { Component } from "react";
import { Select } from "antd";
import subjects from "../types/subjects";

const { Option } = Select;

/** Required props: onChange, defaultValue */
export default class SubjectSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "Chọn môn học"
        };
    }

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
                placeholder="Chọn môn"
                style={{width: "100%"}}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            >
                {this.options}
            </Select>
        );
    }
}
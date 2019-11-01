import React, { Component } from "react";
import { Select } from "antd";

const { Option } = Select;

/** Required props: onChange, studyclasses, defaultValue */
export default class StudyclassSelect extends Component {
    get options() {
        const studyclasses = this.props.studyclasses;
        if (!studyclasses)
            return [];

        let options = [];
        for(let i = 0; i < studyclasses.length; i++) {
            options.push(
                <Option 
                    value={studyclasses[i].name}
                    key={studyclasses[i].name}
                >
                    Lớp {studyclasses[i].name}
                </Option>
            );
        }
        return options;
    }

    get defaultValue() {
        if (this.props.defaultValue)
            return this.props.defaultValue.name;
        
        return "";
    }

    render() {

        return (
            <Select
                defaultValue={this.defaultValue}
                onChange={this.props.onChange}
            >
                {this.options}
            </Select>
        );
    }
}
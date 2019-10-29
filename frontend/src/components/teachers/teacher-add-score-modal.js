import React, { Component } from "react";
import { Modal, InputNumber, Divider } from "antd";
import { getMultiplierFromType } from "../../types/scoreTypes";

/** Required props: student, type, scoreboardId */
export default class TeacherAddScoreModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: undefined
        };

        this.handleInputNumberChange = this.handleInputNumberChange.bind(this);
    }

    handleInputNumberChange(value) {
        this.setState({
            value: value
        });
    }

    render() {
        return (
            <Modal
                title="Nhập điểm"
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={() => this.props.onOk(
                                this.state.value, 
                                this.props.type, 
                                getMultiplierFromType(this.props.type), 
                                this.props.scoreboardId)}
                closable={false}
                centered
                okText="Lưu"
                cancelText="Hủy"
            >
                {this.props.student.name}
                <Divider type="vertical"/>
                {this.props.type}
                <Divider type="vertical"/>
                Hệ số {getMultiplierFromType(this.props.type)}
                <Divider type="vertical"/>
                <InputNumber
                    min={0}
                    max={10}
                    step={0.01}
                    onChange={this.handleInputNumberChange}
                />
            </Modal>
        );
    }
}
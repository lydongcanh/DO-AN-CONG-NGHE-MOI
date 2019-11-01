import React, { Component } from "react";
import { InputNumber, Modal, message } from "antd";
import ScoreRepo from "../../repository/prop/score-repository";

/** Required props: visible, onFinish score */
export default class StudentScoreUpdateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: {},
            scoreValue: 0
        }

        this.handleOnOk = this.handleOnOk.bind(this);
        this.handleScoreValueChange = this.handleScoreValueChange.bind(this);
    }

    componentWillReceiveProps(props) {
        if (!props || !props.score)
            return;
        
        this.setState({
            score: props.score,
            scoreValue: props.score.value
        })
    }

    handleScoreValueChange(value) {
        this.setState({
            scoreValue: value
        });
    }

    async handleOnOk() {
        const score = {
            id: this.state.score.id,
            type: this.state.score.type,
            value: this.state.scoreValue,
            subject: this.state.score.subject,
            multiplier: this.state.score.multiplier,
            scoreboardId: this.state.score.scoreboardId
        };

        const result = await ScoreRepo.updateScore(score);

        if (result && !result.error) {
            message.success('Cập nhật điểm thành công!');
            this.props.onFinish();
        } else {
            message.error("Cập nhật điểm không thành công.");
            console.log(result);
        }
    }

    render() {
        return (
            <Modal
                centered
                title="Cập nhật điểm"
                closable={false}
                visible={this.props.visible}
                onCancel={this.props.onFinish}
                onOk={this.handleOnOk}
                okText="Lưu"
                cancelText="Hủy"
            >
                <p><b>Môn: </b>{this.state.score.subject}</p>
                <p><b>Loại: </b>{this.state.score.type}</p>
                <p><b>Hệ số: </b>{this.state.score.multiplier}</p>
                <b>Điểm: </b>
                <InputNumber 
                    onChange={this.handleScoreValueChange}
                    value={this.state.scoreValue}
                    min={0}
                    max={10}
                    step={0.01}
                />
            </Modal>
        );
    }
}
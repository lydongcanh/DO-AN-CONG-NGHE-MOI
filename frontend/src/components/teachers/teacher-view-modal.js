import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';

/**[Required props : visible , teacher , onCancel, onOk] */
export default class TeacherView extends Component {

    render() {
        return (
            <Modal
                closable={false}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                header={null}
                footer={null}
                width="35%"
            >
                <Card title="Thông tin giáo viên" style={{ width: "100%" }}>
                    <p> Tên: {this.props.teacher.name}</p>
                    <p> Giới tính: {this.props.teacher.gender}</p>
                    <p> Ngày sinh: {this.props.teacher.birthday}</p>
                    <p> Môn: {this.props.teacher.subject}</p>
                    <p> Địa chỉ: {this.props.teacher.address}</p>
                    <p> Email: {this.props.teacher.email}</p>
                    <p> Số điện thoại: {this.props.teacher.phoneNumber}</p>
                    <p> Trạng thái: {this.props.teacher.state}</p>
                </Card>
            </Modal>
        )
    }
}
import React, { Component } from "react";
import { Table, Tag, Modal, Button } from "antd";
import scoreTypes from "../../types/scoreTypes";

/** [Required props: visible, onOk, onCancel, students] */
export default class TeacherAddScoresModal extends Component {
    constructor(props) {
        super(props);

        this.handleInsertScoreButton = this.handleInsertScoreButton.bind(this);
    }

    get columns() {
        let result = [
            {
                title: "TT",
                dataIndex: "count",
                key: "count"
            },
            {
                title: "Tên",
                dataIndex: "studentName",
                key: "studentName"
            },
            {
                title: "Ngày sinh",
                dataIndex: "studentBirthday",
                key: "studentBirthday"
            }
        ];

        for(let i = 0; i < scoreTypes.length; i++) {
            const type = scoreTypes[i];
            result.push({
                title: type,
                dataIndex: type,
                key: type,
                render: (scores, row, index) => {
                    let views = [];

                    if (scores && scores.length > 0) {
                        for(let i = 0; i < scores.length; i++) {
                            views.push(
                                <Tag 
                                    key={scores[i].id}
                                    color={this.getTagColorWithScore(scores[i])}>
                                    {scores[i]}
                                </Tag>
                            )
                        }
                    }

                    views.push(
                        <Button 
                            onClick={() => this.handleInsertScoreButton(type, index)}
                            size="small" 
                            shape="circle" 
                            icon="plus"/>
                    );

                    return views;
                }
            });
        }

        return result;
    }

    get dataSource() {
        const students = this.props.students;
        if (!students)
            return [];

        let result = [];
        for(let i = 0; i < students.length; i++) {
            const student = students[i];
            let item = {
                count: i + 1,
                studentName: student.name,
                studentBirthday: student.birthday,
            }
            
            for(let j = 0; j < scoreTypes.length; j++) {
                const type = scoreTypes[j];
                item[`${type}`] = []; // TODO: get all available scores...
            }

            result.push(item);
        }

        return result;
    }

    handleInsertScoreButton(type, index) {
        // TODO: Insert student score...ant-card-contain-grid
        console.log("insert", type, this.props.students[index]);
    }

    getTagColorWithScore(score) {
        if (score < 5) {
            return "red";
        } 

        return "blue";
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onOk={this.props.onOk}
                onCancel={this.props.onCancel}
                okText="Lưu"
                cancelText="Hủy"
                closable={false}
                centered
                width={1000}
            >
                <Table
                    rowKey={record => record.id}
                    bordered
                    size="small"
                    columns={this.columns}
                    dataSource={this.dataSource}
                />
            </Modal>
        );
    }
}
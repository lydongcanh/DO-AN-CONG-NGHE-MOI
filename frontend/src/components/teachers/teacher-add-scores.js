import React, { Component } from "react";
import { Table, Tag, Icon, Button } from "antd";
import scoreTypes from "../../types/scoreTypes";

/** [Required props: students] */
export default class TeacherAddScores extends Component {
    constructor(props) {
        super(props);

        this.handleInsertScoreButton = this.handleInsertScoreButton.bind(this);
    }

    get columns() {
        let result = [
            {
                title: "Tên",
                dataIndex: "studentName",
                key: "studentName"
            },
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
                studentName: student.name,
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
        // TODO: Insert student score...
        console.log("insert", type, this.props.students[index]);
    }

    getTagColorWithScore(score) {
        if (score < 5) {
            return "red";
        } 

        if (score < 8) {
            return "blue";
        }

        return "purple";
    }

    render() {
        return (
            <Table
                rowKey={record => record.studentName.valueOf()}
                bordered
                columns={this.columns}
                dataSource={this.dataSource}
            />
        );
    }
}
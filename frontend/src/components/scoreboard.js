import React, { Component } from "react";
import { Divider, Table } from "antd";
import subjects from "../types/subjects";
import MockDB from "../repository/mock/mockDB";
const mockDB = new MockDB();

/** [Required props: scoreboard] */
export default class Scoreboard extends Component {

    get columns() {
        let result = [
            {
                title: "TT",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Môn học",
                dataIndex: "subject",
                key: "subject"
            },
        ];

        const types = this.availableScoreTypes;
        for(let i = 0; i < types.length; i++) {
            result.push({
                title: types[i],
                dataIndex: types[i],
                key: types[i],
                render: scores => {
                    return scores.map(score => score.value).join(",");
                }
            });
        }

        result.push({
            title: "Trung bình",
            dataIndex: "average",
            key: "average"
        });

        console.log("result", result);

        return result;
    }

    get scores() {
        if (!this.props.scoreboard || !this.props.scoreboard.id)
            return [];

        return mockDB.getScores(this.props.scoreboard.id);
    }

    get scoreboardData() {
        let result = [];

        for(let id = 0; id < subjects.length; id++) {
            const allScores = this.scores;
            const scoresOfSubject = allScores.filter(score => {
                return score.subject == subjects[id];
            });

            const types = this.availableScoreTypes;

            let data = {
                id: id + 1,
                subject: subjects[id],
                average: this.getAverageScore(scoresOfSubject)
            };

            for(let typeId = 0; typeId < types.length; typeId++) {
                data[types[typeId]] = this.getAllScoresWithType(scoresOfSubject, types[typeId]);
            }

            result.push(data);
        }   

        return result;
    }

    get availableScoreTypes() {
        const scores = this.scores;

        if (!scores || scores.length < 1)
            return [];

        return [...new Set(scores.map(s => s.type))];
    }

    getAverageScore(scores) {
        let sum = 0, multiplier = 0;
        for(let i = 0; i < scores.length; i++) {
            sum += scores[i].value * scores[i].multiplier;
            multiplier += scores[i].multiplier;
        }
        return sum / multiplier;
    }

    getAllScoresWithType(scores, type) {
        return scores.filter(score => {
            return score.type == type;
        });
    }

    render() {
        return (
            <Table title={() => <h2 style={{textAlign: "start"}}>Bảng điểm {this.props.scoreboard.semester} - {this.props.scoreboard.year}</h2>}
                   rowKey={record => record.id}
                   pagination={{pageSize: 13}}
                   dataSource={this.scoreboardData} 
                   columns={this.columns} 
                   bordered/>
        );
    }
}
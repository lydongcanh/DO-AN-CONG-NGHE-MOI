import React, { Component } from "react";
import { Tag, Table } from "antd";
import subjects from "../types/subjects";
import scoreTypes from "../types/scoreTypes";
import ScoreRepository from "../repository/prop/score-repository";

/** [Required props: scoreboard] */
export default class Scoreboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scores: []
        }
    }

    async componentDidMount() {
        const id = this.props.scoreboard.id;
        console.log("id", id);
        const scores = await ScoreRepository.getScoreByScoreboardId(id);

        this.setState({
            scores: scores
        });
    }

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

        for(let i = 0; i < scoreTypes.length; i++) {
            result.push({
                title: scoreTypes[i],
                dataIndex: scoreTypes[i],
                key: scoreTypes[i],
                render: scores => {

                    if (!scores || scores.length < 1)
                        return <p>-</p>;

                    let views = [];
                    for(let i = 0; i < scores.length; i++) {

                        views.push(
                            <Tag 
                                key={scores[i].id}
                                color={this.getTagColorWithScore(scores[i].value)}>
                                {scores[i].value}
                            </Tag>
                        )
                    }
                    return views;
                }
            });
        }

        result.push({
            title: "Trung bình",
            dataIndex: "average",
            key: "average",
            render: score => {
                if (!Number(score))
                    return <p>-</p>
                
                return <Tag color={this.getTagColorWithScore(score)}>{score}</Tag>
            }
        });

        return result;
    }

    get scoreboardData() {
        let result = [];

        for(let id = 0; id < subjects.length; id++) {
            const allScores = this.state.scores;

            if (!allScores || allScores.length < 1)
                continue;

            const scoresOfSubject = allScores.filter(score => {
                return score.subject == subjects[id];
            });

            let data = {
                id: id + 1,
                subject: subjects[id],
                average: this.getAverageScore(scoresOfSubject)
            };

            for(let typeId = 0; typeId < scoreTypes.length; typeId++) {
                data[scoreTypes[typeId]] = this.getAllScoresWithType(scoresOfSubject, scoreTypes[typeId]);
            }

            result.push(data);
        }   

        return result;
    }

    getAverageScore(scores) {        
        let sum = 0, multiplier = 0;
        for(let i = 0; i < scores.length; i++) {
            sum += scores[i].value * scores[i].multiplier;
            multiplier += scores[i].multiplier;
        }
        return (sum / multiplier).toFixed(2);
    }

    getAllScoresWithType(scores, type) {
        return scores.filter(score => {
            return score.type == type;
        });
    }

    getTagColorWithScore(score) {
        if (score < 5) {
            return "red";
        } 

        return "blue";
    }

    render() {
        return (
            <Table title={() => <h2 style={{textAlign: "start"}}>Bảng điểm lớp {this.props.scoreboard.grade} - {this.props.scoreboard.semester}</h2>}
                   rowKey={record => record.id}
                   pagination={{pageSize: 13, hideOnSinglePage: true}}
                   dataSource={this.scoreboardData} 
                   columns={this.columns} 
                   bordered/>
        );
    }
}
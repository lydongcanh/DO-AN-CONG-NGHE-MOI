import React, { Component } from "react";
import { Tabs } from "antd";
import Scoreboard from "../../components/scoreboard";
import ScoreboardRepository from "../../repository/prop/scoreboard-repository";

const { TabPane } = Tabs;

export default class StudentScoresPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            scoreboards: []
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const id = params.id;
        
        console.log("mount", id);

        let scoreboards = await ScoreboardRepository.getScoreboardsByStudentId(id);
        console.log("scoreboards", scoreboards);

        this.setState({
            data: params,
            scoreboards: scoreboards
        });
    }

    getScoreboardsView(scoreboards) {
        let result = [];
        for(let i = 0; i < scoreboards.length; i++) {
            const scoreboard = scoreboards[i];

            result.push(
                <TabPane tab={`${scoreboard.semester} - ${scoreboard.year}`} key={scoreboard.id}>
                    <Scoreboard scoreboard={scoreboard}/>
                </TabPane>
            );
        }   
        
        return (
            <Tabs defaultActiveKey={this.state.scoreboards[this.state.scoreboards.length - 1].id}>
                {result}
            </Tabs>
        );
    }

    render() {
        if (!this.state.scoreboards || this.state.scoreboards.length < 1)
            return <h3>Học sinh này hiện chưa có điểm số nào.</h3>
        
        return this.getScoreboardsView(this.state.scoreboards);
    }
}
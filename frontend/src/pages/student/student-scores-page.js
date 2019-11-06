import React, { Component } from "react";
import { Tabs } from "antd";
import Scoreboard from "../../components/scoreboard";
import ScoreboardRepo from "../../repository/prop/scoreboard-repository";
import StudentRepo from "../../repository/prop/student-repository";

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
        
        let student = await StudentRepo.getStudentById(id);
        let scoreboards = await ScoreboardRepo.getScoreboardsByStudentId(id);

        this.setState({
            data: params,
            scoreboards: scoreboards,
            student: student
        });
    }

    getAvailableScoreboards(scoreboards, student) {
        let result = [];
        for(let i = 0; i < scoreboards.length; i++) {
            if (scoreboards[i].grade > student.grade)
                continue;

            result.push(scoreboards[i]);
        }
        result.sort((a, b) => this.sortScoreboard(a, b));
        return result;
    }

    getDefaultTabPaneKey(scoreboards) {
        for(let i = 0; i < scoreboards.length; i++) {
            if (scoreboards[i].grade == this.state.student.grade)
                return scoreboards[i].id;
        }
        return 0;
    }

    sortScoreboard(a, b) {
        if (a.grade > b.grade)
            return 1;

        if (a.grade < b.grade)
            return - 1;

        if (a.semester > b.semester)
            return 1;

        if (a.semester < b.semester)
            return -1;

        return 0;
    }

    getScoreboardsView(scoreboards) {
        let result = [];
        for(let i = 0; i < scoreboards.length; i++) {
            const scoreboard = scoreboards[i];

            result.push(
                <TabPane tab={`Lớp ${scoreboard.grade} - ${scoreboard.semester}`} key={scoreboard.id}>
                    <Scoreboard scoreboard={scoreboard}/>
                </TabPane>
            );
        }   
        
        return (
            <Tabs defaultActiveKey={this.getDefaultTabPaneKey(scoreboards)}>
                {result}
            </Tabs>
        );
    }

    render() {
        if (!this.state.scoreboards || this.state.scoreboards.length < 1)
            return <h3>Học sinh này hiện chưa có điểm số nào.</h3>
        
        return this.getScoreboardsView(this.getAvailableScoreboards(this.state.scoreboards, this.state.student));
    }
}
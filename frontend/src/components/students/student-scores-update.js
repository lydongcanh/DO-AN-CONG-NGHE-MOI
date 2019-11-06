import React, { Component } from "react";
import { Tabs, Modal } from "antd";
import StudentScoreUpdate from "../students/student-score-update";
import ScoreboardRepo from "../../repository/prop/scoreboard-repository";
const { TabPane } = Tabs;

/** Required props: visible, onFinish, student */
export default class StudentScoresUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scoreboards: []
        };

        this.handleOnOk = this.handleOnOk.bind(this);
    }

    async componentWillReceiveProps(props) {
        if (!props || !props.student)
            return;

        const scoreboards = await ScoreboardRepo.getScoreboardsByStudentId(props.student.id);

        this.setState({
            scoreboards: scoreboards
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
            if (scoreboards[i].grade == this.props.student.grade)
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
                    <StudentScoreUpdate scoreboard={scoreboard}/>
                </TabPane>
            );
        }   
        
        return (
            <Tabs defaultActiveKey={this.getDefaultTabPaneKey(scoreboards)}>
                {result}
            </Tabs>
        );
    }

    handleOnOk() {
        this.props.onFinish();
    }

    render() {
        return (
            <Modal
                width={1000}
                title="Quản lý điểm"
                visible={this.props.visible}
                onOk={this.handleOnOk}
                onCancel={this.props.onFinish}
                footer={null}
            >
                {this.getScoreboardsView(this.getAvailableScoreboards(this.state.scoreboards, this.props.student))}
            </Modal>
        );
    }
}
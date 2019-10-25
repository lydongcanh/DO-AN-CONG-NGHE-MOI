import React, { Component } from "react";
import { Tabs } from "antd";
import Scoreboard from "../../components/scoreboard";

import mockDB from "../../repository/mock/mockDB";

const { TabPane } = Tabs;

export default class StudentScoresPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            data: params
        })
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
        
        console.log("...", result);

        return (
            <Tabs defaultActiveKey={String(scoreboards[scoreboards.length - 1].id)}>
                {result}
            </Tabs>
        );
    }

    render() {
        const id = this.state.data.id;
        if (!id)
            return <h3>Thông tin học sinh không hơp lệ.</h3>

        let scoreboards = mockDB.getStudentScoreboards(id);
        if (!scoreboards || scoreboards.length == 0)
            return <h3>Học sinh này hiện chưa có điểm số nào.</h3>
        
        return this.getScoreboardsView(scoreboards);
    }
}
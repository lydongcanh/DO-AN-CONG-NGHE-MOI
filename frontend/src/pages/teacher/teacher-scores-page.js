import React, { Component } from "react";

export default class TeacherScoresPage extends Component {
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

    render() {
        return (
            <h2>Trang nhập điểm học sinh dành cho giáo viên: {this.state.data.username}</h2>
        );
    }
}
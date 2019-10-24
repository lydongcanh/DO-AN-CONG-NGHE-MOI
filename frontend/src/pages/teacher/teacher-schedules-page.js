import React, { Component } from "react";

export default class TeacherSchedulesPage extends Component {
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
            <h2>Trang xem thời khóa biểu giáo viên: {this.state.data.username}</h2>
        );
    }
}
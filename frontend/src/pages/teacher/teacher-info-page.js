import React, { Component } from "react";

export default class TeacherInfoPage extends Component {
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
            <div>Trang xem thông tin giáo viên: {JSON.stringify(this.state.data.username)}</div>
        );
    }
}
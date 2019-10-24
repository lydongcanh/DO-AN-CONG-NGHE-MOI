import React, { Component } from "react";
import { Button} from "antd";
import { Link } from "react-router-dom";

export default class NewButton extends Component {
    render() {
        return (
            <Button>
                <Link to={`/admin/studentcreate`}>
                        Thêm
                </Link>
            </Button>
        );
    }
}
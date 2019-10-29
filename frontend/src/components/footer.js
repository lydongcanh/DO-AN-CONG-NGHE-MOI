import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default class MyFooter extends Component {

    render() {
        return (
            <Footer style={{textAlign: "center"}}>
                Đồ án công nghệ mới: Nhóm 8<br/><br/>
            </Footer>
        );
    }
}
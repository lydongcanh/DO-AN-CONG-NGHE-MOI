import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default class MyFooter extends Component {
    render() {
        return (
            <Footer style={
                {
                    position: "relative",
                    bottom: "0",
                    width: "100%",
                    //height: "2.5rem",
                    textAlign: "center",              
                }}>
                Đồ án công nghệ mới: Nhóm 8
            </Footer>
        );
    }
}
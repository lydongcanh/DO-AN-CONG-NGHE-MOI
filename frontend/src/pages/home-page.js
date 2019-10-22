import React, { Component } from "react";
import { Layout } from "antd";
import Footer from "../components/footer";
import "antd/dist/antd.css";
import "../style.css";

const { Header, Content } = Layout;

export default class HomePage extends Component {
    render() {
        return (
            <Layout>
                <Header style={{ textAlign: "center"}}>Header</Header>
                <Content style={{ textAlign: "center"}} className="content">
                    Lorem Ipsum Dolor Sir Amet
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        );
    }
}

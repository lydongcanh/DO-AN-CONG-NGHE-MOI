import React, { Component } from "react";
import { Layout, Button } from "antd";
import DataGenerator from "../repository/generators/data-generator";

const { Footer } = Layout;

export default class MyFooter extends Component {

    render() {
        return (
            <Footer style={{textAlign: "center"}}>
                Đồ án công nghệ mới: Nhóm 8<br/><br/>
                <Button 
                    onClick={() => this.generateData()}>
                    Generate Data
                </Button>
            </Footer>
        );
    }

    async generateData() {
        try {
            await DataGenerator();
            alert("Data generated!!!");
        } catch (error) {
            alert("Error: " + JSON.stringify(error));
        }
    }
}
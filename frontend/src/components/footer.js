import React, { Component } from "react";
import { Layout, Button } from "antd";
import DataGenerator from "../repository/generators/data-generator";

const { Footer } = Layout;

export default class MyFooter extends Component {
    constructor(prop) {
        super(prop);

        this.state = {
            generateButtonDisable: false
        }
    }

    render() {
        return (
            <Footer style={{textAlign: "center"}}>
                Đồ án công nghệ mới: Nhóm 8<br/><br/>
                <Button 
                    disabled={this.state.generateButtonDisable}
                    onClick={() => this.generateData()}>
                    Generate Data
                </Button>
            </Footer>
        );
    }

    generateData() {
        try {
            DataGenerator();
            alert("Data generated!!!");
        } catch (error) {
            alert("Error: " + JSON.stringify(error));
        }
        this.setState({
            generateButtonDisable: true
        });
    }
}
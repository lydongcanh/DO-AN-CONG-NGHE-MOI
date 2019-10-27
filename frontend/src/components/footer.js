import React, { Component } from "react";
import { Layout, Button } from "antd";
import DataInput from "../repository/generators/data-generator";

const { Footer } = Layout;

export default class MyFooter extends Component {

    render() {
        return (
            <Footer style={{textAlign: "center"}}>
                Đồ án công nghệ mới: Nhóm 8<br/><br/>
                <Button 
                    onClick={() => this.generateData("account")}>
                    Tạo tài khoản
                </Button>
                <Button 
                    onClick={() => this.generateData("class")}>
                    Tạo lớp
                </Button>
                <Button 
                    onClick={() => this.generateData("scoreboard")}>
                    Tạo bảng điểm
                </Button>
                <Button 
                    onClick={() => this.generateData("score")}>
                    Tạo điểm
                </Button>
                <Button 
                    onClick={() => this.generateData("teacher")}>
                    Tạo giáo viên
                </Button>
                <Button 
                    onClick={() => this.generateData("student")}>
                    Tạo học sinh
                </Button>
            </Footer>
        );
    }

    async generateData(name) {
        try {
            await DataInput();
            alert("Thêm thành công: " + name);
        } catch (error) {
            alert("Error: " + JSON.stringify(error));
        }
    }
}
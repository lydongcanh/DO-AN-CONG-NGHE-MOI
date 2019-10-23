import React, { Component } from "react";
import { Layout } from "antd";
import Footer from "../components/footer";
import Header from "../components/header";
import StudentSearchInput from "../components/student-search-input";
import StudentTable from "../components/student-table";
import LoginModal from "../components/login-modal";

import "../style.css";

const { Content } = Layout;

export default class HomePage extends Component {
    render() {
        return (
            <Layout>
                <Header/>
                <Content style={{ textAlign: "center" }} className="content">
                    <br/>
                    <StudentSearchInput/>
                    <br/>
                </Content>
                <Footer/>
            </Layout>
        );
    }

    findStudentByName(name) {

    }
}

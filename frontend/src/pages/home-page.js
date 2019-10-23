import React, { Component } from "react";
import { Layout } from "antd";
import Footer from "../components/footer";
import Header from "../components/header";
import StudentSearchInput from "../components/student-search-input";
import StudentTable from "../components/student-table";

import "../style.css";

const { Content } = Layout;

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchedStudent: []
        }
        
        this.handleSearchedStudent = this.handleSearchedStudent.bind(this);
    }

    render() {
        return (
            <Layout>
                <Header/>
                <Content style={{ textAlign: "center" }} className="content">
                    <br/>
                    <StudentSearchInput onSearchStudent={this.handleSearchedStudent} onSearchClass={this.handleSearchedStudent}/>
                    <br/>
                    <StudentTable students={this.state.searchedStudent}/>
                </Content>
                <Footer/>
            </Layout>
        );
    }

    /** Xử lý sự kiện sau khi nhập tìm kiếm học sinh bằng tên hoặc lớp
     * @param students Danh sách học sinh tìm thấy
     */
    handleSearchedStudent(students) {
        this.setState({
            searchedStudent: students
        })
    }
}

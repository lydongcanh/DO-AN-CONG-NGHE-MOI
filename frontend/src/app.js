import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import { Layout } from "antd";
import Footer from "./components/footer";
import Header from "./components/header";
import HomePage from "./pages/home-page";
import AdminSchedulesPage from "./pages/admin/admin-schedules-page";
import AdminStudentsPage from "./pages/admin/admin-students-page";
import AdminTeachersPage from "./pages/admin/admin-teachers-page";
import AdminClassesPage from "./pages/admin/admin-classes-page";
import TeacherInfoPage from "./pages/teacher/teacher-info-page";
import TeacherSchedulesPage from "./pages/teacher/teacher-schedules-page";
import TeacherScoresPage from "./pages/teacher/teacher-scores-page";
import StudentScoresPage from "./pages/student/student-scores-page";
import StudentSchedulesPage from "./pages/student/student-schedules-page";

const { Content } = Layout;

export default class App extends Component {
    render() {
        return(
            <Layout>
                <Header/><br/>
                <Content style={{ 
                                    textAlign: "center", 
                                    height: "100vh",
                                    padding: "0 50px"
                                }}>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/admin/schedules" component={AdminSchedulesPage}/>
                        <Route path="/admin/students" component={AdminStudentsPage}/>
                        <Route path="/admin/teachers" component={AdminTeachersPage}/>
                        <Route path="/admin/classes" component={AdminClassesPage}/>
                        <Route path="/teacher/:username" component={TeacherInfoPage}/>
                        <Route path="/teacherschedules/:username" component={TeacherSchedulesPage}/>
                        <Route path="/teacherscores/:username" component={TeacherScoresPage}/>
                        <Route path="/studentscores/:id/" component={StudentScoresPage}/>
                        <Route path="/studentschedules/:id" component={StudentSchedulesPage}/>
                    </Switch>
                </Content>
                <Footer/>
            </Layout>
        );
    }
}
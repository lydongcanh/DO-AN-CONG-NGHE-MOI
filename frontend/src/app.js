import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/home-page";

export default class App extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={HomePage}/>
            </Switch>
        );
    }
}
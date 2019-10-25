import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./app";
import 'antd/dist/antd.css';

document.title = "Đồ án CNM nhóm 8";

ReactDOM.render(
    <BrowserRouter> 
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
);
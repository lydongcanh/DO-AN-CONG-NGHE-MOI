import React, { Component } from "react";
import { Button} from "antd";
import CreateTeacherModal from "../../components/teachers/teacher-create";

export default class NewButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        }
        this.handleCreateButton = this.handleCreateButton.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveSuccess = this.handleSaveSuccess.bind(this);
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleCreateButton}>
                    Thêm
                </Button>
                <CreateTeacherModal
                    visible={this.state.visible}
                    handleCancel={this.handleCancel}
                    handleSaveSuccess={this.handleSaveSuccess}>
                </CreateTeacherModal>
            </div>
           
        );
    }
    handleCancel(){
        this.setState({
            visible : false
        });
    }
    handleCreateButton(){
        this.setState({
            visible : true
        });
    }
    handleSaveSuccess(){
        this.setState({
            visible : false
        });
    }
}
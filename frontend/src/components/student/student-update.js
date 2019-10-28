import React , {Component} from "react";
import {Menu,Dropdown,Form, Row, Col, Button, Icon, Input, Radio, DatePicker} from "antd";
import mockDB from "../../repository/mock/mockDB";
import moment from "moment";
import StudyClassResponsitory from "../../repository/prop/studyclass-repository"

//[Required props: student ,handleCancel, handleLoginSuccess ] 
class UpdateStudent extends Component{
    constructor(props){
        super(props);
        this.state={
            classe : {},
            classes: [],
            datePickerValue:'',
            value : this.props.student.gender,
            gradeDropdownText: '',
            classDropdownText: '',
            classDropdownActive: false,
        }
        this.handleChangeRadioGroup = this.handleChangeRadioGroup.bind(this);
        this.handleGradeMenuClick = this.handleGradeMenuClick.bind(this);
        this.handleClassMenuClick = this.handleClassMenuClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handlechangDate = this.handlechangDate.bind(this);
        this.handleChangeValueInput = this.handleChangeValueInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentWillReceiveProps(props) {
        this.setState({
            // classe : await StudyClassResponsitory.getStudyclassById(this.props.student.classId)
            // lay tam du lieu
            classe :  await StudyClassResponsitory.getStudyclassById("1516fba0-f8a9-11e9-9d39-395fc7dc81bd")
        })
        /*set value cho gender radio button*/
        if(this.props.student.gender === "Nam")
        { 
            this.setState({
                value : "Nam"
            })
        }else this.setState({
                value : "Nữ"
        })
        console.log('a',this.state.gradeDropdownText);
        this.componentDidMount();
    }
    /*set value cho grade & class cho dropdown meu*/
    async componentDidMount(){
        this.setState({
            // classe : await StudyClassResponsitory.getStudyclassById(this.props.student.classId)
            // lay tam du lieu
            classe :  await StudyClassResponsitory.getStudyclassById("e32df660-f99e-11e9-b178-25e201954fc0")
        })
        this.setState({
                gradeDropdownText: "Khối " + this.state.classe.grade,
                classDropdownText: this.state.classe.name,
        })
    }
    
    /*item radio select*/
    RadioSelect(){
        return(
            <Radio.Group onChange={this.handleChangeRadioGroup} value={this.state.value}>                       
                <Radio value={"Nam"}>Nam</Radio>                           
                <Radio value={"Nữ"}>Nữ</Radio>                       
            </Radio.Group>
        )
    }
    /*item dropdown select*/
    DropdownSelect(){
        return(
            <div>
                <Dropdown overlay={this.gradeMenu}>
                    <Button>
                        {this.state.gradeDropdownText} <Icon type="down"/>
                    </Button>
                </Dropdown>
                <Dropdown overlay={this.classMenu} disabled={!this.state.classDropdownActive}>
                    <Button>
                        {this.state.classDropdownText} <Icon type="down"/>
                    </Button>
                </Dropdown>                
            </div>
        )
    }
    get gradeMenu() {
        console.log('asfasf',this.state.gradeDropdownText)
        return (
            <Menu onClick={ this.handleGradeMenuClick}>
                <Menu.Item key="10">
                    Khối 10
                </Menu.Item>
                <Menu.Item key="11">
                    Khối 11
                </Menu.Item>
                <Menu.Item key="12">
                    Khối 12
                </Menu.Item>
            </Menu>
        );
    }
    get classMenu() {
        let menus = [];
        for(let i = 0; i < this.state.classes.length; i++) {
            menus.push(
                <Menu.Item key={i}>
                    {this.state.classes[i].name}
                </Menu.Item>
            );
        }
        return (
            <Menu onClick={this.handleClassMenuClick}>
                {menus}
            </Menu>
        );
    }
    render(){
        console.log('student',this.props);
        return(
                <Form onSubmit={this.handleSubmit}>
                        <h2>Sửa thông tin học sinh</h2>
                        <Form.Item>
                            <Input placeholder="Tên" name="name" onChange={this.handleChangeValueInput} defaultValue={this.props.student.name}></Input>
                        </Form.Item>
                        <Form.Item>
                            {this.RadioSelect()}
                        </Form.Item>
                        <Form.Item>
                            <DatePicker name="birthday" defaultValue={moment(`"${this.props.student.birthday}"`)} onChange={(defaultValue,dateString)=> this.handlechangDate(defaultValue,dateString)} format="DD/MM/YYYY"></DatePicker>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Địa chỉ" name="address" onChange={this.handleChangeValueInput} defaultValue={this.props.student.address}></Input>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Số điện thoại" name="phoneNumber" onChange={this.handleChangeValueInput} defaultValue={this.props.student.phoneNumber}></Input>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Tình Trạng" name="state" onChange={this.handleChangeValueInput} defaultValue={this.props.student.state}></Input>
                        </Form.Item>
                        <Form.Item>
                            {this.DropdownSelect()}
                        </Form.Item>
                            <Button type="primary" onClick={this.handleSaveClick}>Lưu</Button>
                </Form>
        )
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleChangeValueInput(e){
        if(e.target !== undefined) this.setState({
            [e.target.name]: e.target.value
        })
        console.log('a',e.target.value)
    }
    handlechangDate(defaultValue,dateString){
        this.setState({
            defaultValue: dateString
        })
        console.log('defaul',defaultValue);
    }
    /*thay doi gia tri radio group*/
    handleChangeRadioGroup(e){
        this.setState({
            value : e.target.value
        });
        // console.log(`asfasf`,e.target.value);
    }
    async handleGradeMenuClick(e) {
        let result = await StudyClassResponsitory.getStudyclassByGrade(e.key);
        this.setState(_ => ({
            gradeDropdownText: e.item.props.children,
            classDropdownText: "Chọn lớp",
            classes: result,
            classDropdownActive: true
        }));
    }
    handleClassMenuClick(e) {
        this.setState(_ => ({
            classDropdownText: e.item.props.children
        }));
    }
    handleSaveClick(e){
        //luu du lieu
        // this.props.handleSaveSucces();
        
        console.log('date',this.state.datePickerValue);
    }
}
export default Form.create()(UpdateStudent);
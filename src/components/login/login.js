import React, { Component } from 'react';
import { Form } from "react-bootstrap";
import { Navigate, Link } from 'react-router-dom';
import LongLogo from "../../images/long_logo/long_logo@2x.png";

//Conponents
import Constant from '../../util/constant_variables';
import WebServiceManager from '../../util/webservice_manager';
import MyStorage from '../../util/redux_storage';


//data={"id":"0000000001","passwd":"1234"}
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: '',
            passwd: '',
            loginSuccess: false,
        }
    }
    componentDidMount() {
        MyStorage.dispatch({type:"Logout"});
    }

    loginButtonClicked = (e) => {
        //e.preventDefault();
        if(this.state.loginID!='' && this.state.passwd!='') {
            this.callLoginAPI().then((response)=> {
                //e.preventDefault();
                console.log("login info = ",response);                
                
                if(response.userID!=0) {
                    MyStorage.dispatch({type:"Login",data:{userID:response.userID,passwd:this.state.passwd}});
                    //sessionStorage.setItem("passwd",this.state.passwd);
                    //this.setState({loginSuccess:true});
                }
                else {
                    MyStorage.dispatch({type:"Logout"});
                    e.preventDefault();
                    alert('아이디 또는 비밀번호가 틀립니다.');
                }                
            });
        }
        else {
            e.preventDefault();
            alert('아이디와 비밀번호는 필수입니다.');
        }
    }

    async callLoginAPI(){
        let manager = new WebServiceManager(Constant.serviceURL + "/Login", "post");
        manager.addFormData("data", { id: this.state.loginID, passwd: this.state.passwd });
        let response = await manager.start();
        if (response.ok)
            return response.json();
    }


    render() {
        return (
            //디자인

            <div className="login-component d-flex">

                <form>
                    <div className="background" style={{ paddingBottom: 50 }}>
                        <img
                        width={'100%'}
                            src={LongLogo}
                        />
                    </div>
                    <div className="background" >
                        <label>ID</label>
                        <Form.Control
                            type='text' value={this.state.loginID} onChange={(e) => this.setState({loginID:e.target.value})}
                        />
                    </div>
                    <div className="background" >
                        <label>Password</label>
                        <Form.Control
                            type='password' value={this.state.passwd} onChange={(e) => this.setState({passwd:e.target.value})}
                        />
                    </div>
                    <Link to="/UserInfo">
                        <div className="background" >
                            <button className="loginbutton w-100 sideColor" onClick={this.loginButtonClicked}>Login</button>
                        </div>
                    
                        </Link>
                    
                </form>
            </div>
        )
    }

}
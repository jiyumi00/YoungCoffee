import React,{Component} from "react";

import Template from "../templates/consists"
import UserInfo from "../components/user_manager/home_user_manager";
export default class UserInfoPage extends Component{
   render(){
    return(
        <Template>
            <UserInfo/>
        </Template>
    )
   }
}
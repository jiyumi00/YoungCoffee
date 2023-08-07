import React,{Component} from "react";

import Template from "../templates/consists"
import TaxInfo from "../components/tax_manager/home_tax_manager";
export default class TaxInfoPage extends Component{
   render(){
    return(
        <Template>
            <TaxInfo/>
        </Template>
    )
   }
}
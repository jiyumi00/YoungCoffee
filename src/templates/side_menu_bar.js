import React, { Component, Nav } from "react";
import { Link, NavLink, } from "react-router-dom";


import Constant from "../util/constant_variables";

export default class SideMenuBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectList: Constant.getSideMenus(),
        }
    }

    
    render() {
        return (

            <div className="menu-bar mainColor">
                {
                    this.state.selectList.map((item, index) =>
                        <div className='sidemenu' key={item.key}>
                            <NavLink to={item.href} className={({ isActive }) => isActive ? "sidemenu-active" : "sidemenu-inactive"}>
                                {item.icon} {item.name}
                            </NavLink>
                        </div>
                    )
                }
            </div>
        )
    }
}
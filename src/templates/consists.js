import React, {Component} from 'react';
import TopTemplate from './top';
import MenuTemplate from './side_menu_bar';
import '../styles/menu.css';
import '../styles/main_template.css';
export default class Template extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <TopTemplate/>
                <div>
                <MenuTemplate/>
                <div className="main">{this.props.children}</div>
                </div>
               
            </div>
        );
    }
}
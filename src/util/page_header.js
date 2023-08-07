import React, { Component } from "react";
import { Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';

import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

export default class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            startDate: null,
            endDate: null,
            date: 0,
        }
    }



    render() {
        console.log('searchText', this.state.searchText)
        return (
            <div>
                <Form>
                    <div className="search d-flex fleft" style={{ marginBottom: '15px' }}>
                        <Form.Control
                            onChange={(e) => {this.props.searchTextListener(e.target.value) }}
                            type="search"
                            placeholder="가맹점 명으로 검색해주세요."
                            aria-label="Search"
                            className="searchinput"
                        />
                        <button className="searchbutton sideColor"><SearchIcon /></button>
                    </div>
                </Form>
            </div>
        );
    }
}


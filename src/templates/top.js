import React, { Component, Navigate } from 'react';
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap';
// import '../css/TopPage.css';
import LongLogo from "./../images/long_logo/long_logo.png";

import { Link } from 'react-router-dom';
export default class TopTemplate extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
        window.location.href="/"
    }
  }
  render() {
    return (
      <div className="top">
        <Navbar bg="light" variant="light">
          <Navbar.Brand href='/UserInfo' style={{ marginLeft: '15px' }}>
            <img style={{ width: 150 }} src={LongLogo} /></Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink style={{ marginRight: '15px', color: '#BF0757' }} onClick={this.logout} >LOGOUT</NavLink>
          </Nav>
        </Navbar>
      </div>
    );
  }
}


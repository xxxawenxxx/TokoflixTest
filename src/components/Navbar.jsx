import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import './Navbar.css'



export default class CustomNavbar extends Component {



  performSearch(){

  }





  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
          <NavLink className="brand-home" exact to={"/"}>
          <img src="assets/logotokoflix.png" width="180" height="75"/>
              </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          <Nav pullRight>
          <input style={{
            fontSize: 24,
            display: 'block',
            width :'50%',
            marginLeft:'90px'
          }} placeholder="Search Movie Here"/>  
          <h2>
            {" "}
            <span className="text-light">Welcome</span> |{" "}
            <CurrencyFormat
              className="text-warning"
              value={localStorage.getItem("money")}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp."}
            />
          </h2>
          </Nav>
      </Navbar>
    )
  }
}
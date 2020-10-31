  import React from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse
  } from "shards-react";
  import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

  
export default class Navibar extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.toggleNavbar = this.toggleNavbar.bind(this);
  
      this.state = {
        dropdownOpen: false,
        collapseOpen: false
      };
    }
  
    toggleDropdown() {
      this.setState({
        ...this.state,
        ...{
          dropdownOpen: !this.state.dropdownOpen
        }
      });
    }
  
    toggleNavbar() {
      this.setState({
        ...this.state,
        ...{
          collapseOpen: !this.state.collapseOpen
        }
      });
    }
  
    render() {
      return (
        <Navbar type="dark" theme="dark" expand="md" >
          <NavbarBrand href="/">JS úlohy</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
  
          <Collapse open={this.state.collapseOpen} navbar>
            <Nav navbar>
          
              <NavItem>
                <NavLink href="/">
                  domů
                </NavLink>
              </NavItem>
              <Dropdown
                open={this.state.dropdownOpen}
                toggle={this.toggleDropdown}
              >
                <DropdownToggle nav caret>
                  účet
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>settings</DropdownItem>
                  <DropdownItem><Link to="/login">log in</Link></DropdownItem>
                  <DropdownItem><Link to="/singup">sing up</Link></DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Navbar>
      );
    }
  }
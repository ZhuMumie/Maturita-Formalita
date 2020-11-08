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
    Collapse,
    Button
  } from "shards-react";

  
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
        <div>
        <Navbar type="dark" theme="dark" expand="md" >
          <NavbarBrand href="/">JS úlohy</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
  
          <Collapse open={this.state.collapseOpen} navbar>
            <Nav navbar>
          
              <NavItem>
                <NavLink href="/home">
                  domů
                </NavLink>
              </NavItem>
              <NavItem>
                 <NavLink style={{cursor:"pointer"}} onClick={this.props.handleLogout}>
                  Odhlásit se
                </NavLink> 
                
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        
        </div>
      );
    }
  }
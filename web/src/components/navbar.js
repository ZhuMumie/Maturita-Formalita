import React from 'react';
import fire from './fire';
import {useHistory } from "react-router-dom";

import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Collapse, 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "shards-react";





  const handleLogout = () =>{
    
    window.location.reload();
    fire.auth().signOut();
  }

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
                <NavLink href="/">
                  domů
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/exercises">
                  úlohy
                </NavLink>
              </NavItem>
              
            </Nav>
            <Nav navbar className="ml-auto">
            <NavItem>
                 <NavLink style={{cursor:"pointer"}} onClick={handleLogout}>
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
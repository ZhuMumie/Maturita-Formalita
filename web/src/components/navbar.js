import React from 'react';
import fire from './fire';
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
              <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
              >
              <DropdownToggle nav caret>
                akce????  
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
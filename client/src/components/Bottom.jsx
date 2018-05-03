import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Bottom = () => (
  <Navbar className="navbar-fixed-bottom">
    <Nav>
      <NavItem>
        Thanks for reading!
      </NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem href="https://github.com/acdibble/article-store" target="_blank">
        Source
      </NavItem>
    </Nav>
  </Navbar>
);

export default Bottom;

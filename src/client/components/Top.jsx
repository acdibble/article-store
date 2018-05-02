import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

const { Header, Brand } = Navbar;

class Top extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <Navbar>
        <Header>
          <Brand>
            The Daily Article
          </Brand>
        </Header>
        <Nav pullRight>
          <NavItem>
            <Button>Add new article</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Top;

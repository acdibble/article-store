import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Modal } from 'react-bootstrap';

const { Header, Brand } = Navbar;

class Top extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
      <div>
        <Navbar>
          <Header>
            <Brand>
              The Daily Article
            </Brand>
          </Header>
          <Nav pullRight>
            <NavItem onClick={this.handleToggle}>
              Add new article
            </NavItem>
          </Nav>
        </Navbar>

        <Modal show={this.state.show} onHide={this.handleToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add new article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Body
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleToggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Top;

import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
} from 'react-bootstrap';

const { Header, Brand } = Navbar;

class Top extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  handleSubmit() {
    console.log('hi');
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

        <Modal show={true} onHide={this.handleToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add new article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Title" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Author
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Author" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Body
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="textarea" placeholder="Body" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Tags
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder={'Please separate tags only with commas, e.g. "news,austin,tech"'} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleToggle}>Close</Button>
            <Button onClick={this.handleSubmit} bsStyle="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Top;

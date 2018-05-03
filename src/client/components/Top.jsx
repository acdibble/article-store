import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  HelpBlock,
} from 'react-bootstrap';

import { createAndAddToState, fetchArticlesByTag, fetchAllArticles } from '../actions/articleActions';

const { Header, Brand } = Navbar;

class Top extends Component {
  static propTypes = {
    createAndAddToState: PropTypes.func.isRequired,
    fetchArticlesByTag: PropTypes.func.isRequired,
    fetchAllArticles: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      isDirty: false,
      title: '',
      author: '',
      body: '',
      tags: '',
      search: '',
    };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  async handleSubmit() {
    const { author, body, title, tags } = this.state;
    if (author && body && title) {
      await this.props.createAndAddToState({ author, body, title, tags: tags.replace(/\s/g, '') });
      this.setState({
        isDirty: false,
        author: '',
        body: '',
        title: '',
        tags: '',
      });
      this.handleToggle();
    } else {
      this.setState({ isDirty: true });
    }
  }

  handleChange({ target: { value, id } }) {
    this.setState({
      [id]: value,
    });
  }

  handleSearch() {
    const { search } = this.state;
    if (search) {
      this.props.fetchArticlesByTag(search);
    } else {
      this.props.fetchAllArticles();
    }
  }

  handleEnter({ keyCode }) {
    if (keyCode === 13) {
      this.handleSearch();
    }
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
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl
                id="search"
                value={this.state.search}
                onChange={this.handleChange}
                type="text"
                placeholder="Search by tag"
                onKeyUp={this.handleEnter}
              />
            </FormGroup>{' '}
            <Button onClick={this.handleSearch}>Submit</Button>
          </Navbar.Form>
        </Navbar>

        <Modal show={this.state.show} onHide={this.handleToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add new article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup validationState={!this.state.title && this.state.isDirty ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.title}
                    id="title"
                    type="text"
                    placeholder="Title"
                  />
                  <FormControl.Feedback />
                  {!this.state.title && this.state.isDirty && <HelpBlock>Required</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup validationState={!this.state.author && this.state.isDirty ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={2}>
                  Author
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.author}
                    id="author"
                    type="text"
                    placeholder="Author"
                  />
                  <FormControl.Feedback />
                  {!this.state.author && this.state.isDirty && <HelpBlock>Required</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup validationState={!this.state.body && this.state.isDirty ? 'error' : null}>
                <Col componentClass={ControlLabel} sm={2}>
                  Body
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.body}
                    id="body"
                    componentClass="textarea"
                    placeholder="Body"
                  />
                  <FormControl.Feedback />
                  {!this.state.body && this.state.isDirty && <HelpBlock>Required</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Tags
                </Col>
                <Col sm={10}>
                  <FormControl
                    onChange={this.handleChange}
                    value={this.state.tags}
                    id="tags"
                    type="text"
                    placeholder={'Please separate tags only with commas, e.g. "news,austin,tech"'}
                  />
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

export default connect(null, { createAndAddToState, fetchArticlesByTag, fetchAllArticles })(Top);

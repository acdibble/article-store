import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ListGroup,
  Modal,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  HelpBlock,
} from 'react-bootstrap';

import { fetchAllArticles, deleteAndRemoveFromState } from '../actions/articleActions';

class Main extends Component {
  static propTypes = {
    fetchAllArticles: PropTypes.func.isRequired,
    deleteAndRemoveFromState: PropTypes.func.isRequired,
    articles: PropTypes.objectOf(PropTypes.object),
  }

  static defaultProps = {
    articles: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      showDisplay: false,
      showEdit: false,
      title: '',
      author: '',
      body: '',
      tags: '',
    };

    props.fetchAllArticles();

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  handleToggle(e) {
    this.setState({
      showDisplay: !this.state.showDisplay,
      id: !e ? this.state.id : e.target.id,
    });
  }

  toggleEditModal() {
    const { title, author, body, tags } = this.props.articles[this.state.id];
    this.setState({
      showEdit: !this.state.showEdit,
      showDisplay: false,
      title,
      author,
      body,
      tags,
    });
  }

  async handleDelete() {
    await this.props.deleteAndRemoveFromState(this.state.id);
    this.setState({
      showDisplay: !this.state.showDisplay,
    });
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  render() {
    if (!this.props.articles) return (<div>Hello world.</div>);

    const { articles } = this.props;

    const currentArticle = articles[this.state.id];

    return (
      <div className="container">
        <ListGroup>
          {Object.keys(articles).map((_id) => {
            const a = articles[_id];
            return (
              <a
                href="#"
                className="list-group-item"
                key={_id}
                id={_id}
                onClick={this.handleToggle}
              >
                <h4 id={_id} className="list-group-item-heading">{a.title}</h4>
                <p id={_id} className="list-group-item-text">by {a.author}</p>
              </a>
            );
          })}
        </ListGroup>

        <Modal show={this.state.showDisplay} onHide={this.handleToggle}>
          <Modal.Header closeButton>
            <Modal.Title>{currentArticle ? currentArticle.title : 'null'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentArticle ? currentArticle.body : 'null'}
            <br />
            <br />
            <small>tags: {!currentArticle ? 'null' : currentArticle.tags ? currentArticle.tags.join(', ') : 'none' /* eslint-disable-line */}</small>
          </Modal.Body>
          <Modal.Footer>
            <Button className="pull-left" bsStyle="danger" onClick={this.handleDelete}>Delete article</Button>
            <Button className="pull-left" bsStyle="primary" onClick={this.toggleEditModal}>Edit article</Button>
            <Button onClick={this.handleToggle}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEdit} onHide={this.toggleEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit &quot;{currentArticle ? currentArticle.title : 'null'}&quot;</Modal.Title>
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
            <Button onClick={this.toggleEditModal}>Cancel</Button>
            <Button bsStyle="primary" onClick={() => console.log('hi')}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ articles }) => ({ articles });


export default connect(mapStateToProps, { fetchAllArticles, deleteAndRemoveFromState })(Main);

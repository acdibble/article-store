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
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import moment from 'moment';

import {
  fetchAllArticles,
  deleteAndRemoveFromState,
  editAndUpdateState,
} from '../actions/articleActions';

class Main extends Component {
  static propTypes = {
    fetchAllArticles: PropTypes.func.isRequired,
    editAndUpdateState: PropTypes.func.isRequired,
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
      showDisplayModal: false,
      showEditModal: false,
      title: '',
      author: '',
      body: '',
      tags: '',
    };

    props.fetchAllArticles();

    this.submitEdit = this.submitEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  handleToggle(e) {
    this.setState({
      showDisplayModal: !this.state.showDisplayModal,
      id: !e ? this.state.id : e.target.id,
    });
  }

  toggleEditModal() {
    const { title, author, body, tags } = this.props.articles[this.state.id];
    this.setState({
      showEditModal: !this.state.showEditModal,
      showDisplayModal: false,
      title,
      author,
      body,
      tags: tags.join(','),
    });
  }

  async handleDelete() {
    await this.props.deleteAndRemoveFromState(this.state.id);
    this.setState({
      showDisplayModal: !this.state.showDisplayModal,
    });
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  submitEdit() {
    const { id, title, author, body, tags } = this.state;
    if (id && title && author) {
      this.props.editAndUpdateState(id, { title, author, body, tags });
      this.setState({
        showEditModal: false,
      });
    }
  }

  render() {
    if (!this.props.articles) return (<div>Hello world.</div>);

    const { articles } = this.props;

    const currentArticle = articles[this.state.id];

    const confirmPopover = (
      <Popover id="popover-trigger-click-root-close" title="Are you sure?">
        <Button bsSize="small" bsStyle="danger" onClick={this.handleDelete}>Confirm</Button>
      </Popover>
    );

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
                <p id={_id} className="list-group-item-text">by {a.author} -- ({moment(a.date).fromNow()})</p>
              </a>
            );
          }).sort((a, b) => a.props.id < b.props.id)}
        </ListGroup>

        <Modal show={this.state.showDisplayModal} onHide={this.handleToggle}>
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
            <OverlayTrigger trigger="click" rootClose overlay={confirmPopover}>
              <Button className="pull-left" bsStyle="danger">Delete article</Button>
            </OverlayTrigger>
            <Button className="pull-left" bsStyle="primary" onClick={this.toggleEditModal}>Edit article</Button>
            <Button onClick={this.handleToggle}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEditModal} onHide={this.toggleEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup validationState={!this.state.title ? 'error' : null}>
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
                  {!this.state.title && <HelpBlock>Required</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup validationState={!this.state.author ? 'error' : null}>
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
                  {!this.state.author && <HelpBlock>Required</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup validationState={!this.state.body ? 'error' : null}>
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
                  {!this.state.body && <HelpBlock>Required</HelpBlock>}
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
            <Button bsStyle="primary" onClick={this.submitEdit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ articles }) => ({ articles });

const mapDispatchToProps = {
  fetchAllArticles,
  deleteAndRemoveFromState,
  editAndUpdateState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

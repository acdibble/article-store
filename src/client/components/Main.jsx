import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import { fetchAllArticles } from '../actions/articleActions';

class Main extends Component {
  static propTypes = {
    fetchAllArticles: PropTypes.func.isRequired,
    articles: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };

    props.fetchAllArticles();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    this.setState({
      show: !this.state.show,
      id: !e ? this.state.id : e.target.id,
    });
  }

  async handleDelete() {
    const { id } = this.state;
    await axios.delete(`/api/articles/${id}`);
    this.props.fetchAllArticles();
    this.setState({
      show: !this.state.show,
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

        <Modal show={this.state.show} onHide={this.handleToggle}>
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
            <Button onClick={this.handleToggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ articles }) => ({ articles: articles.articles });


export default connect(mapStateToProps, { fetchAllArticles })(Main);

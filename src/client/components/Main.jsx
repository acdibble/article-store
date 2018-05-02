import React, { Component } from 'react';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
      id: '',
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  async componentWillMount() {
    const { data } = await axios.get('/api/articles');
    this.setState({ articles: data });
  }

  handleToggle(e) {
    this.setState({
      show: !this.state.show,
      id: !e ? this.state.id : e.target.id,
    });
  }

  render() {
    if (!this.state.articles) return (<div>Hello world.</div>);

    const { articles } = this.state;

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
            <Modal.Title>{articles[this.state.id] ? articles[this.state.id].title : 'null'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {articles[this.state.id] ? articles[this.state.id].body : 'null'}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleToggle}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Main;

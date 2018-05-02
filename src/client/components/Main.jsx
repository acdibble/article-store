import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };
  }

  async componentWillMount() {
    const { data } = await axios.get('/api/articles');
    this.setState({ articles: data });
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
              <ListGroupItem
                key={_id}
                header={a.title}
                href="#"
              >
                by {a.author}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

export default Main;

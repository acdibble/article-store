import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  async componentWillMount() {
    const articles = await axios.get('/api/articles');
    this.setState({ articles });
  }

  render() {
    if (!this.state.articles) return (<div>Hello world.</div>);
    return (
      <div>
        {JSON.stringify(this.state.articles)}
      </div>
    );
  }
}

export default App;

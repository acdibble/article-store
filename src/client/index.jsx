import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './components/Main';
import Top from './components/Top';
import Bottom from './components/Bottom';

const App = () => (
  <div>
    <Top />
    <Main />
    <Bottom />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

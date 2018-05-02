import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './components/Main';
import Top from './components/Top';

const App = () => (
  <div>
    <Top />
    <Main />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));

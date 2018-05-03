import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './components/Main';
import Top from './components/Top';
import Bottom from './components/Bottom';

import reducers from './reducers';

const App = () => (
  <div>
    <Top />
    <Main />
    <Bottom />
  </div>
);

const store = applyMiddleware(promise)(createStore)(reducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));

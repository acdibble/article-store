import { combineReducers } from 'redux';
import articles from './articleReducers';

const rootReducer = combineReducers({
  articles,
});

export default rootReducer;

import { FETCH_ALL_ARTICLES } from '../actions/articleActions';

const articles = (state = { articles: null }, action) => {
  switch (action.type) {
    case FETCH_ALL_ARTICLES:
      return { articles: action.payload };
    default:
      return state;
  }
};

export default articles;

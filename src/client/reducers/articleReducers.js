import { FETCH_ALL_ARTICLES, CREATE_AND_ADD_TO_STATE } from '../actions/articleActions';

const articles = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_ARTICLES:
      return { ...payload };
    case CREATE_AND_ADD_TO_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default articles;

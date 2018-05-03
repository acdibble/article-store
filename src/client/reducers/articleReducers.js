import { FETCH_ALL_ARTICLES, CREATE_AND_ADD_TO_STATE } from '../actions/articleActions';

const articles = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_ARTICLES:
      return { ...action.payload };
    case CREATE_AND_ADD_TO_STATE:
      return { ...action.payload, ...state };
    default:
      return state;
  }
};

export default articles;

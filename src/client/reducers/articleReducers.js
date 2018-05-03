import { FETCH_ALL_ARTICLES, CREATE_AND_ADD_TO_STATE, DELETE_AND_REMOVE_FROM_STATE } from '../actions/articleActions';

const articles = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_ARTICLES:
      return { ...payload };
    case CREATE_AND_ADD_TO_STATE:
      return { ...state, ...payload };
    case DELETE_AND_REMOVE_FROM_STATE:
      console.log(payload)
      return state;
    default:
      return state;
  }
};

export default articles;

import {
  FETCH_ALL_ARTICLES,
  CREATE_AND_ADD_TO_STATE,
  DELETE_AND_REMOVE_FROM_STATE,
  EDIT_AND_UPDATE_STATE,
  FETCH_ARTICLES_BY_TAG,
} from '../actions/articleActions';

const articles = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_ARTICLES:
      return { ...payload };
    case CREATE_AND_ADD_TO_STATE:
      return { ...state, ...payload };
    case DELETE_AND_REMOVE_FROM_STATE: {
      const { [payload]: gone, ...rest } = state;
      return { ...rest };
    }
    case EDIT_AND_UPDATE_STATE:
      return { ...state, ...payload };
    case FETCH_ARTICLES_BY_TAG:
      return { ...payload };
    default:
      return state;
  }
};

export default articles;

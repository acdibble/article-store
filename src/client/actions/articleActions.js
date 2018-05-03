import axios from 'axios';

const FETCH_ALL_ARTICLES = 'FETCH_ALL_ARTICLES';
const CREATE_AND_ADD_TO_STATE = 'FETCH_NEW_ARTICLE';

const fetchAllArticles = async () => {
  const { data } = await axios.get('/api/articles');
  return {
    type: FETCH_ALL_ARTICLES,
    payload: data,
  };
};

const createAndAddToState = async (values) => {
  const { data } = await axios.post('/api/articles', values);
  return {
    type: CREATE_AND_ADD_TO_STATE,
    payload: data,
  };
};

export {
  FETCH_ALL_ARTICLES,
  fetchAllArticles,
  CREATE_AND_ADD_TO_STATE,
  createAndAddToState,
};

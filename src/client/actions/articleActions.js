import axios from 'axios';

const FETCH_ALL_ARTICLES = 'FETCH_ALL_ARTICLES';

const fetchAllArticles = async () => {
  const { data } = await axios.get('/api/articles');
  return {
    type: FETCH_ALL_ARTICLES,
    payload: data,
  };
};

export {
  FETCH_ALL_ARTICLES,
  fetchAllArticles,
};

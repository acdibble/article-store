import axios from 'axios';

const FETCH_ALL_ARTICLES = 'FETCH_ALL_ARTICLES';
const CREATE_AND_ADD_TO_STATE = 'CREATE_AND_ADD_TO_STATE';
const DELETE_AND_REMOVE_FROM_STATE = 'DELETE_AND_REMOVE_FROM_STATE';
const EDIT_AND_UPDATE_STATE = 'EDIT_AND_UPDATE_STATE';

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

const deleteAndRemoveFromState = async (id) => {
  const { data } = await axios.delete(`/api/articles/${id}`);
  return {
    type: DELETE_AND_REMOVE_FROM_STATE,
    payload: data,
  };
};

const editAndUpdateState = async (id, values) => {
  const { data } = await axios.put(`/api/articles/${id}`, values);
  return {
    type: EDIT_AND_UPDATE_STATE,
    payload: data,
  };
};

export {
  FETCH_ALL_ARTICLES,
  fetchAllArticles,
  CREATE_AND_ADD_TO_STATE,
  createAndAddToState,
  DELETE_AND_REMOVE_FROM_STATE,
  deleteAndRemoveFromState,
  EDIT_AND_UPDATE_STATE,
  editAndUpdateState,
};

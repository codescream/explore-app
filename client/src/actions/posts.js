import * as api from '../api';

// Action Creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    console.log(data);
    dispatch({ type: 'fetch_all', payload: data });
  } catch (error) {
    console.log(error.message);
  }
}
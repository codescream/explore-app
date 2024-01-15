import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import allStateReducer from './reducers/allState';
import userReducer from './reducers/user';

export default configureStore({
  reducer: {
    postsReducer,
    allStateReducer,
    userReducer
  }
});
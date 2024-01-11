import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';
import allStateReducer from './reducers/allState';

export default configureStore({
  reducer: {
    postsReducer,
    allStateReducer
  }
});
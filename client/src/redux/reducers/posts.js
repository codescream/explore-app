import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api';

export const fetch_all = createAsyncThunk('fetch_all', async () => {
  const { data } = await api.fetchPost();
  console.log(data);
  return data;
});

export const create_post = createAsyncThunk("create_post", async (post) => {
  const { data } = await api.createPost(post);
  console.log(data);
  return data;
});

export const update_post = createAsyncThunk('update_post', async (id, post) => {
  const { data } = await api.updatePost(id, post);
  console.log(data);
  return data;
});

const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoading: false,
    data: [],
    error: false
  },
  reducers: {
    fetch:  (state, action) => {
      // code operation
    },
    create: (state, action) => {
      // code operation
    }
  },
  extraReducers(builder) {
    builder.addCase(fetch_all.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetch_all.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(fetch_all.rejected, (state, action) => {
      state.error = true;
    })
    .addCase(create_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(create_post.fulfilled, (state, action) => {
      state.data.push(action.payload);
    })
    .addCase(create_post.rejected, (state, action) => {
      state.error = true;
    })
    .addCase(update_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(update_post.fulfilled, (state, action) => {
      state.data = state.data.map(post => post._id === action.payload._id ? action.payload : post);
    })
    .addCase(update_post.rejected, (state, action) => {
      state.error = true;
    })
  }
});

export const { fetch, create } = postReducer.actions;
export default postReducer.reducer;
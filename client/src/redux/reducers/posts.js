import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api';

export const fetch_all = createAsyncThunk('fetch_all', async () => {
  const { data } = await api.fetchPost();
  return data;
});

export const create_post = createAsyncThunk("create_post", async (post) => {
  const { data } = await api.createPost(post);
  return data;
});

export const update_post = createAsyncThunk("update_post", async (updateData) => {
  const { data } =  await api.updatePost(updateData.postId, updateData.postData);
  return data;
});

export const delete_post = createAsyncThunk("delete_post", async (id) => {
  const { data } = await api.deletePost(id);
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
    .addCase(delete_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(delete_post.fulfilled, (state, action) => {
      state.data = state.data.filter(post => post._id !== action.payload._id);
    })
    .addCase(delete_post.rejected, (state, action) => {
      state.error = true;
    })
  }
});

export const { fetch, create } = postReducer.actions;
export default postReducer.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiPost from '../../api/post';

export const fetch_all = createAsyncThunk('fetch_all', async () => {
  const { data } = await apiPost.fetchPost();
  return data;
});

export const create_post = createAsyncThunk("create_post", async (post) => {
  const { data } = await apiPost.createPost(post);
  return data;
});

export const like_post = createAsyncThunk("like_post", async (updateData) => {
  const { data } = await apiPost.likePost(updateData.postId, updateData.postData);
  return data;
});

export const update_post = createAsyncThunk("update_post", async (updateData) => {
  const { data } =  await apiPost.updatePost(updateData.postId, updateData.postData);
  return data;
});

export const delete_post = createAsyncThunk("delete_post", async (id) => {
  const { data } = await apiPost.deletePost(id);
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
    .addCase(like_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(like_post.fulfilled, (state, action) => {
      state.data = state.data.map(post => post._id === action.payload._id ? action.payload : post);
    })
    .addCase(like_post.rejected, (state, action) => {
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
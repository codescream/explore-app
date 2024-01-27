import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiPost from '../../api/post';

export const fetch_all = createAsyncThunk('fetch_all', async (page) => {
  try {
    const { data } = await apiPost.fetchPost(page);
    console.log(data);
    return data;
  }catch(err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});

export const create_post = createAsyncThunk("create_post", async (post) => {
  console.log(post);
  try {
    const { data } = await apiPost.createPost(post);
    return data;
  }catch(err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
  
});

export const searchPost = createAsyncThunk("searchPost", async (searchQuery) => {
  console.log(searchQuery);
  try {
    const { data } = await apiPost.searchPost(searchQuery);
    console.log(data);
    return data;
  }catch(err) {
    console.log(err);
    throw new Error(err.response.data.message);
  } 
});

export const like_post = createAsyncThunk("like_post", async (updateData) => {
  console.log(updateData);
  // const { data } = await apiPost.likePost(updateData.postId, updateData.postData);
  // console.log(data);
  // return data;  
  try {
    const { data } = await apiPost.likePost(updateData.postId, updateData.postData);
    return data;
  }catch(err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});

export const update_post = createAsyncThunk("update_post", async (updateData) => {
  try {
    const { data } =  await apiPost.updatePost(updateData.postId, updateData.postData);
    return data;
  }catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});

export const delete_post = createAsyncThunk("delete_post", async (id) => {
  try {
    const { data } = await apiPost.deletePost(id);
    return data;
  }catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
});

const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoading: false,
    data: [],
    page: 1,
    totalPages: 1,
    error: []
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
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.data = action.payload.posts;
    })
    .addCase(fetch_all.rejected, (state, action) => {
      state.error = action.error;
    })
    .addCase(create_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(create_post.fulfilled, (state, action) => {
      state.data.push(action.payload);
    })
    .addCase(create_post.rejected, (state, action) => {
      state.error = action.error;
    })
    .addCase(like_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(like_post.fulfilled, (state, action) => {
      state.data = state.data.map(post => post._id === action.payload._id ? action.payload : post);
    })
    .addCase(like_post.rejected, (state, action) => {
      state.error = action.error;
    })
    .addCase(update_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(update_post.fulfilled, (state, action) => {
      state.data = state.data.map(post => post._id === action.payload._id ? action.payload : post);
    })
    .addCase(update_post.rejected, (state, action) => {
      state.error = action.error;
    })
    .addCase(delete_post.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(delete_post.fulfilled, (state, action) => {
      console.log(state.data);
      state.data = state.data.filter(post => post._id !== action.payload._id);
    })
    .addCase(delete_post.rejected, (state, action) => {
      state.error = action.error;
    })
    .addCase(searchPost.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(searchPost.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(searchPost.rejected, (state, action) => {
      state.error = action.error;
    })
  }
});

export const { fetch, create } = postReducer.actions;
export default postReducer.reducer;
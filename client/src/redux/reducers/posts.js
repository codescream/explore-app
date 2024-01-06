import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api';

export const fetch_all = createAsyncThunk('fetch_all', async () => {
  const { data } = await api.fetchPost();
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
    fetch: async (state, action) => {
      try {
        const { data } = await api.fetchPost();
        console.log(data);
        state.data = data;
      } catch (error) {
        console.log(error.message);
      }
    },
    create: (state, action) => {

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
  }
});

export const { fetch, create } = postReducer.actions;
export default postReducer.reducer;
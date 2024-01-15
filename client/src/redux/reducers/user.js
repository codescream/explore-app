import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sign_in = createAsyncThunk('sign-in', async (token) => {
  const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`, {
      headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: 'application/json'
      }
  });
  
  // .then((result) => {
  //   return result.data;
  // }).catch((error) => {
  //   return error;
  // })

  return data;
});

const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  extraReducers(builder) {
    builder.addCase(sign_in.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(sign_in.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(sign_in.rejected, (state, action) => {
      state.error = true;
    })
  }
});

export default userReducer.reducer;

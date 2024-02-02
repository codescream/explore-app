import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apiAuth from "../../api/auth";
import * as apiUser from '../../api/user';

// export const sign_in_google = createAsyncThunk('sign-in-google', async (token) => {
//   const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`, {
//       headers: {
//           Authorization: `Bearer ${token.access_token}`,
//           Accept: 'application/json'
//       }
//   });
  
//   // .then((result) => {
//   //   return result.data;
//   // }).catch((error) => {
//   //   return error;
//   // })

//   console.log(data);

//   return {data, token:token.access_token};
// });

export const sign_in_google = createAsyncThunk('sign-in-google', async (code) => {
  const { data } = await apiAuth.authUser(code);

  return {data, token: data.id_token};
});

export const create_user = createAsyncThunk('create-user', async (newUser) => {
  const { data } = await apiUser.createUser(newUser);

  return data;
});

export const sign_in = createAsyncThunk('sign-in', async (user) => {
  const { data } = await apiUser.signIn(user);

  return data;
});

const userReducer = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    data: null,
    error: false,
  },
  reducers: {
    logout: (state, action) => {
      state.data = null;
    }
  },
  extraReducers(builder) {
    builder.addCase(sign_in_google.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(sign_in_google.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(sign_in_google.rejected, (state, action) => {
      state.error = true;
    })
    .addCase(create_user.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(create_user.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(create_user.rejected, (state, action) =>{
      state.error = true;
    })
    .addCase(sign_in.pending, (state, action) => {
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

export const { logout } = userReducer.actions;

export default userReducer.reducer;

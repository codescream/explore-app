import { createSlice } from "@reduxjs/toolkit";

const allState = createSlice({
  name: 'allState',
  initialState: {
    value: null
  },
  reducers: {
    post_id: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { post_id } = allState.actions;
export default allState.reducer;
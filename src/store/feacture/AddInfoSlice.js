import { createSlice } from '@reduxjs/toolkit';

export const AddInfoSlice = createSlice({
  name: 'AddInfo',
  initialState: [],
  reducers: {
    addDetails: (state, action) => {
      state.push(action.payload)
  },
}});

// this is for dispatch
export const { addDetails } = AddInfoSlice.actions;

// this is for configureStore
export default AddInfoSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    authModalOpen: false
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload; 
    },
  },
});

// Exporting actions
export const { setAuthModalOpen } = authModalSlice.actions;

// Exporting the reducer
export default authModalSlice.reducer;

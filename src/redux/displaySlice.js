import { createSlice } from "@reduxjs/toolkit";

export const displaySlice = createSlice({
  name: "displaySlice",
  initialState: {
    displayChangeName: "hidden",
    displayChangePassword: "hidden",
  },
  reducers: {
    // Change Name
    blockUpdateNameAction: (state) => {
      state.displayChangeName = "block";
    },
    hiddenUpdateNameAction: (state) => {
      state.displayChangeName = "hidden";
    },

    // Change password
    blockUpdatePasswordAction: (state) => {
      state.displayChangePassword = "block";
    },
    hiddenUpdatePasswordAction: (state) => {
      state.displayChangePassword = "hidden";
    },
  },
});

export const {
  blockUpdateNameAction,
  hiddenUpdateNameAction,

  blockUpdatePasswordAction,
  hiddenUpdatePasswordAction,
} = displaySlice.actions;

export default displaySlice.reducer;

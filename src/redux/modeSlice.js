import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: {
    mode: "light",
  },
  reducers: {
    lightMode: (state) => {
      state.mode = "light";
    },
    darkMode: (state) => {
      state.mode = "dark";
    },
  },
});

export const { lightMode, darkMode } = modeSlice.actions;

export default modeSlice.reducer;

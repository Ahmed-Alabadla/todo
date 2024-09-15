import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./modeSlice";
import displaySlice from "./displaySlice";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    displaySlice: displaySlice,
  },
});

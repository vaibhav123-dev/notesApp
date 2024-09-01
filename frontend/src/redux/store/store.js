import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import notesReducer from "../slices/noteSlice.js"

export default configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

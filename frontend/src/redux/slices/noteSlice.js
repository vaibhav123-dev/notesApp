import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSingleNote: (state, action) => {
      state.notes.push(action.payload);
    },
  },
});

export const { setNotes, setSingleNote } = noteSlice.actions;

export default noteSlice.reducer;

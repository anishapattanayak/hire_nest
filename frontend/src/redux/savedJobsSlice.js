import { createSlice } from "@reduxjs/toolkit";

// No manual localStorage needed — redux-persist handles persistence automatically

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: {
    bookmarked: [],
    savedForLater: [],
  },
  reducers: {
    toggleBookmark: (state, action) => {
      const job = action.payload;
      const index = state.bookmarked.findIndex((j) => j._id === job._id);
      if (index !== -1) {
        state.bookmarked.splice(index, 1);
      } else {
        state.bookmarked.push(job);
      }
    },
    toggleSaveForLater: (state, action) => {
      const job = action.payload;
      const index = state.savedForLater.findIndex((j) => j._id === job._id);
      if (index !== -1) {
        state.savedForLater.splice(index, 1);
      } else {
        state.savedForLater.push(job);
      }
    },
  },
});

export const { toggleBookmark, toggleSaveForLater } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
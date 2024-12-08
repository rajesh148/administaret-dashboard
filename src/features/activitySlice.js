import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    logs: [],
  },
  reducers: {
    addActivity: (state, action) => {
      const { timestamp, message } = action.payload;
      state.logs.push({ timestamp, message });
    },
    clearActivity: (state) => {
      state.logs = [];
    },
  },
});

export const { addActivity, clearActivity } = activitySlice.actions;
export default activitySlice.reducer;

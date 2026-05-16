import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    items: [],
    unreadCount: 0,
    loading: false,
  },
  reducers: {
    setNotifications: (state, action) => {
      state.items = action.payload || [];
      state.unreadCount = state.items.filter((n) => !n.isRead).length;
    },
    setNotificationLoading: (state, action) => {
      state.loading = action.payload;
    },
    markAllReadLocal: (state) => {
      state.items = state.items.map((n) => ({ ...n, isRead: true }));
      state.unreadCount = 0;
    },
  },
});

export const {
  setNotifications,
  setNotificationLoading,
  markAllReadLocal,
} = notificationSlice.actions;

export default notificationSlice.reducer;


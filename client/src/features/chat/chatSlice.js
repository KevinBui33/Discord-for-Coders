const { createSlice } = require("@reduxjs/toolkit");

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeView: "friends",
  },
  reducers: {
    setCurrentView: (state, action) => {
      const { view } = action.payload;
      state.activeView = view;
    },
  },
});

export const { setCurrentView } = chatSlice.actions;
export default chatSlice.reducer;

export const selectCurrentView = (state) => state.chat.activeView;

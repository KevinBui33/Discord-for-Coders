const { createSlice } = require("@reduxjs/toolkit");

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeView: "friends",
    privateMessage: { value: "l" },
  },
  reducers: {
    setCurrentView: (state, action) => {
      const { view } = action.payload;
      state.activeView = view;
    },
    changePMUser: (state, action) => {
      const { pmUser } = action.payload;
      state.privateMessage = pmUser;
    },
  },
});

export const { setCurrentView, changePMUser } = chatSlice.actions;
export default chatSlice.reducer;

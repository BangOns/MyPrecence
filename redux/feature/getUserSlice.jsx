import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLogin: {},
  date: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],
};
export const GetUsers = createAction("user/get", (data) => {
  return {
    payload: {
      user: data,
    },
  };
});
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state) {
      return state.date;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetUsers, (state, action) => {
      state.userLogin = action.payload.user;
    });
  },
});
export const { getUser } = UserSlice.actions;
export default UserSlice.reducer;

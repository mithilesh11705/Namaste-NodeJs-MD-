/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state, action) => {
      state = null;
      return state;
    },
  },
});

export  const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

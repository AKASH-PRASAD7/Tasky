"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  tasks: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload;
    },
    task: (state, action) => {
      state.tasks = [...action.payload];
    },
  },
});

export const { addUser, task } = userSlice.actions;

export default userSlice.reducer;

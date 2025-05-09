// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UsersSlice";
import listbooksReducer from "../Features/booksSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    listbooks: listbooksReducer, 
  },
});

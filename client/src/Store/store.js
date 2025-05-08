// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UsersSlice";
import booksReducer from "../Features/booksSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    books: booksReducer, 
  },
});

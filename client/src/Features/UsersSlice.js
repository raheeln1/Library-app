import {createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk }from '@reduxjs/toolkit';
import axios from "axios";

export const registerUser = createAsyncThunk(
    "users/registerUser", async (userData)=>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`, {
                name :userData.name,
                email : userData.email,
                password : userData.password,
            });
            console.log(response);
            const user = response.data.user;
            const msg = response.data.msg;
            return {user,msg};
        }
        catch (error){
            const msg = error.message;
            return {msg}
        }
    }
);
///login
export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
    try {
      //sends a POST request to the server along the request body object
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
        email: userData.email,
        password: userData.password,
      });
      console.log(response);
      const user = response.data.user;
      const msg = response.data.msg;//retrieve the response from the server
      return {user,msg}; //return the response from the server as payload to the thunk
    } catch (error) {
      
      const msg = error.response?.data?.msg
      return rejectWithValue({ msg })
      
    }
  }
);
export const logout = createAsyncThunk("users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
    const msg = response.data.msg
    console.log(msg)
  } catch (error) {}
});

const initialState = {
  user:null,
  status:null,
  msg:null,
  isLogin:false,
}


export const usersSlice = createSlice({
  name: "users", //name of the state
  initialState, // initial value of the state
  reducers: {},

  extraReducers: (builder)=>{
    builder
    .addCase(registerUser.pending, (state)=>{
      state.status = 'loading'
    })
    .addCase(registerUser.fulfilled, (state,action)=>{
      state.status = 'success';
      state.user = action.payload.user;
      state.msg = action.payload.msg;
    })
    .addCase(registerUser.rejected, (state)=>{
      state.status = 'rejected';
      state.msg = 'Unexpected error is occurred';
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
      state.msg = action.payload.msg;
    })
    .addCase(login.rejected, (state,action) => {
      state.isError = true;
      state.isLogin = false;
      state.user = null;
      state.msg = action.payload.msg;
    })
    .addCase(logout.pending, (state) => {
      state.status =  "loading"
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
      state.status = "success";
      state.user = null;
      state.msg = action.payload;
    })
    .addCase(logout.rejected, (state,action) => {
      state.status =  "rejected";
    })
  }
});

export default usersSlice.reducer;

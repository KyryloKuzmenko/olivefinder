import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../config/config";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// register user
export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(`${API_URL}/sign-up`, userData);
      const token = response.data.data.token;
      setAuthHeader(token);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }
);
// ==============================


// login user
export const signIn = createAsyncThunk(
  "auth/signin",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(`${API_URL}/sign-in`, userData);
      const token = response.data.data.token;
      setAuthHeader(token);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }
);
// ================================


// refresh

// ================================

// export const signIn = async (credentials) => {
//   return axios.post(`${API_URL}/sign-in`, credentials);
// };

// export const signUp = async (userData) => {
//   return axios.post(`${API_URL}/sign-up`, userData);
// };

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URL } from "../../config/config";

axios.defaults.withCredentials = true;

// register user
export const signUp = createAsyncThunk(
  "auth/signup",
  async (userData, thunkApi) => {
    try {
      const response = await axios.post(`${API_URL}/sign-up`, userData, {
        withCredentials: true, // ОБЯЗАТЕЛЬНО
      });
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
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
      const response = await axios.post(`${API_URL}/sign-in`, userData, {
        withCredentials: true, // ОБЯЗАТЕЛЬНО
      });
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  }
);
// ================================

// =====sign-out=====

export const signOut = createAsyncThunk(
  "auth/sign-out",
  async (_, thunkApi) => {
    try {
      await axios.post(
        `${API_URL}/sign-out`,
        {},
        {
          withCredentials: true, // ОБЯЗАТЕЛЬНО
        }
      );
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Logout failed. Try again"
      );
    }
  }
);

// ================================

// refresh

export const refresh = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true, // ОБЯЗАТЕЛЬНО
      });

      if (!response.data?.data?.user) {
        return thunkApi.rejectWithValue("Session expired, please login again.");
      }
      return response.data;
    } catch (error) {
      console.error("Refresh error:", error.response?.data || error.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Session expired, please login again."
      );
    }
  }
);

// ================================

// export const signIn = async (credentials) => {
//   return axios.post(`${API_URL}/sign-in`, credentials);
// };

// export const signUp = async (userData) => {
//   return axios.post(`${API_URL}/sign-up`, userData);
// };

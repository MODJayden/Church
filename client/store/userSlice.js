import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createMember = createAsyncThunk(
  "user/createMember",
  async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/member/create`,
        data
      );
      return response?.data;
    } catch (error) {
      console.log("Error ocurred", error);
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/check-auth", async (token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/member/check-auth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-control": "must-revalidate,proxy-revalidate,no-cache,no-store",
      },
    }
  );

  return res?.data;
});

export const loginMember = createAsyncThunk(
  "user/loginMember",
  async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/member/login`,
        data
      );
      return response?.data;
    } catch (error) {
      console.log("Error ocurred", error);
    }
  }
);

const logoutMember = () => {
  sessionStorage.removeItem("token");
};

const initialState = {
  user: null,
  token: null,
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      logoutMember();
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data;
      })
      .addCase(createMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.token = null;
      })
      .addCase(loginMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action?.payload?.data;
        state.token = action?.payload?.token;
        sessionStorage.setItem("token", JSON.stringify(action?.payload?.token));
      })
      .addCase(loginMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action?.payload?.data;
        state.token = action?.payload?.token;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sermons: [],
  isLoading: false,
  error: null,
};

export const getAllSermons = createAsyncThunk(
  "sermon/getAllSermons",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/sermon/get/sermons`
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching sermons:", error);
      return { error };
    }
  }
);

export const addSermon = createAsyncThunk(
  "sermon/addSermon",
  async (sermonData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/sermon/create/sermon`,
        sermonData
      );
      return response?.data;
    } catch (error) {
      console.error("Error adding sermon:", error);
      return { error };
    }
  }
);

export const updateSermon = createAsyncThunk(
  "sermon/updateSermon",
  async ({ id, sermonData }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/sermon/update/sermons/${id}`,
        sermonData
      );
      return response?.data;
    } catch (error) {
      console.error("Error updating sermon:", error);
      return { error };
    }
  }
);

export const deleteSermon = createAsyncThunk(
  "sermon/deleteSermon",
  async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/sermon/delete/sermons/${id}`
      );
      return id;
    } catch (error) {
      console.error("Error deleting sermon:", error);
      return { error };
    }
  }
);

const sermonSlice = createSlice({
  name: "sermon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSermons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSermons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sermons = action.payload?.data;
        state.error = null;
      })
      .addCase(getAllSermons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(addSermon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSermon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sermons = action.payload?.data;
        state.error = null;
      })
      .addCase(addSermon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(updateSermon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSermon.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sermons?.data?.findIndex(
          (sermon) => sermon.id === action.payload.id
        );
        if (index !== -1) {
          state.sermons[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateSermon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.data;
      })
      .addCase(deleteSermon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSermon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sermons = state.sermons.data.filter(
          (sermon) => sermon.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteSermon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});                        

export default sermonSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllActivities = createAsyncThunk(
  "activity/fetchAllActivities",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/activity/all`
    );
    return response?.data;
  }
);

export const fetchActivityById = createAsyncThunk(
  "activity/fetchActivityById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/activity/get/${id}`
    );
    return response?.data;
  }
);

export const createActivity = createAsyncThunk(
  "activity/createActivity",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/activity/create`,
      data
    );
    return response?.data;
  }
);

export const updateActivity = createAsyncThunk(
  "activity/updateActivity",
  async ({data,id}) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/activity/update/${id}`,
      {data}
    );
    return response?.data;
  }
);

export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/activity/delete/${id}`
    );
    return response?.data;
  }
);

const initialState = {
  activities: [],
  isLoading: false,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActivities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload?.data;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchActivityById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload?.data;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = [...state.activities, action.payload?.data];
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = state.activities.map((activity) => {
          if (activity._id === action.payload?.data._id) {
            return action.payload?.data;
          }
          return activity;
        });
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = state.activities.filter(
          (activity) => activity._id !== action.payload?.data._id
        );
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default activitySlice.reducer;

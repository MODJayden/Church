import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  announcements: [], // Changed state key
  isLoading: false,
  error: null,
};

export const getAllAnnouncements = createAsyncThunk( // Renamed thunk
  "announcement/getAllAnnouncements", // Changed type prefix
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/announcement/get/announcements` // Changed endpoint
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching announcements:", error); // Changed message
      return { error };
    }
  }
);

export const addAnnouncement = createAsyncThunk( // Renamed thunk
  "announcement/addAnnouncement", // Changed type prefix
  async (announcementData) => { // Changed parameter name for clarity
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/announcement/create/announcement`, // Changed endpoint
        announcementData
      );
      return response?.data;
    } catch (error) {
      console.error("Error adding announcement:", error); // Changed message
      return { error };
    }
  }
);

export const updateAnnouncement = createAsyncThunk( // Renamed thunk
  "announcement/updateAnnouncement", // Changed type prefix
  async ({ id, announcementData }) => { // Changed parameter name for clarity
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/announcement/update/announcements/${id}`, // Changed endpoint
        announcementData
      );
      return response?.data;
    } catch (error) {
      console.error("Error updating announcement:", error); // Changed message
      return { error };
    }
  }
);

export const deleteAnnouncement = createAsyncThunk( // Renamed thunk
  "announcement/deleteAnnouncement", // Changed type prefix
  async (id) => {
    try {
      // Make the DELETE request
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/announcement/delete/announcements/${id}` // Changed endpoint
      );
      // Return the id and potentially the response data if needed for confirmation
      return { id, data: response?.data }; // Return id and data
    } catch (error) {
      console.error("Error deleting announcement:", error); // Changed message
      // Rethrow or return a structured error object
      return { error: error.response?.data || error.message };
    }
  }
);


const announcementSlice = createSlice({
  name: "announcement", // Changed slice name
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Announcements
      .addCase(getAllAnnouncements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAnnouncements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.announcements = action.payload?.data; // Updated state key
        state.error = null;
      })
      .addCase(getAllAnnouncements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message; // Improved error handling
      })
      // Add Announcement
      .addCase(addAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the API returns the newly created announcement in action.payload.data
        if (action.payload?.data) {
           // Ensure announcements is an array before pushing
           if (!Array.isArray(state.announcements)) {
            state.announcements = [];
          }
          state.announcements.push(action.payload.data); // Add new announcement to the array
        }
        state.error = null;
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message; // Improved error handling
      })
      // Update Announcement
      .addCase(updateAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        // Assuming the API returns the updated announcement in action.payload.data
        if (action.payload?.data && Array.isArray(state.announcements)) {
          const index = state.announcements.findIndex(
            (announcement) => announcement._id === action.payload.data._id // Use _id from MongoDB
          );
          if (index !== -1) {
            state.announcements[index] = action.payload.data; // Update the announcement
          }
        }
        state.error = null;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message; // Improved error handling
      })
      // Delete Announcement
      .addCase(deleteAnnouncement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        // action.payload should contain the { id } of the deleted announcement
        if (action.payload?.id && Array.isArray(state.announcements)) {
          state.announcements = state.announcements.filter(
            (announcement) => announcement._id !== action.payload.id // Use _id and filter by returned id
          );
        }
        state.error = null;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || action.error.message; // Improved error handling
      });
  },
});

export default announcementSlice.reducer;
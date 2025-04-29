import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  merchandiseItems: [], // Changed from sermons
  isLoading: false,
  error: null,
};

export const getAllMerchandiseItems = createAsyncThunk( // Changed function name
  "merchandiseItem/getAllMerchandiseItems", // Changed slice/action name
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/merchandiseItem/get/merchandiseItems` // Changed API endpoint
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching merchandise items:", error); // Changed log message
      return { error };
    }
  }
);

export const addMerchandiseItem = createAsyncThunk( // Changed function name
  "merchandiseItem/addMerchandiseItem", // Changed slice/action name
  async (itemData) => { // Changed parameter name
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/merchandiseItem/create/merchandiseItem`, // Changed API endpoint
        itemData // Changed parameter name
      );
      return response?.data;
    } catch (error) {
      console.error("Error adding merchandise item:", error); // Changed log message
      return { error };
    }
  }
);

export const updateMerchandiseItem = createAsyncThunk( // Changed function name
  "merchandiseItem/updateMerchandiseItem", // Changed slice/action name
  async ({ id, itemData }) => { // Changed parameter name
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/merchandiseItem/update/merchandiseItems/${id}`, // Changed API endpoint
        itemData // Changed parameter name
      );
      return response?.data;
    } catch (error) {
      console.error("Error updating merchandise item:", error); // Changed log message
      return { error };
    }
  }
);

export const deleteMerchandiseItem = createAsyncThunk( // Changed function name
  "merchandiseItem/deleteMerchandiseItem", // Changed slice/action name
  async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/merchandiseItem/delete/merchandiseItems/${id}` // Changed API endpoint
      );
      return id;
    } catch (error) {
      console.error("Error deleting merchandise item:", error); // Changed log message
      return { error };
    }
  }
);

const merchandiseItemSlice = createSlice({ // Changed slice name
  name: "merchandiseItem", // Changed slice name
  initialState,
  reducers: {
    setMerchandiseItems: (state, action) => { // Changed reducer name
      state.merchandiseItems = action.payload; // Changed state property
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMerchandiseItems.pending, (state) => { // Changed action type
        state.isLoading = true;
      })
      .addCase(getAllMerchandiseItems.fulfilled, (state, action) => { // Changed action type
        state.isLoading = false;
        state.merchandiseItems = action.payload?.data; // Changed state property
        state.error = null;
      })
      .addCase(getAllMerchandiseItems.rejected, (state, action) => { // Changed action type
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(addMerchandiseItem.pending, (state) => { // Changed action type
        state.isLoading = true;
      })
      .addCase(addMerchandiseItem.fulfilled, (state, action) => { // Changed action type
        state.isLoading = false;
        // Assuming the API returns the updated list or the new item
        // If it returns the new item, you might push it: state.merchandiseItems.push(action.payload.data);
        // If it returns the full list:
        state.merchandiseItems = action.payload?.data; // Changed state property
        state.error = null;
      })
      .addCase(addMerchandiseItem.rejected, (state, action) => { // Changed action type
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(updateMerchandiseItem.pending, (state) => { // Changed action type
        state.isLoading = true;
      })
      .addCase(updateMerchandiseItem.fulfilled, (state, action) => { // Changed action type
        state.isLoading = false;
        const index = state.merchandiseItems?.findIndex( // Changed state property and removed .data
          (item) => item.id === action.payload.id // Changed variable name
        );
        if (index !== -1) {
          state.merchandiseItems[index] = action.payload; // Changed state property
        }
        state.error = null;
      })
      .addCase(updateMerchandiseItem.rejected, (state, action) => { // Changed action type
        state.isLoading = false;
        state.error = action.payload?.data;
      })
      .addCase(deleteMerchandiseItem.pending, (state) => { // Changed action type
        state.isLoading = true;
      })
      .addCase(deleteMerchandiseItem.fulfilled, (state, action) => { // Changed action type
        state.isLoading = false;
        state.merchandiseItems = state.merchandiseItems.filter( // Changed state property and removed .data
          (item) => item.id !== action.payload // Changed variable name
        );
        state.error = null;
      })
      .addCase(deleteMerchandiseItem.rejected, (state, action) => { // Changed action type
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setMerchandiseItems, setIsLoading, setError } = merchandiseItemSlice.actions; // Exporting reducers

export default merchandiseItemSlice.reducer; // Changed export
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  loading: false,
  error: null,
};

export const fetchAllImages = createAsyncThunk(
  "serviceImage/fetchImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/serviceImage/getAll`
    );
    return response?.data;
  }
);
export const fetchImage = createAsyncThunk(
  "serviceImage/fetchImage",
  async (imageId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/serviceImage/get/${imageId}`
    );
    return response?.data;
  }
);
export const createImage = createAsyncThunk(
  "serviceImage/createImage",
  async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/serviceImage/create`,
      data
    );
    return response?.data;
  }
);


export const updateImage = createAsyncThunk(
  "serviceImage/updateImage",
  async (data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/serviceImage/update`,
      data
    );
    return response?.data;
  }
);

export const deleteImage = createAsyncThunk(
  "serviceImage/deleteImage",
  async (imageId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/serviceImage/delete/${imageId}`
    );
    return response?.data;
  }
);

const serviceImageSlice = createSlice({
  name: "serviceImage",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload?.data
      })
      .addCase(fetchAllImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload?.data;
      })
      .addCase(fetchImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload?.data;
      })
      .addCase(createImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});


export default serviceImageSlice.reducer;
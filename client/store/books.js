import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBooks = createAsyncThunk("books/getAllBooks", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/book/all/books`
    );
    return response?.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addBook = createAsyncThunk("books/addBook", async (bookData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/book/create`,
      bookData
    );
    return response?.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, bookData }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/book/update/${id}`,
        bookData
      );
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/book/delete/${id}`);
    return id;
  } catch (error) {
    return error.response.data;
  }
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    isLoading: false,
    error: null,
    currentBook: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload?.data;
        state.error = null;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(addBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload?.data;
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      })
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.books?.data?.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.data;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.data.filter(
          (book) => book.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default booksSlice.reducer;

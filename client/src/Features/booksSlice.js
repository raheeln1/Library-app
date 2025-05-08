import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('listbooks/fetchBooks', async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/listbooks`);
  return res.data;
});
export const deleteBook = createAsyncThunk('listbooks/deleteBook', async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/listbooks/${id}`);
  return id;
});

export const updateBookRating = createAsyncThunk(
  "listbooks/updateBookRating",
  async ({ bookId, newRating }) => {
    const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/listbooks/${bookId}`, {
      rating: newRating,
    });
    return res.data;
  }
);


export const createBook = createAsyncThunk(
  "listbooks/createBook",
  async (bookData, thunkAPI) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/listbooks`, bookData);
      console.log("Response from server:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error creating book:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



 export const booksSlice = createSlice({
  name: 'listbooks',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book._id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBookRating.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.books.findIndex((b) => b._id === updatedBook._id);
        if (index !== -1) {
          state.books[index] = updatedBook;
        }
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.status = 'BOOK IS ADDED';
        state.books.push(action.payload);
      });
      
      
      
      
      
  },
});

export const { addBook, editBook } = booksSlice.actions;

export default booksSlice.reducer;

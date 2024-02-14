import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  teachers: [],
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  'teacher/fetchTeacher',
  async () => {
    try {
      const res = await axios.get('http://localhost:3000/teachers');
      const data = await res.data;
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.loading = false;
      state.teachers = [];
      state.error = action.payload;
    });
  },
});

export const teacherReducer = teacherSlice.reducer;

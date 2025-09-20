import { createSlice } from '@reduxjs/toolkit'

import type { ErrorState } from '@/types/store/error-state.types';

import { v4 as uuidv4 } from 'uuid'

const initialState: ErrorState = {
  errors: []
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    addError: (state, action) => {
      state.errors.push({ errorId:  uuidv4(), errorMessage: action.payload });
    },
    clearError: (state, action) => {
      state.errors = state.errors.filter((error) => error.errorId !== action.payload)
    },
  }
})

const { addError, clearError } = errorSlice.actions;
export const actions = {
  addError,
  clearError,
};
export default errorSlice.reducer;

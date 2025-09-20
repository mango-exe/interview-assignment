import { createSlice } from '@reduxjs/toolkit'

import type { AuthState } from '../../types/store/auth-state.types';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  }
})

const { loginSuccess, logout } = authSlice.actions;
export const actions = {
  loginSuccess,
  logout,
};
export default authSlice.reducer;

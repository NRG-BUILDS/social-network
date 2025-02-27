import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  new: boolean;
  // Add other fields as necessary
}

interface AuthState {
  token?: string | null;
  refresh?: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refresh: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        refresh: string;
        user: User | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    updateToken: (
      state,
      action: PayloadAction<{ token: string; refresh: string }>
    ) => {
      state.token = action.payload.token;
      state.refresh = action.payload.refresh; // Update only the token
    },
  },
});

export const { login, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;

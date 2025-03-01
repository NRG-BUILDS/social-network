import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token?: string | null;
  refresh?: string | null;
  email?: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refresh: null,
  email: null,
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
        email: string;
        user: User | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.refresh = action.payload.refresh;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setUser: (
      state,
      action: PayloadAction<{
        user: User;
      }>
    ) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.refresh = null;
      state.email = null;
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

export const { login, setUser, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;

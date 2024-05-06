import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userType: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setUserType: (state, action: PayloadAction<string | null>) => {
      state.userType = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userType = null;
    },
  },
});

export const { setAccessToken, setRefreshToken, setUserType, logout } = authSlice.actions;

export default authSlice.reducer;

// tokenSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  refresh: string;
  access: string;
}
const tokenRefresh = sessionStorage.getItem("refreshToken");
const tokenAccess = sessionStorage.getItem("accessToken");
const initialState: TokenState = {
  refresh: tokenRefresh || "",
  access: tokenAccess || "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<TokenState>) {
      const { refresh, access } = action.payload;
      state.refresh = refresh;
      state.access = access;
      sessionStorage.setItem("refreshToken", refresh);
      sessionStorage.setItem("accessToken", access);
    },
    clearTokens(state) {
      state.refresh = "";
      state.access = "";
      sessionStorage.clear();
      localStorage.clear();
    },
  },
});

export const { setTokens, clearTokens } = tokenSlice.actions;
export default tokenSlice.reducer;

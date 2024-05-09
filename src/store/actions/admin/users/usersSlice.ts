// src/features/users/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersList } from "../../../../components/api/api";

export interface User {
  id: number;
  email: string;
  name: string;
  dateOfBirth: string;
  avatar: string;
  isBlocked: boolean;
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
  loading: false,
};

export const fetchUsers = createAsyncThunk(
  "partners/fetchPartner",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchUsersList();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default usersSlice.reducer;

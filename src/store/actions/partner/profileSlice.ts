import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMe, fetchMeEdit } from "../../../components/api/api";

interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  role: string;
  max_establishments: number;
  phone_number: string | null;
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMe();
      return response;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch profile");
    }
  },
);

// Добавление асинхронного thunk для редактирования профиля
export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (data: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const response = await fetchMeEdit(data);
      return response;
    } catch (error: any) {
      return rejectWithValue("Failed to edit profile");
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;

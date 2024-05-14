import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addItemMenu, fetchMenu } from "../../../components/api/api";

interface MenuItem {
  id?: number;
  name: string;
  price: number;
  description: string;
  availability_status?: boolean;
  category: string;
  establishment?: string;
}

export const getMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMenu();
      return response;
    } catch (error: any) {
      return rejectWithValue("Failed to fetch profile");
    }
  },
);

export const addItem = createAsyncThunk(
  "menu/addMenuItem",
  async (formData: MenuItem, { rejectWithValue }) => {
    try {
      const response = await addItemMenu(formData);
      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [] as MenuItem[],
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(getMenu.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default menuSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addItemMenu, deleteMenuId, fetchMenu } from "../../../components/api/api";

interface Menu {
  id?: number;
  name: string;
  price: number;
  description: string;
  availability_status?: boolean;
  category: string;
  establishment?: string;
}

interface MenuItem {
  items: Menu[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  correctMenuId: Menu | null,
  error: string | null;
}

const initialState: MenuItem = {
  items: [],
  correctMenuId: null,
  status: "idle",
  error: null,
  loading: false,
};

export const deleteMenuItem = createAsyncThunk(
  "menu/deleteMenuItem",
  async (menuId: number, { getState, rejectWithValue }) => {
    try {
      const response = await deleteMenuId(menuId);
      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }
      return menuId;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);

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
  async (formData: Menu, { rejectWithValue }) => {
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
  initialState,
  reducers: {
    setCorrectMenuId: (state, action) => {
      state.correctMenuId = action.payload;
    },
  },
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
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload); // Удаляем элемент из списка
        state.status = "succeeded";
      })
      .addCase(deleteMenuItem.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default menuSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addItemMenu, deleteMenuId, editMenuId, fetchMenu } from "../../../components/api/api";

interface Menu {
  id?: number;
  name: string;
  price: number;
  description: string;
  availability_status?: boolean;
  category: string;
  establishment?: number;
}

interface MenuItem {
  items: Menu[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  correctMenuId: number | null,
  error: string | null;
}

const initialState: MenuItem = {
  items: [],
  correctMenuId: null,
  status: "idle",
  error: null,
  loading: false,
};

const id = localStorage.getItem("establishmentId");
const numericId = Number(id);

export const getMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMenu(numericId);
      return await response;
    } catch (error: any) {
      return rejectWithValue((error.response?.data?.message || "Неизвестная ошибка") as string);
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
      console.log("Add Item Response:", response);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);

export const updateItem = createAsyncThunk(
  "menu/updateMenuItem",
  async ({ id, data }: { id: number; data: Menu }, { rejectWithValue }) => {
    try {
      const response = await editMenuId(id, data);
      // if (!response.ok) {
      //   throw new Error("Failed to update menu item");
      // }
      // console.log("Update Item Response:", response);
      return await response;
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
        console.log("Fetching menu...");
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
        console.log("Menu fetched:", action.payload);
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        console.log("Fetch menu failed:", action.payload);
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        console.log("Adding item...");
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        console.log("Item added:", action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        console.log("Add item failed:", action.payload);
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        console.log("Updating item...");
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
        console.log("Item updated:", action.payload);
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        console.log("Update item failed:", action.payload);
      });
  },

});

export const { setCorrectMenuId } = menuSlice.actions;

export default menuSlice.reducer;
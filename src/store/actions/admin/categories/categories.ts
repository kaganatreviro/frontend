import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "../../../../components/api/api";

export interface Category {
  id: number;
  name: string;
  beverages: string[];
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false,
  status: "idle",
};

export const fetchCategoriesList = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategories();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoriesList.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
        },
      )
      .addCase(fetchCategoriesList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default categoriesSlice.reducer;

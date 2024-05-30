import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAnswersList } from "../../../../components/api/api";

export interface Answer {
  id: number;
  feedback: number;
  user: string;
  display_user: string;
  created_at: string;
  text: string;
  user_role: string;
}

interface AnswersState {
  answers: Answer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}

const initialState: AnswersState = {
  answers: [],
  status: "idle",
  error: null,
  loading: false,
};

export const fetchAnswers = createAsyncThunk(
  "answers/fetchAnswers",
  async (feedbackId: number, { rejectWithValue }) => {
    try {
      const data = await fetchAnswersList(feedbackId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnswers.fulfilled, (state, action: PayloadAction<Answer[]>) => {
        state.status = "succeeded";
        state.answers = action.payload;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default answersSlice.reducer;

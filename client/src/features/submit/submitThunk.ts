import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SubmitState } from "./types";

const initialState: SubmitState = {
  loading: false,
  responseMessage: "",
  error: null,
};

export const submitSelectedOption = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("submit/submitSelectedOption", async (value, { rejectWithValue }) => {
  try {
    const res = await fetch("/selected/option", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });

    const data = await res.json();

    if (!data?.message) {
      return rejectWithValue("Неверный ответ сервера");
    }

    return data.message;
  } catch {
    return rejectWithValue("Ошибка при отправке данных на сервер");
  }
});

export const submitSlice = createSlice({
  name: "submit",
  initialState,
  reducers: {
    clearMessage(state) {
      state.responseMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSelectedOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSelectedOption.fulfilled, (state, action) => {
        state.loading = false;
        state.responseMessage = action.payload;
      })
      .addCase(submitSelectedOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { clearMessage } = submitSlice.actions;
export const submitReducer = submitSlice.reducer;

export const selectSubmitMessage = (state: RootState) =>
  state.submit.responseMessage;
export const selectSubmitError = (state: RootState) => state.submit.error;
export const selectSubmitLoading = (state: RootState) => state.submit.loading;

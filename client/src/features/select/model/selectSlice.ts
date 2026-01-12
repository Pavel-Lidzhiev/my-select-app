import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Option } from "../../../entities/option/option.types";
import { SelectState } from "./types";

const initialState: SelectState = {
  options: [],
  loading: false,
  error: null,
  selectedValue: null,
};

export const fetchOptions = createAsyncThunk<
  Option[],
  void,
  { rejectValue: string }
>("select/fetchOptions", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/options/for/select");

    const data = await res.json();

    if (!Array.isArray(data)) {
      return rejectWithValue("Неверный формат данных с сервера");
    }

    return data.filter(
      (opt): opt is Option =>
        typeof opt?.name === "string" && typeof opt?.value === "string"
    );
  } catch {
    return rejectWithValue("Ошибка при загрузке опций");
  }
});

export const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelectedValue(state, action: PayloadAction<string>) {
      state.selectedValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedValue } = selectSlice.actions;
export default selectSlice.reducer;

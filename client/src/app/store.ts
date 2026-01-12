import { configureStore } from "@reduxjs/toolkit";
import selectReducer from "../features/select/model/selectSlice";
import { submitReducer } from "../features/submit/submitThunk";

export const store = configureStore({
  reducer: {
    select: selectReducer,
    submit: submitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

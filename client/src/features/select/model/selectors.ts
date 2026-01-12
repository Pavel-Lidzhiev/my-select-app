import { RootState } from "../../../app/store";

export const selectOptions = (state: RootState) => state.select.options;
export const selectLoading = (state: RootState) => state.select.loading;
export const selectError = (state: RootState) => state.select.error;
export const selectValue = (state: RootState) => state.select.selectedValue;

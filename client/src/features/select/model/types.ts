import { Option } from "../../../entities/option/option.types";

export interface SelectState {
  options: Option[];
  loading: boolean;
  error: string | null;
  selectedValue: string | null;
}

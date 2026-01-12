import { Option } from "../../../entities/option/option.types";

export interface VirtualizedOptionsListProps {
  options: Option[];
  highlightedIndex: number | null;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  optionHeight?: number;
  visibleHeight?: number;
  openUpwards?: boolean;
}

export interface SelectOptionProps {
  option: Option;
  isKeyboardHighlighted: boolean;
  isSelected: boolean;
  onClick: (value: string) => void;
}

import {
  isEnter,
  isEscape,
  isArrowUp,
  isArrowDown,
} from "../../shared/utils/keyboard";
import { UseSelectKeyboardParams } from "./types";

export const useSelectKeyboard = ({
  isOpen,
  isLoading,
  filter,
  selectedValue,
  filteredOptions,
  highlightedIndex,
  setIsOpen,
  setHighlightedIndex,
  onSelect,
  clearSelected,
}: UseSelectKeyboardParams) => {
  return (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (isEnter(e) && !isLoading) {
        setIsOpen(true);
      }
      return;
    }

    if (isArrowDown(e)) {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, filteredOptions.length - 1)
      );
    }

    if (isArrowUp(e)) {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null ? filteredOptions.length - 1 : Math.max(prev - 1, 0)
      );
    }

    if (isEnter(e)) {
      e.preventDefault();
      if (highlightedIndex !== null) {
        onSelect(filteredOptions[highlightedIndex]?.value);
      }
    }

    if (isEscape(e)) {
      setIsOpen(false);
    }

    if (e.key === "Backspace" && filter === "" && selectedValue) {
      e.preventDefault();
      clearSelected();
    }
  };
};

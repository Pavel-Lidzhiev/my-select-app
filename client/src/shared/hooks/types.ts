export interface UseSelectKeyboardParams {
  isOpen: boolean;
  isLoading: boolean;
  filter: string;
  selectedValue: string | null;
  filteredOptions: { value: string }[];
  highlightedIndex: number | null;
  setIsOpen: (v: boolean) => void;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onSelect: (value: string) => void;
  clearSelected: () => void;
}

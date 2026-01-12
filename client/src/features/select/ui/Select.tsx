import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useOutsideClick } from "../../../shared/hooks/useOutsideClick";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/useAppHooks";
import { fetchOptions, setSelectedValue } from "../model/selectSlice";
import { selectOptions, selectValue, selectLoading } from "../model/selectors";
import "./Select.css";
import { VirtualizedOptionsList } from "./VirtualizedOptionsList";
import { useSelectKeyboard } from "../../../shared/hooks/useSelectKeyboard";

export const Select = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(selectOptions) || [];
  const selectedValue = useAppSelector(selectValue);
  const isLoading = useAppSelector(selectLoading);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [openUpwards, setOpenUpwards] = useState(false);
  const hasClearedSelectedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setIsOpen(false));

  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpwards(spaceBelow < 250 && spaceAbove > spaceBelow);
    }

    if (!isOpen) {
      setHighlightedIndex(null);
    }
  }, [isOpen]);

  const filteredOptions = useMemo(
    () => options.filter((opt) => opt.name.startsWith(filter)),
    [options, filter]
  );

  const handleSelect = useCallback(
    (value: string) => {
      if (!value) return;

      dispatch(setSelectedValue(value));
      setFilter(value);
      setIsOpen(false);
      hasClearedSelectedRef.current = false;
    },
    [dispatch]
  );

  const handleKeyDown = useSelectKeyboard({
    isOpen,
    isLoading,
    filter,
    selectedValue,
    filteredOptions,
    highlightedIndex,
    setIsOpen,
    setHighlightedIndex,
    onSelect: handleSelect,
    clearSelected: () => {
      dispatch(setSelectedValue(""));
      setFilter("");
      setIsOpen(false);
    },
  });

  const inputValue = filter;
  const placeholder = isLoading ? "Загрузка данных" : "Выберите опцию";

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`select-container ${isOpen ? "open" : ""}`}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (isLoading) return;
        setIsOpen(true);
      }}
      onBlur={(e) => {
        const newFocusTarget = e.relatedTarget as HTMLElement | null;
        if (!containerRef.current?.contains(newFocusTarget)) {
          setIsOpen(false);
          setHighlightedIndex(null);
        }
      }}
    >
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          if (isLoading) return;

          const value = e.target.value;

          if (
            selectedValue &&
            !hasClearedSelectedRef.current &&
            value !== selectedValue
          ) {
            dispatch(setSelectedValue(""));
            hasClearedSelectedRef.current = true;
          }

          setFilter(value);
          setHighlightedIndex(null);
          setIsOpen(true);
        }}
        className="select-input"
      />

      {selectedValue && (
        <span
          className="select-clear"
          onClick={(e) => {
            e.stopPropagation();
            setFilter("");
            dispatch(setSelectedValue(""));
            setIsOpen(false);
          }}
        >
          ✕
        </span>
      )}

      <span
        className="select-toggle"
        onClick={(e) => {
          e.stopPropagation();
          if (isLoading) return;
          setIsOpen((prev) => !prev);
        }}
      >
        ▼
      </span>

      {isOpen && filteredOptions.length > 0 && (
        <VirtualizedOptionsList
          openUpwards={openUpwards}
          options={filteredOptions}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
          selectedValue={selectedValue}
          optionHeight={27}
          visibleHeight={Math.min(filteredOptions.length * 27, 250)}
        />
      )}
    </div>
  );
};

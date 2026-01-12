import {
  useRef,
  useState,
  useEffect,
  UIEvent,
  memo,
  useCallback,
  useMemo,
} from "react";
import { SelectOption } from "./SelectOption";
import { VirtualizedOptionsListProps } from "./types";

export const VirtualizedOptionsList = memo(
  ({
    options,
    highlightedIndex,
    selectedValue,
    onSelect,
    optionHeight = 27,
    visibleHeight = 250,
    openUpwards,
  }: VirtualizedOptionsListProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const listHeight = Math.min(options.length * optionHeight, visibleHeight);

    const startIndex = Math.max(Math.floor(scrollTop / optionHeight) - 5, 0);
    const endIndex = Math.min(
      Math.ceil((scrollTop + listHeight) / optionHeight) + 5,
      options.length
    );

    const visibleOptions = useMemo(
      () => options.slice(startIndex, endIndex),
      [options, startIndex, endIndex]
    );

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    };

    useEffect(() => {
      if (highlightedIndex !== null && containerRef.current && options.length) {
        const container = containerRef.current;
        const offsetTop = highlightedIndex * optionHeight;
        const offsetBottom = offsetTop + optionHeight;

        if (offsetTop < container.scrollTop) {
          container.scrollTop = offsetTop;
        } else if (offsetBottom > container.scrollTop + listHeight) {
          container.scrollTop = offsetBottom - listHeight;
        }
      }
    }, [highlightedIndex, optionHeight, listHeight, options.length]);

    const handleClick = useCallback(
      (value: string) => () => onSelect(value),
      [onSelect]
    );

    return (
      <div
        ref={containerRef}
        className={`select-options ${openUpwards ? "upwards" : "downwards"}`}
        style={{
          height: listHeight,
          overflowY:
            options.length * optionHeight > visibleHeight ? "auto" : "hidden",
        }}
        onScroll={handleScroll}
      >
        <div
          style={{
            height: options.length * optionHeight,
            position: "relative",
          }}
        >
          {visibleOptions.map((opt, idx) => {
            const realIndex = startIndex + idx;
            return (
              <div
                key={opt.value}
                style={{
                  position: "absolute",
                  top: realIndex * optionHeight,
                  left: 0,
                  right: 0,
                }}
              >
                <SelectOption
                  option={opt}
                  isKeyboardHighlighted={realIndex === highlightedIndex}
                  isSelected={opt.value === selectedValue}
                  onClick={handleClick(opt.value)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

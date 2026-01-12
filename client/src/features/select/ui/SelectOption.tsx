import React, { memo } from "react";
import "./SelectOption.css";
import { SelectOptionProps } from "./types";

export const SelectOption = memo(
  ({
    option,
    isKeyboardHighlighted,
    isSelected,
    onClick,
  }: SelectOptionProps) => {
    const classNames = ["select-option"];

    if (isKeyboardHighlighted) classNames.push("keyboard-highlighted");
    if (isSelected) classNames.push("selected");

    return (
      <div
        className={classNames.join(" ")}
        onClick={(e) => {
          e.stopPropagation();
          onClick(option.value);
        }}
      >
        {option.name}
      </div>
    );
  }
);

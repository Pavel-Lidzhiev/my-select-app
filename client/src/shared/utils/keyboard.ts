export const KEY = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  TAB: "Tab",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  BACKSPACE: "Backspace",
  DELETE: "Delete",
};

export const isEnter = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.ENTER;
export const isEscape = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.ESCAPE;
export const isTab = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.TAB;
export const isArrowUp = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.ARROW_UP;
export const isArrowDown = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.ARROW_DOWN;
export const isBackspace = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.BACKSPACE;
export const isDelete = (e: KeyboardEvent | React.KeyboardEvent) =>
  e.key === KEY.DELETE;

export const preventDefaultFor = (
  e: KeyboardEvent | React.KeyboardEvent,
  key: string
) => {
  if (e.key === key) e.preventDefault();
};

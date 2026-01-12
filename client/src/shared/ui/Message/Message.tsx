import React from "react";
import "./Message.css";
import { MessageProps } from "./types";

export const Message: React.FC<MessageProps> = ({ text }) => {
  return <div className="message">{text}</div>;
};

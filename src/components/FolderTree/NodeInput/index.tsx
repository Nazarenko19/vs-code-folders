import { FC, FocusEvent, KeyboardEvent } from "react";
import { Input } from "antd";

import { INodeProps } from "../interfaces";

export const NodeInput: FC<INodeProps> = ({ node }) => {
  const handleBlur = () => node.reset();
  const handleFocus = (event: FocusEvent<HTMLInputElement, Element>) =>
    event.currentTarget.select();
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Escape":
        node.reset();
        break;
      case "Enter":
        node.submit(event.currentTarget.value);
        break;

      default:
        break;
    }
  };

  return (
    <Input
      autoFocus
      size="small"
      name="name"
      type="text"
      defaultValue={node.data.name}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

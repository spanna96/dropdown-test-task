import React from "react";
import { OptionType } from "../../../types";

import "./SingleOption.styles.css";

interface Props {
  onClick?: () => void;
  isSelected: boolean;
  option: OptionType;
}

function SingleOption({ option, isSelected, onClick }: Props) {
  const { name, description } = option;

  return (
    <li
      className={`SingleOption ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span className="name">{name}</span>
      <span className="description">{description}</span>
    </li>
  );
}

export default SingleOption;

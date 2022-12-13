import React from "react";
import { OptionType } from "../../../types";

import "./SelectedValue.styles.css";

interface Props {
  onClickDelete: () => void;
  value: OptionType;
}

function SelectedValue({ value, onClickDelete }: Props) {
  return (
    <span className="SelectedValue">
      {value.name}
      <i className="SelectedValue-icon" onClick={onClickDelete}>
        <img src="/icons/close-icon.svg" alt="X" />
      </i>
    </span>
  );
}

export default SelectedValue;

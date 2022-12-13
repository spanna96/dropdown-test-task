import React, { useState, useEffect } from "react";
import { SelectedValue } from "./SelectedValue";
import { SingleOption } from "./SingleOption";
import { OptionType } from "../../types";

import "./MultiSelectDropdown.styles.css";

interface Props {
  onChange?: (options: OptionType[]) => void;
  options: OptionType[];
  placeholder?: string;
  initialValues?: OptionType[];
}

function MultiSelectDropdown({
  onChange = () => {},
  options = [],
  placeholder = "",
  initialValues = [],
}: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);
  const [toggleOptionsList, setToggleOptionsList] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] =
    useState<OptionType[]>(initialValues);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (inputValue.trim()) {
      filterOptionsByInput(inputValue);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isValueSelected = (option: OptionType) => {
    return selectedValues.filter((value) => value.id === option.id).length > 0;
  };

  const onRemoveSelectedOption = (option: OptionType) => {
    const filteredList = selectedValues.filter(
      (value) => value.id !== option.id
    );

    onChange && onChange(filteredList);
    setSelectedValues(filteredList);
  };

  const onSelectItem = (option: OptionType) => {
    if (isValueSelected(option)) {
      onRemoveSelectedOption(option);

      return;
    }

    const newSelectedValues = [...selectedValues, option];

    onChange && onChange(newSelectedValues);
    setSelectedValues(newSelectedValues);
    closeOptionsList();
  };

  const filterOptionsByInput = (searchText: string) => {
    const searchResult = options.filter(
      ({ name, description }) =>
        matchValues(name, searchText) ||
        (description && matchValues(description, searchText))
    );

    setFilteredOptions(searchResult);
  };

  const matchValues = (value: string, search: string) => {
    return value.toLowerCase().indexOf(search.toLowerCase().trim()) > -1;
  };

  const openOptionsList = () => {
    setToggleOptionsList(true);
  };

  const closeOptionsList = () => {
    setToggleOptionsList(false);
    setInputValue("");
    setFilteredOptions(options);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeOptionsList();
    } else {
      if (inputValue.length === 1) {
        openOptionsList();
      }
    }
  };

  return (
    <div className="MultiSelectContainer">
      <div className="SearchWrapper" onBlur={closeOptionsList}>
        {selectedValues.map((value) => (
          <SelectedValue
            value={value}
            onClickDelete={() => onRemoveSelectedOption(value)}
            key={`${value.description}${value.id}`}
          />
        ))}

        <input
          type="text"
          className="SearchInput"
          onChange={onChangeHandler}
          onKeyUp={onKeyUp}
          value={inputValue}
          onClick={openOptionsList}
          placeholder={selectedValues.length ? "" : placeholder}
          autoComplete="off"
        />
      </div>
      <div
        className={`OptionListWrapper
         ${toggleOptionsList ? "visible" : "hidden"}
         `}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <ul>
          {filteredOptions.length === 0 && inputValue && (
            <span className="notFoundMessage">Nothing found</span>
          )}

          {filteredOptions.map((option) => {
            const { description, id } = option;
            const isSelected = isValueSelected(option);

            return (
              <SingleOption
                key={`${description}${id}`}
                option={option}
                onClick={() => onSelectItem(option)}
                isSelected={isSelected}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default MultiSelectDropdown;

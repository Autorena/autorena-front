import { useEffect, useState } from "react";
import styles from "./DropdownList.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowList.svg";
import { ReactComponent as Check } from "../../assets/check.svg";

type DropdownOption = {
  value: string;
  label: string;
};

type CommonDropdownProps = {
  options: DropdownOption[];
  buttonStyles?: React.CSSProperties;
  listStyles?: React.CSSProperties;
  className?: string;
  autoSelectFirst?: boolean;
};

type SingleSelectDropdownProps = CommonDropdownProps & {
  isMulti?: false;
  onSelect: (value: string) => void;
  value?: string;
};

type MultiSelectDropdownProps = CommonDropdownProps & {
  isMulti: true;
  onSelect: (value: string[]) => void;
  value?: string[];
};

type DropdownListProps = SingleSelectDropdownProps | MultiSelectDropdownProps;

export const DropdownList = (props: DropdownListProps) => {
  const {
    options,
    autoSelectFirst = false,
    onSelect,
    value,
    buttonStyles,
    listStyles,
    isMulti = false,
    className,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (autoSelectFirst && !value && options.length > 0) {
      if (isMulti) {
        (onSelect as (value: string[]) => void)([options[0].value]);
      } else {
        (onSelect as (value: string) => void)(options[0].value);
      }
    }
  }, [autoSelectFirst, value, options, onSelect, isMulti]);

  const selectedValues = isMulti
    ? (value as string[] | undefined) ?? []
    : value
    ? [value as string]
    : [];

  const handleSelect = (option: DropdownOption) => {
    if (isMulti) {
      const isSelected = selectedValues.includes(option.value);
      const newValues = isSelected
        ? selectedValues.filter((v) => v !== option.value)
        : [...selectedValues, option.value];
      (onSelect as (value: string[]) => void)(newValues);
    } else {
      (onSelect as (value: string) => void)(option.value);
      setIsOpen(false);
    }
  };

  const getButtonLabel = () => {
    if (isMulti) {
      const selectedLabels = options
        .filter((opt) => selectedValues.includes(opt.value))
        .map((opt) => opt.label);
      return selectedLabels.length > 0
        ? selectedLabels.join(", ")
        : "Выберите...";
    }

    if (!value) {
      return autoSelectFirst && options.length > 0
        ? options[0].label
        : "Выберите...";
    }

    return options.find((opt) => opt.value === value)?.label || "Выберите...";
  };

  return (
    <div className={`${styles.dropdownList} ${className ? className : ""}`}>
      <button
        type="button"
        className={styles.dropdownList_title}
        onClick={() => setIsOpen((prev) => !prev)}
        style={buttonStyles}
      >
        {getButtonLabel()}
        <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </button>

      {isOpen && (
        <ul className={styles.dropdownList_items} style={listStyles}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.dropdownList_item}
              onClick={() => handleSelect(option)}
            >
              {selectedValues.includes(option.value) && <Check />}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

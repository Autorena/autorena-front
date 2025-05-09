import { useState } from "react";
import styles from "./DropdownList.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowList.svg";
import { ReactComponent as Check } from "../../assets/check.svg";

type DropdownOption = {
  value: string;
  label: string;
};

type DropdownListProps = {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  value?: string;
  buttonStyles?: {};
  listStyles?: {};
};

export const DropdownList = ({
  options,
  onSelect,
  value,
  buttonStyles,
  listStyles,
}: DropdownListProps) => {
  const initialSelected =
    options.find((opt) => opt.value === value) || options[0];
  const [selected, setSelected] = useState(initialSelected);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownList}>
      <button
        type="button"
        className={styles.dropdownList_title}
        onClick={() => setIsOpen((prev) => !prev)}
        style={buttonStyles}
      >
        {selected.label}{" "}
        <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
      </button>
      {isOpen && (
        <ul className={styles.dropdownList_items} style={listStyles}>
          {[
            selected,
            ...options.filter((opt) => opt.value !== selected.value),
          ].map((option) => (
            <li
              key={option.value}
              className={styles.dropdownList_item}
              onClick={() => handleSelect(option)}
            >
              {selected.value === option.value && <Check />}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

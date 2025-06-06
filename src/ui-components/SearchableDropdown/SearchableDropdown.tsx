import { useEffect, useState, useRef, ReactNode } from "react";
import styles from "./SearchableDropdown.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowList.svg";
import { ReactComponent as Check } from "../../assets/check.svg";
import { ReactComponent as Search } from "../../assets/search-icon.svg";

type SearchableOption = {
  id: string;
  name: string;
  cyrillicName?: string;
  country?: string;
  class?: string;
  yearFrom?: number;
  brandId?: string;
};

type SearchableDropdownProps = {
  options: SearchableOption[];
  value?: string;
  onSelect: (value: string) => void;
  className?: string;
  generalStyles?: React.CSSProperties;
  buttonStyles?: React.CSSProperties;
  listStyles?: React.CSSProperties;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
};

export const SearchableDropdown = ({
  options,
  value,
  onSelect,
  className,
  generalStyles,
  buttonStyles,
  listStyles,
  placeholder = "Выберите...",
  searchPlaceholder = "Поиск...",
  disabled = false,
  icon,
  iconPosition = "end",
}: SearchableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<SearchableOption | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.id === value);
      setSelectedOption(option || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      option.name.toLowerCase().includes(searchLower) ||
      (option.cyrillicName &&
        option.cyrillicName.toLowerCase().includes(searchLower))
    );
  });

  const handleSelect = (option: SearchableOption) => {
    setSelectedOption(option);
    onSelect(option.id);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div
      className={`${styles.searchableDropdown} ${className || ""} ${
        disabled ? styles.disabled : ""
      }`}
      ref={dropdownRef}
      style={generalStyles || {}}
    >
      <button
        type="button"
        className={`${styles.searchableDropdown_title}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        style={buttonStyles}
        disabled={disabled}
      >
        {iconPosition === "start" && icon}
        {selectedOption
          ? selectedOption.cyrillicName || selectedOption.name
          : placeholder}
        {iconPosition === "end" &&
          (icon || (
            <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
          ))}
      </button>

      {isOpen && (
        <div className={styles.searchableDropdown_items} style={listStyles}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <ul className={styles.optionsList}>
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={styles.searchableDropdown_item}
                onClick={() => handleSelect(option)}
              >
                <div className={styles.optionContent}>
                  <span className={styles.optionName}>
                    {option.cyrillicName || option.name}
                  </span>
                </div>
                {selectedOption?.id === option.id && <Check />}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className={styles.noResults}>Ничего не найдено</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

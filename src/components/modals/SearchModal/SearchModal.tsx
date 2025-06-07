import React, { useEffect, useRef } from "react";
import styles from "./SearchModal.module.scss";
import { ReactComponent as SearchIcon } from "../../../assets/search-icon.svg";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchTerm?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  initialSearchTerm = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();

      if (window.innerWidth <= 768) {
        inputRef.current?.click();
      }
    } else {
      const timer = setTimeout(() => {
        if (document.body) {
          document.body.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.searchModal}>
      <div className={styles.modalContent}>
        <div className={styles.searchBar}>
          <div className={styles.inputWrapper}>
            <SearchIcon className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Поиск на Авторена"
              defaultValue={initialSearchTerm}
            />
          </div>
          <button
            ref={cancelButtonRef}
            onClick={onClose}
            className={styles.cancelButton}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import styles from "./BrandSearchModal.module.scss";
import { ReactComponent as SearchIcon } from "../../../assets/search-icon.svg";
import { ReactComponent as CrossIcon } from "../../../assets/cross.svg";
import { useDebounce } from "../../../hooks/debounce";

interface BrandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: { id: string; name: string }[];
  onSelectBrand: (brand: string) => void;
  initialBrand?: string;
}

export const BrandSearchModal: React.FC<BrandSearchModalProps> = ({
  isOpen,
  onClose,
  brands,
  onSelectBrand,
  initialBrand,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialBrand || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [filteredBrands, setFilteredBrands] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialBrand || "");
    }
  }, [isOpen, initialBrand]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilteredBrands(
        brands.filter((brand) =>
          brand.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBrands([]);
    }
  }, [debouncedSearchTerm, brands]);

  const handleBrandClick = (brandName: string) => {
    setSearchTerm(brandName);
  };

  const handleShowClick = () => {
    onSelectBrand(searchTerm);
    onClose();
  };

  const isBrandSelected = Boolean(searchTerm);

  if (!isOpen) return null;

  return (
    <div className={styles.brandModal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h3>Марки</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <CrossIcon />
          </button>
        </div>
        <div className={styles.searchBar}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Марка авто"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className={styles.brandList}>
          {filteredBrands.map((brand) => (
            <li key={brand.id} onClick={() => handleBrandClick(brand.name)}>
              {brand.name}
            </li>
          ))}
          {debouncedSearchTerm && filteredBrands.length === 0 && (
            <li className={styles.noResults}>Марок не найдено</li>
          )}
        </ul>
        <button
          className={`${styles.showBtn} ${
            isBrandSelected ? styles.activeBtn : ""
          }`}
          onClick={handleShowClick}
          disabled={!isBrandSelected}
        >
          Показать объявления
        </button>
      </div>
    </div>
  );
};

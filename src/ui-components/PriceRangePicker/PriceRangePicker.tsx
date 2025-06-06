import { useState, useEffect, ReactNode } from "react";
import styles from "./PriceRangePicker.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowList.svg";
import React from "react";
import { BottomSheet } from "../BottomSheet/BottomSheet";

export const PriceRangePickerButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
    selectedPrices: [number | null, number | null];
    isOpen: boolean;
    icon?: ReactNode;
    iconPosition?: "start" | "end";
    placeholder?: string;
    className?: string;
    buttonStyles?: React.CSSProperties;
  }
>(
  (
    {
      onClick,
      selectedPrices,
      isOpen,
      icon,
      iconPosition = "end",
      placeholder = "Цена за сутки",
      className,
      buttonStyles,
    },
    ref
  ) => {
    const formatPrice = (price: number | null) => {
      if (!price) return "";
      return `${price.toLocaleString()}₽`;
    };

    const priceText =
      selectedPrices[0] !== null && selectedPrices[1] !== null
        ? `От ${formatPrice(selectedPrices[0])} до ${formatPrice(
            selectedPrices[1]
          )}`
        : placeholder;

    return (
      <button
        ref={ref}
        className={`${styles.pricePickerButton} ${className || ""} ${
          isOpen ? styles.active : ""
        }`}
        onClick={onClick}
        style={buttonStyles}
      >
        {iconPosition === "start" && icon}
        {priceText}
        {iconPosition === "end" &&
          (icon || (
            <Arrow className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
          ))}
      </button>
    );
  }
);

PriceRangePickerButton.displayName = "PriceRangePickerButton";

type PriceRangePickerSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  initialPrices: [number | null, number | null];
  onPriceSelect: (prices: [number | null, number | null]) => void;
};

export const PriceRangePickerSheet = ({
  isOpen,
  onClose,
  initialPrices,
  onPriceSelect,
}: PriceRangePickerSheetProps) => {
  const [minPrice, setMinPrice] = useState<string>(
    initialPrices[0]?.toString() || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    initialPrices[1]?.toString() || ""
  );

  useEffect(() => {
    if (isOpen) {
      setMinPrice(initialPrices[0]?.toString() || "");
      setMaxPrice(initialPrices[1]?.toString() || "");
    }
  }, [isOpen, initialPrices]);

  const handleShowClick = () => {
    const min = minPrice ? parseInt(minPrice) : null;
    const max = maxPrice ? parseInt(maxPrice) : null;
    onPriceSelect([min, max]);
    onClose();
  };

  const hasAnyValue = Boolean(minPrice || maxPrice);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      defaultHeight={203}
      showHandle={false}
      showCloseButton={true}
      className={styles.bottomSheet}
    >
      <div className={styles.priceSheet}>
        <h3 className={styles.title}>Цена за сутки, ₽</h3>
        <div className={styles.inputs}>
          <div className={styles.inputWrap}>
            <div className={styles.inputContainer}>
              <span className={styles.inputPrefix}>От</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>
          <div className={styles.inputWrap}>
            <div className={styles.inputContainer}>
              <span className={styles.inputPrefix}>До</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>
        <button
          className={`${styles.showBtn} ${hasAnyValue ? styles.active : ""}`}
          onClick={handleShowClick}
        >
          Показать объявления
        </button>
      </div>
    </BottomSheet>
  );
};

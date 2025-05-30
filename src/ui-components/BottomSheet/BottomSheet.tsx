import { useState, useRef, useEffect, ReactNode } from "react";
import styles from "./BottomSheet.module.scss";
import { ReactComponent as Line } from "../../assets/sheet-line.svg";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: string;
  className?: string;
};

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  className = "",
}: BottomSheetProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [startY, setStartY] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sheetRef.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!sheetRef.current) return;
    const currentY = e.changedTouches[0].clientY;
    const diff = currentY - startY;
    if (diff > 100) {
      handleClose();
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.closing : ""}`}
      onClick={handleClose}
    >
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${
          isClosing ? styles.closing : ""
        } ${className}`}
        style={{}}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Line className={styles.handle} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

import { useState, useRef, useEffect, ReactNode } from "react";
import styles from "./BottomSheet.module.scss";
import { ReactComponent as Line } from "../../assets/sheet-line.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  defaultHeight?: number;
  className?: string;
  showHandle?: boolean;
  showCloseButton?: boolean;
};

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  defaultHeight = 330,
  className = "",
  showHandle = true,
  showCloseButton = false,
}: BottomSheetProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(defaultHeight);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateSheetHeight = (height: number) => {
    if (!sheetRef.current) return;

    const clampedHeight = Math.min(height, 700);
    sheetRef.current.style.height = `${clampedHeight}px`;
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const showBottomSheet = () => {
    updateSheetHeight(defaultHeight);
  };

  const dragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
    if (sheetRef.current) {
      const height = parseInt(
        sheetRef.current.style.height || `${defaultHeight}`
      );
      setStartHeight(height);
    }
    sheetRef.current?.classList.add(styles.dragging);
  };

  const dragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !contentRef.current) return;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const delta = startY - clientY;
    const newHeight = Math.max(0, startHeight + delta);
    updateSheetHeight(newHeight);
  };

  const dragStop = () => {
    if (!isDragging || !sheetRef.current) return;
    setIsDragging(false);
    sheetRef.current?.classList.remove(styles.dragging);

    const sheetHeight = parseInt(
      sheetRef.current.style.height || `${defaultHeight}`
    );
    if (sheetHeight < 100) {
      handleClose();
    } else {
      updateSheetHeight(defaultHeight);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => dragging(e);
    const handleMouseUp = () => dragStop();
    const handleTouchMove = (e: TouchEvent) => dragging(e);
    const handleTouchEnd = () => dragStop();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startY, startHeight]);

  useEffect(() => {
    if (isOpen) {
      showBottomSheet();
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
      onMouseDown={dragStart}
      onTouchStart={dragStart}
    >
      <div
        ref={sheetRef}
        className={`${styles.sheet} ${
          isClosing ? styles.closing : ""
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showHandle && <Line className={styles.handle} />}
        {showCloseButton && (
          <Cross
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          />
        )}
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

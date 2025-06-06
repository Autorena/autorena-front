import React, { useState, useEffect, useMemo } from "react";
import styles from "./DateRangePicker.module.scss";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";

interface DateRangePickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialDates?: [Date | null, Date | null];
  onDateSelect: (dates: [Date | null, Date | null]) => void;
}

export const DateRangePickerSheet: React.FC<DateRangePickerSheetProps> = ({
  isOpen,
  onClose,
  initialDates = [null, null],
  onDateSelect,
}) => {
  const [selectedDates, setSelectedDates] =
    useState<[Date | null, Date | null]>(initialDates);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (isOpen) {
      setSelectedDates(initialDates);
      const today = new Date();
      setCurrentMonth(initialDates[0]?.getMonth() ?? today.getMonth());
      setCurrentYear(initialDates[0]?.getFullYear() ?? today.getFullYear());
    }
  }, [isOpen, initialDates]);

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);

    const [start, end] = selectedDates;

    if (!start || (start && end)) {
      setSelectedDates([date, null]);
    } else if (date >= start) {
      setSelectedDates([start, date]);
    } else {
      setSelectedDates([date, start]);
    }
  };

  const renderDays = useMemo(() => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const startDay = firstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      date.setHours(0, 0, 0, 0);

      const isSelectedStart = selectedDates[0]?.getTime() === date.getTime();
      const isSelectedEnd = selectedDates[1]?.getTime() === date.getTime();
      const isBetween =
        selectedDates[0] &&
        selectedDates[1] &&
        date > selectedDates[0] &&
        date < selectedDates[1];
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={i}
          className={`${styles.day}
            ${isSelectedStart ? styles.selectedStart : ""}
            ${isSelectedEnd ? styles.selectedEnd : ""}
            ${isBetween ? styles.between : ""}
            ${isToday ? styles.today : ""}
          `}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </button>
      );
    }

    return days;
  }, [currentMonth, currentYear, selectedDates]);

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  };

  const displayDateRange = useMemo(() => {
    const [start, end] = selectedDates;
    if (start && end) {
      return `от ${formatDate(start)} до ${formatDate(end)}`;
    } else if (start) {
      return `от ${formatDate(start)}`;
    } else {
      return "Выберите даты";
    }
  }, [selectedDates]);

  const handleApply = () => {
    onDateSelect(selectedDates);
    onClose();
  };

  const isApplyDisabled = !selectedDates[0];

  if (!isOpen) return null;

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      className={styles.bottomSheet}
      defaultHeight={450}
    >
      <div className={styles.datePickerSheetContent}>
        <div className={styles.header}>
          <button onClick={handlePrevMonth}>
            <Arrow className={styles.prevArrow} />
          </button>
          <h3>
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button onClick={handleNextMonth}>
            <Arrow className={styles.nextArrow} />
          </button>
        </div>
        <div className={styles.weekdays}>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.daysGrid}>{renderDays}</div>
        <div className={styles.selectedRangeDisplay}>{displayDateRange}</div>
        <button
          className={`${styles.applyButton}`}
          onClick={handleApply}
          disabled={isApplyDisabled}
        >
          Выбрать
        </button>
      </div>
    </BottomSheet>
  );
};

export const DateRangePickerButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
    selectedDates: [Date | null, Date | null];
    isOpen: boolean;
    className?: string;
  }
>(({ onClick, selectedDates, isOpen, className }, ref) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dateText =
    selectedDates[0] && selectedDates[1]
      ? `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[1])}`
      : "Даты аренды";

  return (
    <button
      ref={ref}
      className={`${styles.datePickerButton} ${className || ""} ${
        isOpen ? styles.active : ""
      }`}
      onClick={onClick}
    >
      <Calendar />
      {dateText}
    </button>
  );
});

DateRangePickerButton.displayName = "DateRangePickerButton";

import { useState } from "react";
import styles from "./BottomSheet.module.scss";

type Option = {
  value: string;
  label: string;
};

type Props = {
  title?: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  onReset?: () => void;
  onSubmit?: () => void;
};

export const BottomSheetCheckboxFilter = ({
  title,
  options,
  values,
  onChange,
  onReset,
  onSubmit,
}: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "selected">("all");

  const handleToggle = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  const shownOptions =
    activeTab === "all"
      ? options
      : options.filter((opt) => values.includes(opt.value));

  return (
    <div className={`${styles.sheetContent} ${styles.checkbox}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.topBar}>
        <button
          className={`${styles.tabBtn} ${
            activeTab === "all" ? styles.active : ""
          }`}
          type="button"
          onClick={() => setActiveTab("all")}
        >
          Все
        </button>
        <button
          className={`${styles.tabBtn} ${styles.selected} ${
            activeTab === "selected" ? styles.active : ""
          }`}
          type="button"
          onClick={() => setActiveTab("selected")}
        >
          Выбрано <span className={styles.selectedCount}>{values.length}</span>
        </button>
        <button
          className={`${styles.tabBtn} ${styles.resetBtn}`}
          type="button"
          onClick={onReset}
        >
          Сброс
        </button>
      </div>
      <div className={styles.options}>
        {shownOptions.map((opt) => (
          <label key={opt.value} className={styles.option}>
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => handleToggle(opt.value)}
            />
            <span className={styles.checkbox} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      <button className={styles.submitBtn} type="button" onClick={onSubmit}>
        Выбрать
      </button>
    </div>
  );
};

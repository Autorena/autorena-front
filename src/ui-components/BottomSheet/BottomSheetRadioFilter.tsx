import styles from "./BottomSheet.module.scss";

type Option = {
  value: string;
  label: string;
};

type Props = {
  title?: string;
  options: Option[];
  value: string | number | boolean;
  onChange: (value: string) => void;
};

export const BottomSheetRadioFilter = ({
  title,
  options,
  value,
  onChange,
}: Props) => (
  <div className={`${styles.sheetContent} ${styles.radio}`}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.options}>
      {options.map((opt) => (
        <label key={opt.value} className={styles.option}>
          <input
            type="radio"
            name="radio-filter"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          <span className={styles.radio} />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

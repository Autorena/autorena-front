import styles from "./RadioButton.module.scss";

type RadioButtonType = {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  labelStyle?: React.CSSProperties;
  onChange?: () => void;
};

export const RadioButton = ({
  label,
  name,
  value,
  checked,
  labelStyle,
  onChange,
}: RadioButtonType) => {
  return (
    <div className={styles.checkboxWrapper}>
      <label style={labelStyle}>
        {label}
        <input
          type="radio"
          className={styles.modernRadio}
          value={value}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span></span>
      </label>
    </div>
  );
};

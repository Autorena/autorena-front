import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  register,
}) => {
  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        onChange={onChange}
        {...register(name)}
      />
      <span className={styles.checkboxCustom} />
      <span className={styles.checkboxLabel}>{label}</span>
    </label>
  );
};

export default Checkbox;

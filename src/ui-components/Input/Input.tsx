import { useState } from "react";
import styles from "./Input.module.scss";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeOff } from "../../assets/non-eye.svg";

type InputType = {
  type?: "text" | "number" | "tel" | "email" | "password";
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  button?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  icon?: React.ReactNode;
  required?: boolean;
  onButtonClick?: () => void;
  error?: boolean;
};

export const Input = ({
  type = "text",
  value,
  placeholder,
  onChange,
  name,
  className,
  button,
  inputStyle,
  buttonStyle,
  icon,
  required = false,
  onButtonClick,
  error,
}: InputType) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className={`${styles.inputWrap} ${className || ""}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <input
        type={inputType}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        style={inputStyle}
      />
      {isPasswordType && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles.eyeBtn}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      )}
      {button && (
        <button
          className={`red-btn ${styles.inputBtn}`}
          style={buttonStyle}
          onClick={onButtonClick}
          type="submit"
        >
          {button}
        </button>
      )}
    </div>
  );
};

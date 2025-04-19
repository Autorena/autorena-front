import styles from "./Loader.module.scss";
import { ReactComponent as Load } from "../../assets/loader.svg";

type LoaderProps = {
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={`${styles.loader} ${className}`}>
      <Load />
    </div>
  );
};

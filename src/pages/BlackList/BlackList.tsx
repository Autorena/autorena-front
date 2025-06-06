import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo-1.svg";

import { ReactComponent as Cross } from "../../assets/cross.svg";
import styles from "./BlackList.module.scss";

export const BlackList = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.blacklist}>
      <div className={styles.blacklist_header}>
        <Link to="/">
          <Logo />
        </Link>
        <button className={styles.closeBtn} onClick={() => navigate(-1)}>
          <Cross />
        </button>
      </div>
      <iframe
        src="/project7815970/page70106623.html"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </div>
  );
};

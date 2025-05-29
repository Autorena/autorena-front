import { Link } from "react-router-dom";
import { Tabs } from "../../ui-components/Tabs/Tabs";
import { profileTabs } from "../PersonalProfile/PersonalProfile";
import styles from "../PersonalProfile/PersonalProfile.module.scss";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";

export const MyListings = () => {
  return (
    <div className="container">
      <HeaderMobile />
      <div className={styles.myListings}>
        <h3>Мои объявления</h3>
        <Tabs tabs={profileTabs} />
        <Link
          to="/choose-category"
          className={`red-btn ${styles.myListings_new}`}
        >
          Разместить объявление
        </Link>
      </div>
    </div>
  );
};

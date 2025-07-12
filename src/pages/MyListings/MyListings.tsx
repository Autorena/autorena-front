import { Link } from "react-router-dom";
import { Tabs } from "../../ui-components/Tabs/Tabs";
import { ActiveListingsTab } from "../PersonalProfile/ActiveListingsTab";
import styles from "../PersonalProfile/PersonalProfile.module.scss";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { useAppSelector } from "../../redux/hooks";

export const MyListings = () => {
  const { cars } = useAppSelector((state) => state.cars);

  const userListings = cars.slice(0, 2);

  const myListingsTabs = [
    {
      id: 1,
      label: "Активные",
      content: <ActiveListingsTab listings={userListings} />,
    },
    {
      id: 2,
      label: "Архив",
      content: <div>aрхив</div>,
    },
  ];

  return (
    <div className="container">
      <HeaderMobile />
      <div className={styles.myListings}>
        <h3>Мои объявления</h3>
        <Tabs tabs={myListingsTabs} />
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

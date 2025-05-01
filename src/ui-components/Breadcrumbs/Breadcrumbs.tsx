import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import styles from "./Breadcrumbs.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowBread.svg";

const filterTitles: Record<string, string> = {
  RENT_AUTO: "Долгосрочная аренда",
  DAILY_RENT: "Аренда от суток",
  AUTO_SERVICES: "Автосервисы",
  BUY_AUTO: "Выкуп автомобилей",
  DRIVER_JOBS: "Работа водителям",
};

export const Breadcrumbs = ({ className }: { className?: string }) => {
  const location = useLocation();
  const car = useAppSelector((state) => state.cars.car);
  const searchParams = new URLSearchParams(location.search);
  const fromFilter = searchParams.get("from") || "RENT_AUTO";

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isCarPage =
    pathSegments.length === 1 && !isNaN(Number(pathSegments[0]));
  const isFilterPage = pathSegments[0] === "filter" && pathSegments[1];

  const breadcrumbs = [
    <Link to="/" key="home" className={styles.link}>
      Главная
    </Link>,
  ];

  if (isCarPage) {
    breadcrumbs.push(
      <Arrow key="arrow-filter" />,
      <Link to={`/filter/${fromFilter}`} key="filter" className={styles.link}>
        {filterTitles[fromFilter] || fromFilter}
      </Link>,
      <Arrow key="arrow-car" />,
      <span key="car-title" className={styles.link}>
        {car?.common?.title || "Объявление"}
      </span>
    );
  } else if (isFilterPage) {
    const filter = pathSegments[1];
    breadcrumbs.push(
      <Arrow key="arrow-filter" />,
      <span key="filter-name" className={styles.link}>
        {filterTitles[filter] || filter}
      </span>
    );
  } else {
    let accumulatedPath = "";
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      breadcrumbs.push(
        <Arrow key={`arrow-${index}`} />,
        isLast ? (
          <span key={`segment-${index}`} className={styles.link}>
            {filterTitles[segment] || segment}
          </span>
        ) : (
          <Link
            to={accumulatedPath}
            key={`segment-${index}`}
            className={styles.link}
          >
            {filterTitles[segment] || segment}
          </Link>
        )
      );
    });
  }

  return (
    <div className={`${styles.breadcrumbs} ${className}`}>{breadcrumbs}</div>
  );
};

import styles from "./Home.module.scss";
import option1 from "../../assets/option_1.png";
import option2 from "../../assets/option_2.png";
import option3 from "../../assets/option_3.png";
import option4 from "../../assets/option_4.png";
import option5 from "../../assets/option_5.png";
import { ReactComponent as Option6 } from "../../assets/option_6.svg";
import { Stories } from "../../ui-components/Stories/Stories";
import { useContext, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ReactComponent as Location } from "../../assets/location-icon.svg";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { cars } from "../../utils/cars";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Pagination } from "../../ui-components/Pagination/Pagination";

export const Home = () => {
  const { location } = useContext(LocationContext);
  const { setModalActive, setModalContent } = useContext(ModalContext);

  const doubledCars = [
    ...cars,
    ...cars,
    ...cars,
    ...cars,
    ...cars,
    ...cars,
    ...cars,
    ...cars,
    ...cars,
    ...cars,
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 20;

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  // const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const currentCars = doubledCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="container">
      <div className={styles.home}>
        <div className={styles.home_main}>
          <div className={styles.home_options}>
            <div className={styles.home_optionsWrap}>
              <div className={styles.top_row}>
                <a href="#" className={`${styles.home_option} ${styles.big}`}>
                  <h3 className={styles.title}>
                    Долгосрочная
                    <br /> аренда
                  </h3>
                  <img src={option1} alt="Service image" />
                </a>
                <a href="#" className={styles.home_option}>
                  {" "}
                  <h3 className={styles.title}>
                    Аренда от
                    <br /> суток
                  </h3>
                  <img src={option2} alt="Service image" />
                </a>
                <a href="#" className={styles.home_option}>
                  {" "}
                  <h3 className={styles.title}>Автосервисы</h3>
                  <img src={option3} alt="Service image" />
                </a>
              </div>
              <div className={styles.bottom_row}>
                <a href="#" className={`${styles.home_option} ${styles.big}`}>
                  {" "}
                  <h3 className={styles.title}>
                    Выкуп <br />
                    автомобилей
                  </h3>
                  <img src={option4} alt="Service image" />
                </a>
                <a href="#" className={`${styles.home_option} ${styles.big}`}>
                  {" "}
                  <h3 className={styles.title}>
                    Работа
                    <br /> водителям
                  </h3>
                  <img src={option5} alt="Service image" />
                </a>
              </div>
            </div>

            <a
              href="#"
              className={`${styles.home_option} ${styles.full_height}`}
            >
              {" "}
              <h3 className={styles.title}>Помощь на дороге</h3>
              <Option6 />
            </a>
          </div>
          <Stories />
          <div className={styles.home_info}>
            <h2 className="section-title">
              Посмотрите объявления в Москве и МО
            </h2>
            <div className={styles.home_info_points}>
              <button className={`${styles.home_info_point} ${styles.large}`}>
                <Location /> {location} и область
              </button>
              <button
                onClick={() => {
                  setModalContent(<LocationModal />);
                  setModalActive(true);
                }}
                style={{ padding: "0 8px" }}
              >
                Выбрать город
              </button>

              <div className={styles.home_info_point}>Авто до 1000 в сутки</div>
              <div className={styles.home_info_point}>Аренда комфорт +</div>
            </div>
          </div>
          <div className={styles.home_recommends}>
            <h2 className={`section-title ${styles.title}`}>
              Рекомендации <span>для вас</span>
            </h2>
            <div className={styles.home_recommends_grid}>
              {currentCars.map((car) => (
                <CarCard carData={car} key={car.common.id} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              // totalItems={cars.length}
              totalItems={doubledCars.length}
              itemsPerPage={carsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <div className={styles.home_ads}>
          <div className={styles.home_ad}>
            <p>Здесь будет реклама</p>
          </div>
          <div className={styles.home_ad}>
            <p>Здесь будет реклама</p>
          </div>
        </div>
      </div>
    </div>
  );
};

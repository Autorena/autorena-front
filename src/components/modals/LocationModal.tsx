import styles from "./Modals.module.scss";
import { cities as citiesData } from "../../utils/cities";
import { useContext, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";

export const LocationModal = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { setModalActive } = useContext(ModalContext);
  const { setLocation } = useContext(LocationContext);
  const [cities, setCities] = useState(citiesData);

  const handleSearch = () => {
    const filtered = citiesData.filter((city) =>
      city.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setCities(filtered);
  };

  return (
    <div className={`${styles.modal} ${styles.location}`}>
      <div className={styles.location_top}>
        <input
          type="text"
          placeholder="Поиск по городам"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className={`red-btn ${styles.searchBtn}`}
          onClick={handleSearch}
        >
          Найти
        </button>
      </div>
      <div className={styles.cities}>
        {cities.map((city) => (
          <button
            key={city.id}
            className={styles.city}
            onClick={() => {
              setLocation(city.name);
              setModalActive(false);
              setCities(citiesData);
              setSearchValue("");
            }}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

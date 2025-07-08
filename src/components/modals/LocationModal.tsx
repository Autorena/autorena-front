import styles from "./Modals.module.scss";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { useFilter } from "../../HOC/FilterContext";
import { City, useGetCitiesQuery } from "../../redux/citiesApi";

type LocationModalProps = {
  forFilters?: boolean;
  initialCity?: string;
  cityKey?: string;
};

export const LocationModal = ({ initialCity, cityKey }: LocationModalProps) => {
  const { setModalActive } = useContext(ModalContext);
  const { setLocation: setGlobalLocation } = useContext(LocationContext);
  const { setFilterValue } = useFilter();
  const [selectedCity, setSelectedCity] = useState(initialCity || "");
  const [searchValue, setSearchValue] = useState("");
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  const { data: citiesData, isLoading } = useGetCitiesQuery("");
  const cities: City[] = citiesData?.towns || [];

  useEffect(() => {
    if (!searchValue) {
      setFilteredCities(cities);
    } else {
      setFilteredCities(
        cities.filter((city) =>
          city.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, cities]);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setGlobalLocation(cityName);
    if (cityKey) {
      setFilterValue(cityKey, cityName);
    }
    setModalActive(false);
  };

  if (isLoading) {
    return (
      <div className={`${styles.modal} ${styles.location}`}>
        <div className={styles.loading}>Загрузка городов...</div>
      </div>
    );
  }

  return (
    <form
      className={`${styles.modal} ${styles.location}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.inputWrap}>
        <input
          type="text"
          placeholder="Поиск по городам"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className={`red-btn ${styles.inputBtn}`} type="submit">
          Найти
        </button>
      </div>
      <div className={`${styles.cities} ${searchValue ? styles.search : ""}`}>
        {filteredCities.map((city) => (
          <button
            key={city.id}
            className={`${styles.city} ${
              selectedCity === city.name ? styles.selected : ""
            }`}
            onClick={() => handleCitySelect(city.name)}
          >
            {city.name}
          </button>
        ))}
      </div>
    </form>
  );
};

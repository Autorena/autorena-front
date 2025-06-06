import styles from "./Modals.module.scss";
import { cities as citiesData } from "../../utils/cities";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/debounce";
import { useFilter } from "../../HOC/FilterContext";

type FormData = {
  searchValue: string;
};

type LocationModalProps = {
  forFilters?: boolean;
  initialCity?: string;
  cityKey?: string;
};

export const LocationModal = ({
  forFilters = false,
  initialCity,
  cityKey = "rent_city",
}: LocationModalProps) => {
  const { setModalActive } = useContext(ModalContext);
  const { setLocation: setGlobalLocation } = useContext(LocationContext);
  const [cities, setCities] = useState(citiesData);
  const { setFilterValue } = useFilter();
  const [selectedCity, setSelectedCity] = useState(initialCity || "");

  const { register, reset, watch } = useForm<FormData>();
  const searchValue = watch("searchValue", "");
  const debouncedSearch = useDebounce(searchValue, 700);

  useEffect(() => {
    const filtered = citiesData.filter((city) =>
      city.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setCities(filtered);
  }, [debouncedSearch]);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);

    if (forFilters) {
      setFilterValue(cityKey, cityName);
    } else {
      setGlobalLocation(cityName);
    }

    setModalActive(false);
    setCities(citiesData);
    reset();
  };

  return (
    <form
      className={`${styles.modal} ${styles.location}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.inputWrap}>
        <input
          type="text"
          {...register("searchValue", {
            required: "Поле обязательно",
          })}
          placeholder={
            forFilters ? "Поиск города для фильтра" : "Поиск по городам"
          }
        />
        <button className={`red-btn ${styles.inputBtn}`} type="submit">
          Найти
        </button>
      </div>
      <div
        className={`${styles.cities} ${debouncedSearch ? styles.search : ""}`}
      >
        {cities.map((city) => (
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

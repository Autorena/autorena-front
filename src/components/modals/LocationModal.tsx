import styles from "./Modals.module.scss";
import { cities as citiesData } from "../../utils/cities";
import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../hooks/debounce";

type FormData = {
  searchValue: string;
};

export const LocationModal = () => {
  const { setModalActive } = useContext(ModalContext);
  const { setLocation } = useContext(LocationContext);
  const [cities, setCities] = useState(citiesData);

  const { register, reset, watch } = useForm<FormData>();
  const searchValue = watch("searchValue", "");
  const debouncedSearch = useDebounce(searchValue, 700);

  useEffect(() => {
    const filtered = citiesData.filter((city) =>
      city.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setCities(filtered);
  }, [debouncedSearch]);

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
          placeholder="Поиск по городам"
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
            className={styles.city}
            onClick={() => {
              setLocation(city.name);
              setModalActive(false);
              setCities(citiesData);
              reset();
            }}
          >
            {city.name}
          </button>
        ))}
      </div>
    </form>
  );
};

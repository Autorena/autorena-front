import styles from "./Modals.module.scss";
import { cities as citiesData } from "../../utils/cities";
import { useContext, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { useForm } from "react-hook-form";

type FormData = {
  searchValue: string;
};

export const LocationModal = () => {
  const { setModalActive } = useContext(ModalContext);
  const { setLocation } = useContext(LocationContext);
  const [cities, setCities] = useState(citiesData);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    const filtered = citiesData.filter((city) =>
      city.name.toLowerCase().includes(data.searchValue.toLowerCase())
    );
    setCities(filtered);
  };

  return (
    <form
      className={`${styles.modal} ${styles.location}`}
      onSubmit={handleSubmit(onSubmit)}
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
      <div className={styles.cities}>
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

import { Controller, useForm } from "react-hook-form";
import styles from "./CreateListing.module.scss";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";
import {
  carCategoryOptions,
  driveExperienceOptions,
  rentDurationOptions,
  rentTypesOptions,
} from "../../constants/filterOptions";
import { useCreateListingMutation } from "../../redux/listingsApi";

interface WantedRentListingFormData {
  rent_types: string[];
  age: string;
  drive_experience: string;
  deposit?: boolean;
  rent_duration: string;
  is_russian_citizenship?: boolean;
  car_categories: string[];
  additional_info: string;
  city: string;
}

export const WantedRentListingForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<WantedRentListingFormData>({
    defaultValues: {
      rent_types: [],
      age: "",
      drive_experience: "",
      deposit: undefined,
      rent_duration: "",
      is_russian_citizenship: undefined,
      car_categories: [],
      additional_info: "",
      city: "",
    },
  });

  const [createListing, { isLoading: isCreating }] = useCreateListingMutation();

  const onSubmit = async (data: WantedRentListingFormData) => {
    const payload = {
      listing: {
        wanted_car_rent_listing: {
          rent_types: data.rent_types,
          age: data.age,
          drive_experience: data.drive_experience,
          deposit: data.deposit,
          rent_duration: data.rent_duration,
          is_russian_citizenship: data.is_russian_citizenship,
          car_categories: data.car_categories,
          additional_info: data.additional_info,
          city: data.city,
        },
      },
    };

    try {
      await createListing(payload).unwrap();
      console.log("Объявление успешно создано");
    } catch (error) {
      console.error("Ошибка при создании объявления:", error);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputWrap}>
        <h3>Тип аренды</h3>
        <Controller
          name="rent_types"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={rentTypesOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-90px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Возраст арендатора</h3>
        <input
          type="number"
          {...register("age", {
            required: "Обязательное поле",
            min: {
              value: 0,
              message: "Возраст не может быть отрицательным",
            },
            validate: (value) => {
              const age = parseInt(value);
              if (isNaN(age)) return "Введите корректный возраст";
              return true;
            },
          })}
        />
        {errors.age && (
          <span className={styles.error}>{errors.age.message}</span>
        )}
      </div>

      <div className={styles.inputWrap}>
        <h3>Стаж вождения</h3>
        <Controller
          name="drive_experience"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={driveExperienceOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-190px" }}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Залог нужен?</h3>
        <Controller
          name="deposit"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="deposit"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="deposit"
                value="false"
                label="Нет"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
                labelStyle={{ paddingLeft: "36px" }}
              />
            </div>
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Срок аренды</h3>
        <Controller
          name="rent_duration"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={rentDurationOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-130px" }}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Требуется гражданство РФ?</h3>
        <Controller
          name="is_russian_citizenship"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="is_russian_citizenship"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="is_russian_citizenship"
                value="false"
                label="Нет"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
                labelStyle={{ paddingLeft: "36px" }}
              />
            </div>
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Класс автомобиля</h3>
        <Controller
          name="car_categories"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={carCategoryOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-190px" }}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Описание объявления</h3>
        <textarea {...register("additional_info")} rows={5} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Город</h3>
        <input type="text" {...register("city")} />
      </div>

      <button
        type="submit"
        className={`red-btn ${styles.submitBtn}`}
        disabled={isCreating}
      >
        {isCreating ? "Создание..." : "Разместить объявление"}
      </button>
    </form>
  );
};

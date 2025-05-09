import styles from "./CreateListing.module.scss";
import { Controller, useForm } from "react-hook-form";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { useState } from "react";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";

type CarRentListingFormProps = {
  buyout: boolean;
  minimumRentalPeriod: number;
};
const brands = [
  { value: "1", label: "BMW" },
  { value: "2", label: "Honda" },
  { value: "3", label: "Mercedes" },
];

const mockModels = [
  { id: "m1", name: "3 Series", cyrillic_name: "3 серия", brand_id: "1" },
  { id: "m2", name: "X5", cyrillic_name: "X5", brand_id: "1" },
  { id: "m3", name: "Civic", cyrillic_name: "Сивик", brand_id: "2" },
  { id: "m4", name: "Accord", cyrillic_name: "Аккорд", brand_id: "2" },
  { id: "m5", name: "E-Class", cyrillic_name: "E-класс", brand_id: "3" },
];

const modelOptions = mockModels.map((model) => ({
  value: model.id,
  label: model.cyrillic_name || model.name,
}));

const fuelOptions = [
  { value: "FUEL_TYPE_GASOLINE", label: "Бензин" },
  { value: "FUEL_TYPE_DIESEL", label: "Дизель" },
  { value: "FUEL_TYPE_ELECTRIC", label: "Электро" },
  { value: "FUEL_TYPE_HYBRID", label: "Гибрид" },
];

const transmissionOptions = [
  { value: "TRANSMISSION_TYPE_MANUAL", label: "Механика" },
  { value: "TRANSMISSION_TYPE_AUTOMATIC", label: "Автомат" },
];

const bodyTypeOptions = [
  { value: "CAR_BODY_TYPE_SEDAN", label: "Седан" },
  { value: "CAR_BODY_TYPE_HATCHBACK", label: "Хэтчбек" },
];

const vehicleSegmentOptions = [
  { value: "VEHICLE_SEGMENT_A", label: "A — Мини" },
  { value: "VEHICLE_SEGMENT_B", label: "B — Малый" },
  { value: "VEHICLE_SEGMENT_C", label: "C — Компактный" },
  { value: "VEHICLE_SEGMENT_D", label: "D — Средний" },
  { value: "VEHICLE_SEGMENT_E", label: "E — Бизнес" },
  { value: "VEHICLE_SEGMENT_F", label: "F — Премиум" },
  { value: "VEHICLE_SEGMENT_S", label: "S — Спорт" },
  { value: "VEHICLE_SEGMENT_M", label: "M — Минивэны" },
  { value: "VEHICLE_SEGMENT_J", label: "J — SUV/Кроссоверы" },
];

const categoryOptions = [
  { value: "CAR_CATEGORY_ECONOMY", label: "Эконом" },
  { value: "CAR_CATEGORY_COMFORT", label: "Комфорт" },
  { value: "CAR_CATEGORY_COMFORT_PLUS", label: "Комфорт +" },
  { value: "CAR_CATEGORY_BUSINESS", label: "Бизнесс" },
  { value: "CAR_CATEGORY_PREMIUM", label: "Премиум" },
];

const paymentPeriodOptions = [
  { value: "PAYMENT_PERIOD_DAILY", label: "Ежедневно" },
  { value: "PAYMENT_PERIOD_WEEKLY", label: "Еженедельно" },
  { value: "PAYMENT_PERIOD_MONTHLY", label: "Ежемесячно" },
];

const rentDurationOptions = [
  { value: "RENT_DURATION_FROM_DAY", label: "От суток" },
  { value: "RENT_DURATION_FROM_WEEK", label: "От недели" },
  { value: "RENT_DURATION_FROM_MONTH", label: "От месяца" },
];

export const CarRentListingForm = ({
  buyout,
  minimumRentalPeriod,
}: CarRentListingFormProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      photos: [],
      brand_id: "",
      model_id: "",
      year: "",
      fuel_type: "FUEL_TYPE_UNSPECIFIED",
      transmission: "TRANSMISSION_TYPE_UNSPECIFIED",
      car_body_type: "CAR_BODY_TYPE_UNSPECIFIED",
      vehicle_segment: "VEHICLE_SEGMENT_UNSPECIFIED",
      has_air_conditioning: false,
      has_child_seat: false,
      car_category: "CAR_CATEGORY_UNSPECIFIED",
      allowed_for_taxi: false,
      allowed_only_for_personal_use: false,
      require_russian_citizenship: false,
      buyout_possible: buyout,
      deposit_required: false,
      payment_period: "PAYMENT_PERIOD_UNSPECIFIED",
      price_per_day: "",
      minimum_rental_period: minimumRentalPeriod,
      additional_info: "",
      city: "",
      rent_duration: "",
    },
  });

  const onSubmit = (data: any) => {
    const payload = {
      listing: {
        car_rent_listing: {
          car_creation: {
            brand_id: data.brand_id,
            model_id: data.model_id,
            year_of_car_production: Number(data.year),
            fuel_type: data.fuel_type,
            transmission: data.transmission,
            car_body_type: data.car_body_type,
            vehicle_segment: data.vehicle_segment,
            car_category: data.car_category,
            car_options: {
              has_air_conditioning: data.has_air_conditioning,
              has_child_seat: data.has_child_seat,
            },
          },
          listing_options: {
            allowed_for_taxi: data.allowed_for_taxi,
            allowed_only_for_personal_use: data.allowed_only_for_personal_use,
            require_russian_citizenship: data.require_russian_citizenship,
            buyout_possible: data.buyout_possible,
          },
          deposit_required: data.deposit_required,
          payment_period: data.payment_period,
          price_per_day: Number(data.price_per_day),
          minimum_rental_period: Number(data.minimum_rental_period),
          additional_info: data.additional_info,
          city: data.city,
        },
      },
    };

    console.log("Форма отправлена:", payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className={`${styles.inputWrap} ${styles.photos}`}>
        <h3>Фотографии</h3>
        <p className={styles.inputWrap_descr}>
          Мы рекомендуем загружать реальные фотографии автомобиля
        </p>
        <Controller
          name="photos"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className={styles.photosWrap}>
              <div className={styles.photosWrap_previews}>
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className={styles.preview_img}
                  />
                ))}
              </div>

              <label className={styles.upload_file}>
                <Plus /> Фото
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const allFiles = [...(field.value || []), ...files];
                    field.onChange(allFiles);

                    const newPreviews = files.map((file) =>
                      URL.createObjectURL(file)
                    );
                    setPreviews((prev) => [...prev, ...newPreviews]);
                  }}
                />
              </label>
            </div>
          )}
        />
      </div> */}

      {/* <div className={`${styles.inputWrap} ${styles.title}`}>
        <h3>Название объявления</h3>
        <input type="text" required />
        <p className={styles.inputWrap_descr}>
          Например, “Аренда авто с выкупом” или “Аренда авто под такси”
        </p>
      </div> */}

      {/* <div className={`${styles.inputWrap}`}>
        <h3>Бренд автомобиля</h3>
        <Controller
          name="brand_id"
          control={control}
          render={({ field }) => (
            <DropdownList
              options={brands}
              value={field.value}
              onSelect={field.onChange}
              buttonStyles={{ fontSize: "20px" }}
              listStyles={{ bottom: "-130px", fontSize: "20px" }}
            />
          )}
        />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Модель автомобиля</h3>
        <Controller
          name="model_id"
          control={control}
          render={({ field }) => (
            <DropdownList
              options={modelOptions}
              value={field.value}
              onSelect={field.onChange}
              listStyles={{ bottom: "-190px" }}
            />
          )}
        />
      </div> */}

      {/* <div className={`${styles.inputWrap} ${styles.title}`}>
        <h3>Год выпуска</h3>
        <input type="number" {...register("year", { required: true })} />
      </div> */}

      {/* <div className={`${styles.inputWrap}`}>
        <h3>Тип топлива</h3>
        <Controller
          name="fuel_type"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              {fuelOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  name="fuel_type"
                  value={option.value}
                  label={option.label}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  labelStyle={{ paddingLeft: "36px" }}
                />
              ))}
            </div>
          )}
        />{" "}
      </div> */}
      {/* 
      <div className={`${styles.inputWrap}`}>
        <h3>Трансмиссия</h3>
        <Controller
          name="transmission"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              {transmissionOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  name="transmission"
                  value={option.value}
                  label={option.label}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  labelStyle={{ paddingLeft: "36px" }}
                />
              ))}
            </div>
          )}
        />{" "}
      </div> */}

      {/* <div className={`${styles.inputWrap}`}>
        <h3>Тип кузова</h3>
        <Controller
          name="car_body_type"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              {bodyTypeOptions.map((option) => (
                <RadioButton
                  key={option.value}
                  name="car_body_type"
                  value={option.value}
                  label={option.label}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  labelStyle={{ paddingLeft: "36px" }}
                />
              ))}
            </div>
          )}
        />
      </div> */}

      {/* <div className={`${styles.inputWrap}`}>
        <h3>Сегмент автомобиля</h3>
        <Controller
          name="vehicle_segment"
          control={control}
          render={({ field }) => (
            <DropdownList
              options={vehicleSegmentOptions}
              value={field.value}
              onSelect={field.onChange}
              buttonStyles={{ fontSize: "20px" }}
              listStyles={{ bottom: "-320px", fontSize: "20px" }}
            />
          )}
        />
      </div> */}

      {/* <div className={`${styles.inputWrap}`}>
        <h3>Есть кондиционер?</h3>
        <Controller
          name="has_air_conditioning"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="has_air_conditioning"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="has_air_conditioning"
                value="false"
                label="Нет"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
                labelStyle={{ paddingLeft: "36px" }}
              />
            </div>
          )}
        />
      </div> */}

      {/* <div className={`${styles.inputWrap}`}>
        <h3>Есть детское кресло?</h3>
        <Controller
          name="has_child_seat"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="has_child_seat"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="has_child_seat"
                value="false"
                label="Нет"
                checked={field.value === false}
                onChange={() => field.onChange(false)}
                labelStyle={{ paddingLeft: "36px" }}
              />
            </div>
          )}
        />
      </div> */}

      {/* <div className={styles.inputWrap}>
        <h3>Класс автомобиля</h3>
        <Controller
          name="car_category"
          control={control}
          render={({ field }) => (
            <DropdownList
              options={categoryOptions}
              value={field.value}
              onSelect={field.onChange}
              buttonStyles={{ fontSize: "20px" }}
              listStyles={{ bottom: "-190px", fontSize: "20px" }}
            />
          )}
        />
      </div> */}

      <div className={styles.inputWrap}>
        <h3>Город</h3>
        <input type="text" {...register("city")} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Залог нужен?</h3>
        <Controller
          name="deposit_required"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="deposit_required"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="deposit_required"
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

      <div className={`${styles.inputWrap}`}>
        <h3>В такси можно?</h3>
        <Controller
          name="allowed_for_taxi"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="allowed_for_taxi"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => {
                  field.onChange(true);
                  setValue("allowed_only_for_personal_use", false);
                }}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="allowed_for_taxi"
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
        <h3>Только для личного использования?</h3>
        <Controller
          name="allowed_only_for_personal_use"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="allowed_only_for_personal_use"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => {
                  field.onChange(true);
                  setValue("allowed_for_taxi", false);
                }}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="allowed_only_for_personal_use"
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
        <h3>Выкуп возможен?</h3>
        <Controller
          name="buyout_possible"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="buyout_possible"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="buyout_possible"
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
        <h3>Требуется гражданство РФ?</h3>
        <Controller
          name="require_russian_citizenship"
          control={control}
          render={({ field }) => (
            <div className={styles.list}>
              <RadioButton
                name="require_russian_citizenship"
                value="true"
                label="Да"
                checked={field.value === true}
                onChange={() => field.onChange(true)}
                labelStyle={{ paddingLeft: "36px" }}
              />
              <RadioButton
                name="require_russian_citizenship"
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
        <h3>Минимальный срок аренды от:</h3>
        <input type="number" {...register("minimum_rental_period")} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Периодичность оплаты</h3>
        <Controller
          name="payment_period"
          control={control}
          render={({ field }) => (
            <DropdownList
              options={paymentPeriodOptions}
              value={field.value}
              onSelect={field.onChange}
              buttonStyles={{ fontSize: "20px" }}
              listStyles={{ bottom: "-130px", fontSize: "20px" }}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Цена в день</h3>
        <input type="number" {...register("price_per_day")} />
      </div>

      <div className={styles.inputWrap}>
        <h3>Срок аренды</h3>
        <Controller
          name="rent_duration"
          control={control}
          render={({ field }) => (
            <DropdownList
              options={rentDurationOptions}
              value={field.value}
              onSelect={(selected: string) => field.onChange(selected)}
              buttonStyles={{ fontSize: "20px" }}
              listStyles={{ bottom: "-130px", fontSize: "20px" }}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Дополнительная информация</h3>
        <textarea {...register("additional_info")} rows={5} />
      </div>

      <button type="submit" className={`red-btn`}>
        Разместить объявление
      </button>
    </form>
  );
};

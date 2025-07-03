import styles from "./CreateListing.module.scss";
import { Controller, useForm } from "react-hook-form";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { RadioButton } from "../../ui-components/RadioButton/RadioButton";
import { useEffect, useState } from "react";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { useGetBrandsQuery } from "../../redux/brandsApi";
import { useGetModelsQuery } from "../../redux/modelsApi";
import { SearchableDropdown } from "../../ui-components/SearchableDropdown/SearchableDropdown";
import {
  carBodyTypeOptions,
  carCategoryOptions,
  fuelTypeOptions,
  paymentPeriodOptions,
  rentDurationOptions,
  transmissionOptions,
  vehicleSegmentOptions,
} from "../../constants/filterOptions";
import { useCreateListingMutation } from "../../redux/listingsApi";

type CarRentListingFormProps = {
  buyout: boolean;
  minimumRentalPeriod: number;
  setError: (value: string) => void;
};

type FormData = {
  photos: File[];
  brand_id: string;
  model_id: string;
  year: string;
  fuel_type: string;
  transmission: string;
  car_body_type: string;
  vehicle_segment: string;
  has_air_conditioning: boolean | undefined;
  has_child_seat: boolean | undefined;
  car_category: string;
  color: string;
  allowed_for_taxi: boolean;
  require_russian_citizenship: boolean | undefined;
  buyout_possible: boolean;
  deposit_required: boolean | undefined;
  payment_period: string[];
  price_per_day: string;
  minimum_rental_period: string;
  additional_info: string;
  city: string;
  rent_duration: string[];
};

export const CarRentListingForm = ({
  minimumRentalPeriod,
  setError,
}: CarRentListingFormProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const { data: brandsData, error: isBrandsError } = useGetBrandsQuery("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [createListing, { isLoading: isCreating }] = useCreateListingMutation();

  const {
    data: modelsData,
    isLoading: isLoadingModels,
    error: isModelsError,
  } = useGetModelsQuery(
    { brandId: selectedBrandId },
    { skip: !selectedBrandId }
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      photos: [],
      brand_id: "",
      model_id: "",
      year: "",
      fuel_type: "",
      transmission: "",
      car_body_type: "",
      vehicle_segment: "",
      has_air_conditioning: undefined,
      has_child_seat: undefined,
      car_category: "",
      color: "",
      allowed_for_taxi: false,
      deposit_required: undefined,
      payment_period: [],
      price_per_day: "",
      minimum_rental_period: minimumRentalPeriod?.toString() || "",
      additional_info: "",
      city: "",
      rent_duration: [""],
    },
  });

  useEffect(() => {
    if (minimumRentalPeriod === 1) {
      setValue("rent_duration", ["RENT_DURATION_FROM_DAY"]);
    }
  }, [minimumRentalPeriod, setValue]);

  useEffect(() => {
    if (brandsData) {
      localStorage.setItem("brands", JSON.stringify(brandsData));
    }
  }, [brandsData]);

  useEffect(() => {
    if (isBrandsError) setError("Ошибка загрузки брендов");
    if (isModelsError) setError("Ошибка загрузки моделей");
  }, [isBrandsError, isModelsError, setError]);

  const onSubmit = async (data: FormData) => {
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
            car_options: {
              has_air_conditioning: data.has_air_conditioning,
              has_child_seat: data.has_child_seat,
            },
            car_category: data.car_category,
            photos: data.photos,
            color: data.color,
          },
          listing_options: {
            allowed_for_taxi: data.allowed_for_taxi,
          },
          deposit_required: data.deposit_required,
          payment_period: data.payment_period,
          price_per_day: Number(data.price_per_day),
          minimum_rental_period: Number(data.minimum_rental_period),
          additional_info: data.additional_info,
          city: data.city,
          rent_duration: data.rent_duration,
        },
      },
    };

    try {
      await createListing(payload).unwrap();
      console.log("Объявление успешно создано");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      setError(err.data?.message || "Ошибка при создании объявления");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.inputWrap} ${styles.photos}`}>
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
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Бренд</h3>
        <Controller
          name="brand_id"
          rules={{ required: "Выберите бренд" }}
          control={control}
          render={({ field }) => (
            <SearchableDropdown
              className={styles.dropdown}
              options={brandsData?.brands || []}
              value={field.value}
              onSelect={(value) => {
                field.onChange(value);
                setSelectedBrandId(value);
                setValue("model_id", "");
              }}
            />
          )}
        />
        <p className={styles.error}>{errors.brand_id?.message}</p>
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Модель</h3>
        <Controller
          name="model_id"
          rules={{ required: "Выберите модель" }}
          control={control}
          render={({ field }) => (
            <SearchableDropdown
              className={styles.dropdown}
              options={modelsData?.models || []}
              value={field.value}
              onSelect={field.onChange}
              disabled={!selectedBrandId || isLoadingModels}
            />
          )}
        />
        <p className={styles.error}>{errors.model_id?.message}</p>
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Цвет</h3>
        <input type="text" {...register("color")} />
      </div>

      <div className={`${styles.inputWrap} ${styles.title}`}>
        <h3>Год выпуска</h3>
        <input type="number" {...register("year", { required: true })} />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Тип топлива</h3>
        <Controller
          name="fuel_type"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={fuelTypeOptions}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />{" "}
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Трансмиссия</h3>
        <Controller
          name="transmission"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={transmissionOptions}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />{" "}
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Тип кузова</h3>
        <Controller
          name="car_body_type"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={carBodyTypeOptions}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      </div>

      <div className={`${styles.inputWrap}`}>
        <h3>Сегмент автомобиля</h3>
        <Controller
          name="vehicle_segment"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={vehicleSegmentOptions}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      </div>

      <div className={`${styles.inputWrap}`}>
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
      </div>

      <div className={`${styles.inputWrap}`}>
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
      </div>

      <div className={styles.inputWrap}>
        <h3>Класс автомобиля</h3>
        <Controller
          name="car_category"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={carCategoryOptions}
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Город</h3>
        <input type="text" {...register("city")} />
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
                  // setValue("allowed_only_for_personal_use", false);
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

      <div className={styles.inputWrap}>
        <h3>Периодичность оплаты</h3>
        <Controller
          name="payment_period"
          control={control}
          render={({ field }) => (
            <DropdownList
              className={styles.dropdown}
              options={paymentPeriodOptions}
              value={field.value}
              onSelect={field.onChange}
              isMulti={true}
            />
          )}
        />
      </div>

      <div className={styles.inputWrap}>
        <h3>Цена в день</h3>
        <input type="number" {...register("price_per_day")} />
      </div>

      {minimumRentalPeriod !== 1 ? (
        <div className={styles.inputWrap}>
          <h3>Минимальный срок аренды от:</h3>
          <Controller
            name="minimum_rental_period"
            control={control}
            render={({ field }) => (
              <div className={styles.list}>
                <RadioButton
                  name="minimum_rental_period"
                  value="1"
                  label="День"
                  checked={field.value === "1"}
                  onChange={() => field.onChange("1")}
                  labelStyle={{ paddingLeft: "36px" }}
                />
                <RadioButton
                  name="minimum_rental_period"
                  value="7"
                  label="Неделя"
                  checked={field.value === "7"}
                  onChange={() => field.onChange("7")}
                  labelStyle={{ paddingLeft: "36px" }}
                />
                <RadioButton
                  name="minimum_rental_period"
                  value="30"
                  label="Месяц"
                  checked={field.value === "30"}
                  onChange={() => field.onChange("30")}
                  labelStyle={{ paddingLeft: "36px" }}
                />
              </div>
            )}
          />
        </div>
      ) : null}

      {minimumRentalPeriod !== 1 ? (
        <div className={styles.inputWrap}>
          <h3>Срок аренды</h3>
          <Controller
            name="rent_duration"
            control={control}
            render={({ field }) => (
              <DropdownList
                className={styles.dropdown}
                options={rentDurationOptions}
                value={field.value || []}
                onSelect={field.onChange}
                isMulti={true}
              />
            )}
          />
        </div>
      ) : null}

      <div className={styles.inputWrap}>
        <h3>Описание объявления</h3>
        <textarea {...register("additional_info")} rows={5} />
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

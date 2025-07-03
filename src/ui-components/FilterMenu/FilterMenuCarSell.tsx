import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars } from "../../redux/listingsSlice";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import {
  carBodyTypeOptions,
  carCategoryOptions,
  fuelTypeOptions,
  paymentPeriodOptions,
  transmissionOptions,
} from "../../constants/filterOptions";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { FilterField, RentFilterFormData } from "./FilterMenuRent";
import { FILTER_KEYS } from "../../constants/filterKeys";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { LocationModal } from "../../components/modals/LocationModal";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { useContext, useState } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationContext } from "../../HOC/LocationProvider";
import { BottomSheetRadioFilter } from "../BottomSheet/BottomSheetRadioFilter";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import { BottomSheetCheckboxFilter } from "../BottomSheet/BottomSheetCheckboxFilter";
import { getSelectedLabel } from "./getSelectedLabel";

type FilterMenuWantedRentProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SellFilterFormData = {
  city?: string;
  without_deposit?: boolean;
  transmission_type?: string;
  fuel_type?: string;
  car_body_type?: string;
  car_category?: string;
  min_year?: number;
  max_year?: number;
  min_price?: number;
  max_price?: number;
  payment_options?: {
    periods?: string[];
  };
  car_options?: {
    has_air_conditioning?: boolean;
    has_child_seat?: boolean;
  };
};

export const FilterMenuCarSell = ({
  isOpen,
  onClose,
}: FilterMenuWantedRentProps) => {
  const [trigger] = useLazyFilterListingsQuery();
  const dispatch = useAppDispatch();
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const { location } = useContext(LocationContext);
  const [openSheet, setOpenSheet] = useState<
    null | "transmission" | "fuel" | "body" | "category" | "year" | "price"
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<RentFilterFormData>({
    mode: "onChange",
  });

  const filterFields: FilterField[] = [
    {
      key: "transmission_type",
      label: "Тип трансмиссии",
      options: transmissionOptions,
      sheet: "transmission",
      type: "radio",
    },
    {
      key: "fuel_type",
      label: "Тип топлива",
      options: fuelTypeOptions,
      sheet: "fuel",
      type: "radio",
    },
    {
      key: "car_body_type",
      label: "Тип кузова",
      options: carBodyTypeOptions,
      sheet: "body",
      type: "radio",
    },
    {
      key: "car_category",
      label: "Класс авто",
      options: carCategoryOptions,
      sheet: "category",
      type: "radio",
    },
    {
      key: "year",
      label: "Год выпуска",
      sheet: "year",
      type: "custom",
    },
    {
      key: "price",
      label: "Цена",
      sheet: "price",
      type: "custom",
    },
    {
      key: "payment_options",
      label: "График платежей",
      options: paymentPeriodOptions,
      sheet: "payment_options",
      type: "checkbox",
    },
  ];

  const onSubmit = async (data: SellFilterFormData) => {
    const selectedCity = data.city || location;

    const filterObject = {
      filter: {
        car_sell_listing: {
          transmission_type: data.transmission_type
            ? [data.transmission_type]
            : undefined,
          fuel_type: data.fuel_type ? [data.fuel_type] : undefined,
          car_body_type: data.car_body_type ? [data.car_body_type] : undefined,
          car_category: data.car_category ? [data.car_category] : undefined,
          city: selectedCity,
          without_deposit: data.without_deposit,
          min_year: data.min_year,
          max_year: data.max_year,
          min_price: data.min_price,
          max_price: data.max_price,
          payment_options: data.payment_options,
          car_options: data.car_options,
        },
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };
    console.log(filterObject);
    try {
      const result = await trigger(filterObject);

      if (result.data) {
        dispatch(setFilteredCars(result.data.listings));
        onClose();
      }
    } catch (err) {
      console.error("Failed to filter listings:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.filterMenu} ${isOpen ? styles.open : ""}`}
    >
      <button
        className={styles.filterMenu_close}
        onClick={onClose}
        type="button"
      >
        <Cross />
      </button>
      <h2 className={styles.filterMenu_title}>Фильтры</h2>
      <label>Искать в городе:</label>
      <div className={styles.cityWrap}>
        <button
          type="button"
          className={styles.filterMenu_city}
          onClick={() => {
            setModalActive(true);
            setModalContent(
              <LocationModal cityKey={FILTER_KEYS.CAR_SELL_CITY} />
            );
          }}
        >
          <LargeSvgImage
            src={getLargeSvgPath("location-icon-2")}
            alt="Локация"
          />{" "}
          {watch("city") || location}
        </button>
        <button
          type="button"
          onClick={() => {
            setModalActive(true);
            setModalContent(
              <LocationModal cityKey={FILTER_KEYS.CAR_SELL_CITY} />
            );
          }}
          style={{ padding: "0 8px" }}
          className={styles.filterMenu_city_choose}
        >
          Изменить город
        </button>
      </div>
      <div className={styles.filterMenu_fields}>
        {filterFields.map((field) => {
          const value = watch(field.key as keyof RentFilterFormData);
          const selectedLabel = getSelectedLabel(field, value, watch);
          return (
            <button
              key={field.key}
              className={styles.filterMenu_field}
              onClick={() =>
                setOpenSheet(
                  field.sheet as
                    | "transmission"
                    | "fuel"
                    | "body"
                    | "category"
                    | "year"
                    | "price"
                )
              }
              type="button"
            >
              {selectedLabel ? (
                <>
                  <span>{selectedLabel}</span>
                  <span
                    className={styles.clearIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (field.type === "custom" && field.key === "year") {
                        setValue("min_year", undefined);
                        setValue("max_year", undefined);
                      } else if (
                        field.type === "custom" &&
                        field.key === "price"
                      ) {
                        setValue("min_price_per_day", undefined);
                        setValue("max_price_per_day", undefined);
                      } else {
                        setValue(field.key as keyof RentFilterFormData, "");
                      }
                    }}
                  >
                    <Cross />
                  </span>
                </>
              ) : (
                <>
                  <span>{field.label}</span>
                  <Arrow />
                </>
              )}
            </button>
          );
        })}

        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field}`}
        >
          <span className={styles.checkboxLabel}>Есть кондиционер</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("car_options.has_air_conditioning")}
          />
          <span className={styles.checkboxCustom} />
        </label>
        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field}`}
        >
          <span className={styles.checkboxLabel}>Есть детское кресло</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("car_options.has_child_seat")}
          />
          <span className={styles.checkboxCustom} />
        </label>
        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field}`}
        >
          <span className={styles.checkboxLabel}>Без депозита</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("without_deposit")}
          />
          <span className={styles.checkboxCustom} />
        </label>
      </div>

      <div className={styles.filterMenu_bottom}>
        <button
          type="button"
          className={`${styles.cleanBtn}`}
          onClick={() => reset()}
        >
          Сброс фильтров
        </button>
        <button type="submit" className={`red-btn ${styles.submitBtn}`}>
          Применить фильтры
        </button>
      </div>

      {filterFields.map((field) =>
        openSheet === field.sheet ? (
          <BottomSheet
            key={field.key}
            isOpen
            onClose={() => setOpenSheet(null)}
            defaultHeight="auto"
          >
            {field.type === "radio" && field.options && (
              <BottomSheetRadioFilter
                title={field.label}
                options={field.options}
                value={
                  watch(
                    field.key as
                      | "transmission_type"
                      | "fuel_type"
                      | "car_body_type"
                      | "car_category"
                  ) || ""
                }
                onChange={(value) => {
                  setValue(
                    field.key as
                      | "transmission_type"
                      | "fuel_type"
                      | "car_body_type"
                      | "car_category",
                    value
                  );
                }}
              />
            )}
            {field.type === "checkbox" && field.options && (
              <BottomSheetCheckboxFilter
                title={field.label}
                options={field.options}
                values={
                  field.key === "payment_options"
                    ? watch("payment_options")?.periods || []
                    : []
                }
                onChange={(values) => {
                  if (field.key === "payment_options") {
                    setValue("payment_options", { periods: values });
                  }
                }}
                onReset={() => {
                  if (field.key === "payment_options") {
                    setValue("payment_options", { periods: [] });
                  }
                }}
                onSubmit={() => setOpenSheet(null)}
              />
            )}
            {field.type === "custom" && field.key === "year" && (
              <div className={styles.inputWrap} style={{ marginBottom: 0 }}>
                <label className={styles.fieldsWrap_title}>Год выпуска</label>
                <div className={styles.fieldsWrap}>
                  <input
                    type="number"
                    placeholder="От"
                    className={`${styles.filterMenu_year} ${
                      errors.min_year ? "invalid" : ""
                    }`}
                    max={new Date().getFullYear()}
                    value={watch("min_year") || ""}
                    onChange={(e) =>
                      setValue(
                        "min_year",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="До"
                    className={`${styles.filterMenu_year} ${
                      errors.max_year ? "invalid" : ""
                    }`}
                    max={new Date().getFullYear()}
                    value={watch("max_year") || ""}
                    onChange={(e) =>
                      setValue(
                        "max_year",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
                <button
                  className={styles.submitBtn}
                  type="button"
                  onClick={() => setOpenSheet(null)}
                >
                  Показать объявления
                </button>
              </div>
            )}
            {field.type === "custom" && field.key === "price" && (
              <div className={styles.inputWrap} style={{ marginBottom: 0 }}>
                <label className={styles.fieldsWrap_title}>Цена за сутки</label>
                <div className={styles.fieldsWrap}>
                  <input
                    type="number"
                    placeholder="От"
                    className={`${styles.filterMenu_price} ${
                      errors.min_price_per_day ? "invalid" : ""
                    }`}
                    value={watch("min_price_per_day") || ""}
                    onChange={(e) =>
                      setValue(
                        "min_price_per_day",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="До"
                    className={`${styles.filterMenu_price} ${
                      errors.max_price_per_day ? "invalid" : ""
                    }`}
                    value={watch("max_price_per_day") || ""}
                    onChange={(e) =>
                      setValue(
                        "max_price_per_day",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
                <button
                  className={styles.submitBtn}
                  type="button"
                  onClick={() => setOpenSheet(null)}
                >
                  Показать объявления
                </button>
              </div>
            )}
          </BottomSheet>
        ) : null
      )}
    </form>
  );
};

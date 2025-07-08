import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import {
  carCategoryOptions,
  driveExperienceOptions,
  rentDurationOptions,
  rentTypesOptions,
} from "../../constants/filterOptions";
import { ReactComponent as Cross } from "../../assets/cross.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { useLazyFilterListingsQuery } from "../../redux/listingsApi";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars } from "../../redux/listingsSlice";
import { useContext, useState } from "react";
import { LocationContext } from "../../HOC/LocationProvider";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationModal } from "../../components/modals/LocationModal";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { BottomSheet } from "../BottomSheet/BottomSheet";
import { BottomSheetRadioFilter } from "../BottomSheet/BottomSheetRadioFilter";
import { BottomSheetCheckboxFilter } from "../BottomSheet/BottomSheetCheckboxFilter";
import { FilterField } from "./FilterMenuRent";

type WantedRentFilterFormData = {
  rent_types: string[];
  min_age?: number;
  max_age?: number;
  drive_experience: string[];
  deposit_required?: boolean;
  rent_durations: string[];
  require_russian_citizenship?: boolean;
  car_category: string[];
  city: string;
};

type FilterMenuWantedRentProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FilterMenuWantedRent = ({
  isOpen,
  onClose,
}: FilterMenuWantedRentProps) => {
  const [triggerFilter] = useLazyFilterListingsQuery();
  const dispatch = useAppDispatch();
  const { location } = useContext(LocationContext);
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const [openSheet, setOpenSheet] = useState<
    | null
    | "rent_types"
    | "age"
    | "drive_experience"
    | "deposit_required"
    | "rent_durations"
    | "car_category"
  >(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<WantedRentFilterFormData>();

  const filterFields: FilterField[] = [
    {
      key: "rent_types",
      label: "Тип аренды",
      options: rentTypesOptions,
      sheet: "rent_types",
      type: "checkbox",
    },
    {
      key: "age",
      label: "Возраст арендатора",
      sheet: "age",
      type: "custom",
    },
    {
      key: "drive_experience",
      label: "Опыт вождения",
      options: driveExperienceOptions,
      sheet: "drive_experience",
      type: "checkbox",
    },
    {
      key: "rent_durations",
      label: "Сроки аренды",
      options: rentDurationOptions,
      sheet: "rent_durations",
      type: "checkbox",
    },
    {
      key: "car_category",
      label: "Класс авто",
      options: carCategoryOptions,
      sheet: "car_category",
      type: "checkbox",
    },
  ];

  const onSubmit = async (data: WantedRentFilterFormData) => {
    const filterObject = {
      filter: {
        wanted_car_rent_listing: {
          rent_types: data.rent_types ? [data.rent_types] : undefined,
          min_age: data.min_age,
          max_age: data.max_age,
          drive_experience: data.drive_experience,
          deposit_required: data.deposit_required,
          rent_durations: data.rent_durations,
          require_russian_citizenship: data.require_russian_citizenship,
          car_category: data.car_category,
          city: location,
        },
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };

    try {
      const result = await triggerFilter(filterObject).unwrap();
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
            setModalContent(<LocationModal />);
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
            setModalContent(<LocationModal />);
          }}
          style={{ padding: "0 8px" }}
          className={styles.filterMenu_city_choose}
        >
          Изменить город
        </button>
      </div>
      <div className={styles.filterMenu_fields}>
        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field} ${styles.separated}`}
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        >
          <span className={styles.checkboxLabel}>Без депозита</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("deposit_required")}
          />
          <span className={styles.checkboxCustom} />
        </label>

        <button
          className={`${styles.filterMenu_field} ${styles.separated}`}
          onClick={() => setOpenSheet("age")}
          type="button"
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        >
          {(() => {
            const minAge = watch("min_age");
            const maxAge = watch("max_age");
            if (minAge || maxAge) {
              if (minAge && maxAge) {
                return (
                  <>
                    <span>
                      От {minAge} до {maxAge} лет
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("min_age", undefined);
                        setValue("max_age", undefined);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              } else if (minAge) {
                return (
                  <>
                    <span>От {minAge} лет</span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("min_age", undefined);
                        setValue("max_age", undefined);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              } else if (maxAge) {
                return (
                  <>
                    <span>До {maxAge} лет</span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("min_age", undefined);
                        setValue("max_age", undefined);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Возраст арендатора</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("rent_types")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("rent_types");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = rentTypesOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("rent_types", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Тип аренды</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("drive_experience")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("drive_experience");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = driveExperienceOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("drive_experience", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Опыт вождения</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("rent_durations")}
          type="button"
        >
          {(() => {
            const watchedValue = watch("rent_durations");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = rentDurationOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("rent_durations", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Сроки аренды</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <button
          className={styles.filterMenu_field}
          onClick={() => setOpenSheet("car_category")}
          type="button"
          style={{ marginBottom: "20px", borderRadius: "0 0 8px 8px" }}
        >
          {(() => {
            const watchedValue = watch("car_category");
            if (Array.isArray(watchedValue) && watchedValue.length > 0) {
              const selectedOptions = carCategoryOptions.filter((o) =>
                watchedValue.includes(o.value)
              );
              if (selectedOptions.length > 0) {
                return (
                  <>
                    <span>
                      {selectedOptions.map((o) => o.label).join(", ")}
                    </span>
                    <span
                      className={styles.clearIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("car_category", []);
                      }}
                    >
                      <Cross />
                    </span>
                  </>
                );
              }
            }
            return (
              <>
                <span>Класс авто</span>
                <Arrow />
              </>
            );
          })()}
        </button>

        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field} ${styles.separated}`}
          style={{ borderRadius: "8px" }}
        >
          <span className={styles.checkboxLabel}>Требуется гражданство РФ</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            {...register("require_russian_citizenship")}
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
                  watch(field.key as keyof WantedRentFilterFormData) as
                    | string
                    | number
                    | boolean
                }
                onChange={(value) => {
                  setValue(field.key as keyof WantedRentFilterFormData, value);
                }}
              />
            )}
            {field.type === "custom" && field.key === "age" && (
              <div className={styles.inputWrap} style={{ marginBottom: 0 }}>
                <label className={styles.fieldsWrap_title}>
                  Возраст арендатора
                </label>
                <div className={styles.fieldsWrap}>
                  <input
                    type="number"
                    placeholder="От"
                    className={`${styles.filterMenu_year} ${
                      errors.min_age ? "invalid" : ""
                    }`}
                    {...register("min_age", {
                      valueAsNumber: true,
                      min: 0,
                      validate: (value) => {
                        const maxAge = watch("max_age");
                        if (maxAge && value && Number(value) > Number(maxAge)) {
                          return "Минимальный возраст не может быть больше максимального";
                        }
                        return true;
                      },
                    })}
                    value={watch("min_age") || ""}
                    onChange={(e) => {
                      setValue(
                        "min_age",
                        e.target.value ? Number(e.target.value) : undefined
                      );
                    }}
                  />
                  <input
                    type="number"
                    placeholder="До"
                    className={`${errors.max_age ? "invalid" : ""}`}
                    value={watch("max_age") || ""}
                    {...register("max_age", {
                      valueAsNumber: true,
                      min: 0,
                      validate: (value) => {
                        const minAge = watch("min_age");
                        if (minAge && value && Number(value) < Number(minAge)) {
                          return "Максимальный возраст не может быть меньше минимального";
                        }
                        return true;
                      },
                    })}
                    onChange={(e) => {
                      setValue(
                        "max_age",
                        e.target.value ? Number(e.target.value) : undefined
                      );
                    }}
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
            {field.type === "checkbox" && field.options && (
              <BottomSheetCheckboxFilter
                title={field.label}
                options={field.options}
                values={
                  (watch(
                    field.key as keyof WantedRentFilterFormData
                  ) as string[]) || []
                }
                onChange={(values) =>
                  setValue(field.key as keyof WantedRentFilterFormData, values)
                }
                onReset={() =>
                  setValue(field.key as keyof WantedRentFilterFormData, [])
                }
                onSubmit={() => setOpenSheet(null)}
              />
            )}
          </BottomSheet>
        ) : null
      )}
    </form>
  );
};

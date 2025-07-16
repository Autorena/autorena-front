import { useForm } from "react-hook-form";
import styles from "./FilterMenu.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { setFilteredCars, setFilterError } from "../../redux/listingsSlice";
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
import { FilterField } from "./FilterMenuRent";
import { FILTER_KEYS } from "../../constants/filterKeys";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { LocationModal } from "../../components/modals/LocationModal";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { useContext, useState } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { LocationContext } from "../../HOC/LocationProvider";
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
  transmission_type?: string[];
  fuel_type?: string[];
  car_body_type?: string[];
  car_category?: string[];
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
  sell_listing_options?: {
    allowed_for_taxi?: boolean;
    allowed_only_for_personal_use?: boolean;
    require_russian_citizenship?: boolean;
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
    | null
    | "transmission"
    | "fuel"
    | "body"
    | "category"
    | "year"
    | "price"
    | "payment_options"
    | "has_air_conditioning"
    | "has_child_seat"
    | "car_options"
    | "sell_listing_options"
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SellFilterFormData>({
    mode: "onChange",
  });

  const filterFields: FilterField[] = [
    {
      key: "price",
      label: "Цена",
      sheet: "price",
      type: "custom",
    },
    {
      key: "year",
      label: "Год выпуска",
      sheet: "year",
      type: "custom",
    },
    {
      key: "transmission_type",
      label: "Тип трансмиссии",
      options: transmissionOptions,
      sheet: "transmission",
      type: "checkbox",
    },
    {
      key: "fuel_type",
      label: "Тип топлива",
      options: fuelTypeOptions,
      sheet: "fuel",
      type: "checkbox",
    },
    {
      key: "car_category",
      label: "Класс авто",
      options: carCategoryOptions,
      sheet: "category",
      type: "checkbox",
    },
    {
      key: "car_body_type",
      label: "Тип кузова",
      options: carBodyTypeOptions,
      sheet: "body",
      type: "checkbox",
    },
    {
      key: "payment_options",
      label: "График платежей",
      options: paymentPeriodOptions,
      sheet: "payment_options",
      type: "checkbox",
    },
    {
      key: "car_options",
      label: "Дополнительно",
      options: [
        { value: "has_air_conditioning", label: "Кондиционер" },
        { value: "has_child_seat", label: "Детское кресло" },
      ],
      sheet: "car_options",
      type: "checkbox",
    },
    {
      key: "sell_listing_options",
      label: "Условия продажи",
      options: [
        { value: "allowed_for_taxi", label: "Можно для такси" },
        {
          value: "allowed_only_for_personal_use",
          label: "Только для личного пользования",
        },
      ],
      sheet: "sell_listing_options",
      type: "checkbox",
    },
  ];

  const onSubmit = async (data: SellFilterFormData) => {
    const selectedCity = data.city || location;

    const filterObject = {
      filter: {
        car_sell_listing: {
          transmission_type: data.transmission_type
            ? data.transmission_type
            : undefined,
          fuel_type: data.fuel_type ? data.fuel_type : undefined,
          car_body_type: data.car_body_type ? data.car_body_type : undefined,
          car_category: data.car_category ? data.car_category : undefined,
          city: selectedCity,
          without_deposit: data.without_deposit,
          min_year: data.min_year,
          max_year: data.max_year,
          min_price: data.min_price,
          max_price: data.max_price,
          payment_options: data.payment_options,
          car_options: data.car_options,
          sell_listing_options: data.sell_listing_options,
        },
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };

    try {
      const result = await trigger(filterObject);

      if (result.error) {
        const errorMessage =
          "status" in result.error && result.error.status === 404
            ? "Объявлений не найдено"
            : "Ошибка загрузки данных";

        dispatch(setFilterError(errorMessage));
        dispatch(setFilteredCars([]));

        if ("status" in result.error && result.error.status === 404) {
          onClose();
        }
        return;
      }

      if (result.data) {
        dispatch(setFilteredCars(result.data.listings));
        onClose();
      }
    } catch (err) {
      console.error("Failed to filter listings:", err);
      onClose();
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
        <div className={styles.groupedFields}>
          <button
            className={`
              ${styles.filterMenu_field}
              
            `}
            type="button"
            onClick={() => setOpenSheet("price")}
          >
            {getSelectedLabel(
              filterFields[0],
              {
                min_price: watch("min_price"),
                max_price: watch("max_price"),
              },
              watch
            ) ? (
              <>
                <span>
                  {getSelectedLabel(
                    filterFields[0],
                    {
                      min_price: watch("min_price"),
                      max_price: watch("max_price"),
                    },
                    watch
                  )}
                </span>
                <span
                  className={styles.clearIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    setValue("min_price", undefined);
                    setValue("max_price", undefined);
                  }}
                >
                  <Cross />
                </span>
              </>
            ) : (
              <>
                <span>Цена</span>
                <Arrow />
              </>
            )}
          </button>
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

        <button
          className={`${styles.filterMenu_field} ${styles.separated}`}
          type="button"
          onClick={() => setOpenSheet("year")}
          style={{ margin: "0 0 20px" }}
        >
          {getSelectedLabel(
            filterFields[1],
            {
              min_year: watch("min_year"),
              max_year: watch("max_year"),
            },
            watch
          ) ? (
            <>
              <span>
                {getSelectedLabel(
                  filterFields[1],
                  {
                    min_year: watch("min_year"),
                    max_year: watch("max_year"),
                  },
                  watch
                )}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("min_year", undefined);
                  setValue("max_year", undefined);
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>Год выпуска</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={styles.filterMenu_field}
          type="button"
          onClick={() => setOpenSheet("transmission")}
          style={{ borderRadius: "8px 8px 0 0" }}
        >
          {getSelectedLabel(
            filterFields[2],
            watch("transmission_type"),
            watch
          ) ? (
            <>
              <span>
                {getSelectedLabel(
                  filterFields[2],
                  watch("transmission_type"),
                  watch
                )}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("transmission_type", []);
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>Тип трансмисии</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={styles.filterMenu_field}
          type="button"
          onClick={() => setOpenSheet("fuel")}
        >
          {getSelectedLabel(filterFields[3], watch("fuel_type"), watch) ? (
            <>
              <span>
                {getSelectedLabel(filterFields[3], watch("fuel_type"), watch)}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("fuel_type", []);
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>Тип топлива</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={styles.filterMenu_field}
          type="button"
          onClick={() => setOpenSheet("body")}
        >
          {getSelectedLabel(filterFields[5], watch("car_body_type"), watch) ? (
            <>
              <span>
                {getSelectedLabel(
                  filterFields[5],
                  watch("car_body_type"),
                  watch
                )}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("car_body_type", []);
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>Тип кузова</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={styles.filterMenu_field}
          type="button"
          onClick={() => setOpenSheet("category")}
        >
          {getSelectedLabel(filterFields[4], watch("car_category"), watch) ? (
            <>
              <span>
                {getSelectedLabel(
                  filterFields[4],
                  watch("car_category"),
                  watch
                )}
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
          ) : (
            <>
              <span>Класс авто</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={styles.filterMenu_field}
          type="button"
          onClick={() => setOpenSheet("payment_options")}
          style={{ borderRadius: "0 0 8px 8px" }}
        >
          {getSelectedLabel(
            filterFields[6],
            watch("payment_options"),
            watch
          ) ? (
            <>
              <span>
                {getSelectedLabel(
                  filterFields[6],
                  watch("payment_options"),
                  watch
                )}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("payment_options", { periods: [] });
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>График платежей</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={`${styles.filterMenu_field} ${styles.separated}`}
          type="button"
          onClick={() => setOpenSheet("car_options")}
          style={{ margin: "20px 0" }}
        >
          {watch("car_options.has_air_conditioning") ||
          watch("car_options.has_child_seat") ? (
            <>
              <span>
                {[
                  watch("car_options.has_air_conditioning")
                    ? "Кондиционер"
                    : null,
                  watch("car_options.has_child_seat") ? "Детское кресло" : null,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("car_options", {
                    has_air_conditioning: false,
                    has_child_seat: false,
                  });
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>Дополнительные опции</span>
              <Arrow />
            </>
          )}
        </button>

        <button
          className={`${styles.filterMenu_field} ${styles.separated}`}
          type="button"
          onClick={() => setOpenSheet("sell_listing_options")}
          style={{ borderRadius: "8px", marginBottom: "20px" }}
        >
          {watch("sell_listing_options.allowed_for_taxi") ||
          watch("sell_listing_options.allowed_only_for_personal_use") ? (
            <>
              <span>
                {[
                  watch("sell_listing_options.allowed_for_taxi")
                    ? "Можно для такси"
                    : null,
                  watch("sell_listing_options.allowed_only_for_personal_use")
                    ? "Только для личного пользования"
                    : null,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
              <span
                className={styles.clearIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue("sell_listing_options", {
                    allowed_for_taxi: false,
                    allowed_only_for_personal_use: false,
                    require_russian_citizenship: watch(
                      "sell_listing_options.require_russian_citizenship"
                    ),
                  });
                }}
              >
                <Cross />
              </span>
            </>
          ) : (
            <>
              <span>Условия продажи</span>
              <Arrow />
            </>
          )}
        </button>
        <label
          className={`${styles.checkboxWrapper} ${styles.filterMenu_field}`}
          style={{ borderRadius: "8px" }}
        >
          <span className={styles.checkboxLabel}>Требуется гражданство РФ</span>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={
              !!watch("sell_listing_options.require_russian_citizenship")
            }
            onChange={(e) =>
              setValue("sell_listing_options", {
                ...watch("sell_listing_options"),
                require_russian_citizenship: e.target.checked,
              })
            }
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
            {field.type === "checkbox" && field.options && (
              <BottomSheetCheckboxFilter
                title={field.label}
                options={field.options || []}
                values={
                  field.key === "payment_options"
                    ? watch("payment_options")?.periods || []
                    : field.key === "car_options"
                    ? Object.entries(watch("car_options") || {})
                        .filter(([, v]) => v)
                        .map(([key]) => key)
                    : field.key === "sell_listing_options"
                    ? Object.entries(watch("sell_listing_options") || {})
                        .filter(
                          ([key, v]) =>
                            v && key !== "require_russian_citizenship"
                        )
                        .map(([key]) => key)
                    : (watch(
                        field.key as keyof SellFilterFormData
                      ) as string[]) || []
                }
                onChange={(values) => {
                  if (field.key === "payment_options") {
                    setValue("payment_options", { periods: values });
                  } else if (field.key === "car_options") {
                    setValue("car_options", {
                      has_air_conditioning: values.includes(
                        "has_air_conditioning"
                      ),
                      has_child_seat: values.includes("has_child_seat"),
                    });
                  } else if (field.key === "sell_listing_options") {
                    setValue("sell_listing_options", {
                      allowed_for_taxi: values.includes("allowed_for_taxi"),
                      allowed_only_for_personal_use: values.includes(
                        "allowed_only_for_personal_use"
                      ),
                      require_russian_citizenship: watch(
                        "sell_listing_options.require_russian_citizenship"
                      ),
                    });
                  } else {
                    setValue(field.key as keyof SellFilterFormData, values);
                  }
                }}
                onReset={() => {
                  if (field.key === "payment_options") {
                    setValue("payment_options", { periods: [] });
                  } else if (field.key === "car_options") {
                    setValue("car_options", {
                      has_air_conditioning: false,
                      has_child_seat: false,
                    });
                  } else if (field.key === "sell_listing_options") {
                    setValue("sell_listing_options", {
                      allowed_for_taxi: false,
                      allowed_only_for_personal_use: false,
                      require_russian_citizenship: watch(
                        "sell_listing_options.require_russian_citizenship"
                      ),
                    });
                  } else {
                    setValue(field.key as keyof SellFilterFormData, []);
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
                <label className={styles.fieldsWrap_title}>Цена</label>
                <div className={styles.fieldsWrap}>
                  <input
                    type="number"
                    placeholder="От"
                    className={`${styles.filterMenu_price} ${
                      errors.min_price ? "invalid" : ""
                    }`}
                    value={watch("min_price") || ""}
                    onChange={(e) =>
                      setValue(
                        "min_price",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                  <input
                    type="number"
                    placeholder="До"
                    className={`${styles.filterMenu_price} ${
                      errors.max_price ? "invalid" : ""
                    }`}
                    value={watch("max_price") || ""}
                    onChange={(e) =>
                      setValue(
                        "max_price",
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

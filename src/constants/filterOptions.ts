export const transmissionOptions = [
  { value: "TRANSMISSION_TYPE_MANUAL", label: "МКПП" },
  { value: "TRANSMISSION_TYPE_AUTOMATIC", label: "АКПП" },
  { value: "TRANSMISSION_TYPE_ROBOTIC", label: "Роботизированная" },
  { value: "TRANSMISSION_TYPE_CVT", label: "Вариатор (CVT)" },
  {
    value: "TRANSMISSION_TYPE_DUAL_CLUTCH",
    label: "Преселективная (DCT/DSG)",
  },
  { value: "TRANSMISSION_TYPE_TIPTRONIC", label: "Типтроник" },
  { value: "TRANSMISSION_TYPE_SEMI_AUTOMATIC", label: "Полуавтоматическая" },
  { value: "TRANSMISSION_TYPE_ELECTRIC", label: "Электропривод" },
];

export const fuelTypeOptions = [
  { value: "FUEL_TYPE_GASOLINE", label: "Бензин" },
  { value: "FUEL_TYPE_DIESEL", label: "Дизель" },
  { value: "FUEL_TYPE_ELECTRIC", label: "Электро" },
  { value: "FUEL_TYPE_HYBRID", label: "Гибрид" },
  { value: "FUEL_TYPE_GAS", label: "Газ" },
];

export const carBodyTypeOptions = [
  { value: "CAR_BODY_TYPE_SEDAN", label: "Седан" },
  { value: "CAR_BODY_TYPE_HATCHBACK", label: "Хэтчбек" },
  { value: "CAR_BODY_TYPE_LIFTBACK", label: "Лифтбэк" },
  { value: "CAR_BODY_TYPE_WAGON", label: "Универсал" },
  { value: "CAR_BODY_TYPE_SUV", label: "Внедорожник" },
  { value: "CAR_BODY_TYPE_CROSSOVER", label: "Кроссовер" },
  { value: "CAR_BODY_TYPE_COUPE", label: "Купэ" },
  { value: "CAR_BODY_TYPE_CONVERTIBLE", label: "Кабриолет" },
  { value: "CAR_BODY_TYPE_MINIVAN", label: "Минивэн" },
  { value: "CAR_BODY_TYPE_ROADSTER", label: "Роадстер" },
  { value: "CAR_BODY_TYPE_FASTBACK", label: "Фастбэк" },
  { value: "CAR_BODY_TYPE_MINIBUS", label: "Микроавтобус" },
  { value: "CAR_BODY_TYPE_PICKUP", label: "Пикап" },
  { value: "CAR_BODY_TYPE_TARGA", label: "Тарга" },
  { value: "CAR_BODY_TYPE_LIMOUSINE", label: "Лимузин" },
];

export const carCategoryOptions = [
  { value: "CAR_CATEGORY_ECONOMY", label: "Эконом" },
  { value: "CAR_CATEGORY_COMFORT", label: "Комфорт" },
  { value: "CAR_CATEGORY_COMFORT_PLUS", label: "Комфорт+" },
  { value: "CAR_CATEGORY_BUSINESS", label: "Бизнес" },
  { value: "CAR_CATEGORY_PREMIUM", label: "Премиум" },
];

export const vehicleSegmentOptions = [
  { value: "VEHICLE_SEGMENT_A", label: "A" },
  { value: "VEHICLE_SEGMENT_B", label: "B" },
  { value: "VEHICLE_SEGMENT_C", label: "C" },
  { value: "VEHICLE_SEGMENT_D", label: "D" },
  { value: "VEHICLE_SEGMENT_E", label: "E" },
  { value: "VEHICLE_SEGMENT_F", label: "F" },
  { value: "VEHICLE_SEGMENT_J", label: "J" },
  { value: "VEHICLE_SEGMENT_M", label: "M" },
  { value: "VEHICLE_SEGMENT_S", label: "S" },
];

export const paymentPeriodOptions = [
  { value: "PAYMENT_PERIOD_DAILY", label: "Ежедневно" },
  { value: "PAYMENT_PERIOD_WEEKLY", label: "Еженедельно" },
  { value: "PAYMENT_PERIOD_MONTHLY", label: "Ежемесячно" },
  { value: "PAYMENT_PERIOD_BI_MONTHLY", label: "2 раза в месяц" },
];

export const rentDurationOptions = [
  { value: "RENT_DURATION_FROM_DAY", label: "От суток" },
  { value: "RENT_DURATION_FROM_WEEK", label: "От недели" },
  { value: "RENT_DURATION_FROM_MONTH", label: "От месяца" },
];

export const wantedRentDurationOptions = [
  { value: "RENT_DURATION_FROM_DAY", label: "От суток" },
  { value: "RENT_DURATION_FROM_WEEK", label: "От недели" },
  { value: "RENT_DURATION_FROM_MONTH", label: "От месяца" },
  { value: "RENT_DURATION_FROM_YEAR", label: "От года" },
];

export const rentalConditionsOptions = [
  { value: "RENTAL_CONDITION_WITH_DRIVER", label: "С водителем" },
  { value: "RENTAL_CONDITION_WITHOUT_DRIVER", label: "Без водителя" },
  { value: "RENTAL_CONDITION_DELIVERY", label: "С доставкой" },
  { value: "RENTAL_CONDITION_BUYOUT", label: "С выкупом" },
];

export const carOptions = [
  { value: "hasAirConditioning", label: "Кондиционер" },
  { value: "hasChildSeat", label: "Детское кресло" },
  { value: "hasBluetooth", label: "Bluetooth" },
  { value: "hasParkingSensors", label: "Парктроник" },
  { value: "hasBackupCamera", label: "Камера заднего вида" },
  { value: "hasCruiseControl", label: "Круиз-контроль" },
  { value: "hasHeatedSeats", label: "Подогрев сидений" },
  { value: "hasHeatedSteeringWheel", label: "Подогрев руля" },
  { value: "hasLeatherInterior", label: "Кожаный салон" },
  { value: "hasSunroof", label: "Люк" },
  { value: "hasTintedWindows", label: "Тонировка" },
  { value: "hasAllWheelDrive", label: "Полный привод" },
];

export const driveExperienceOptions = [
  { value: "DRIVE_EXPERIENCE_LESS_THAN_1_YEAR", label: "Менее 1 года" },
  { value: "DRIVE_EXPERIENCE_1_TO_3_YEARS", label: "От 1 до 3 лет" },
  { value: "DRIVE_EXPERIENCE_3_TO_5_YEARS", label: "От 3 до 5 лет" },
  { value: "DRIVE_EXPERIENCE_MORE_THAN_5_YEARS", label: "Более 5 лет" },
  { value: "DRIVE_EXPERIENCE_NO_EXPERIENCE", label: "Без стажа" },
];

export const salaryPeriodOptions = [
  { value: "SALARY_PERIOD_PER_SHIFT", label: "За смену" },
  { value: "SALARY_PERIOD_PER_HOUR", label: "За час" },
  { value: "SALARY_PERIOD_PER_MONTH", label: "В месяц" },
];

export const employmentTypeOptions = [
  { value: "EMPLOYMENT_TYPE_FULL_TIME", label: "Полная занятость" },
  { value: "EMPLOYMENT_TYPE_PART_TIME", label: "Частичная занятость" },
  { value: "EMPLOYMENT_TYPE_SELF_EMPLOYED", label: "Самозанятый" },
];

export const workScheduleOptions = [
  { value: "WORK_SCHEDULE_FULL_TWO_TWO", label: "2 через 2" },
  { value: "WORK_SCHEDULE_FIVE_DAYS", label: "5 дней в неделю" },
  { value: "WORK_SCHEDULE_FLEXIBLE", label: "Гибкий график" },
];

export const rentTypesOptions = [
  { value: "RENT_TYPE_RENT", label: "Аренда" },
  { value: "RENT_TYPE_BUYOUT", label: "Выкуп" },
];

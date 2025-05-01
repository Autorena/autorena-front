export const getCategoryData = (carData: any) => {
  const category = carData.common.category;

  switch (category) {
    case "RENT_AUTO":
      return carData.rent_auto;
    case "DAILY_RENT":
      return carData.daily_rent;
    case "BUY_AUTO":
      return carData.buy_auto;
    case "DRIVER_JOBS":
      return carData.driver_job;
    case "AUTO_PARTS":
      return carData.auto_parts;
    case "AUTO_SERVICES":
      return carData.auto_services;
    case "SEARCH_AUTO":
      return carData.search_auto;
    default:
      return {};
  }
};

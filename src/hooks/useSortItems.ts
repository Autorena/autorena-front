import { useMemo } from "react";
import { sortCars } from "../utils/sortCars";
import { CarCardType } from "../types";
import { sortOptions } from "../constants/sortOptions";

type SortConfig = {
  items: CarCardType[];
  sortOption: string;
  filterFunction?: (item: CarCardType) => boolean;
  filterType?: string;
  activeFilter?: string;
};

const getFilterTypeForFavorites = (activeFilter: string): string => {
  switch (activeFilter) {
    case "long_term_rent":
    case "daily_rent":
      return "RENT_AUTO";
    case "buy_cars":
      return "BUY_AUTO";
    case "driver_jobs":
      return "DRIVER_JOBS";
    case "auto_services":
      return "AUTO_SERVICES";
    default:
      return "default";
  }
};

export const useSortItems = ({
  items,
  sortOption,
  filterFunction,
  filterType,
  activeFilter,
}: SortConfig) => {
  const getSortOptions = () => {
    if (filterType) {
      return (
        sortOptions[filterType as keyof typeof sortOptions] ??
        sortOptions.default
      );
    }
    if (activeFilter) {
      const favoritesFilterType = getFilterTypeForFavorites(activeFilter);
      return (
        sortOptions[favoritesFilterType as keyof typeof sortOptions] ??
        sortOptions.default
      );
    }
    return sortOptions.default;
  };

  const processedItems = useMemo(() => {
    let filtered = items;
    if (filterFunction) {
      filtered = items.filter(filterFunction);
    }
    if (sortOption === "default") {
      return filtered;
    }
    return sortCars(filtered, sortOption);
  }, [items, sortOption, filterFunction]);

  return {
    processedItems,
    sortOptions: getSortOptions(),
  };
};

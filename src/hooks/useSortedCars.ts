import { useState, useEffect } from "react";

import { sortCars } from "../utils/sortCars";
import { useAppSelector } from "../redux/hooks";
import { CarCardType } from "../types";

export const useSortedCars = (
  filters: { [key: string]: any },
  sortOption: string,
  visibleCount: number
) => {
  const { cars, loading } = useAppSelector((state) => state.cars);
  const [filteredCars, setFilteredCars] = useState<CarCardType[]>([]);

  useEffect(() => {
    const filterCars = cars.filter((car) => {
      const { price, car_class } = filters;

      if (price && car.listing.carRentListing.pricePerDay > price) return false;
      if (
        car_class &&
        car.listing.carRentListing.carContent.carCategory?.toLowerCase() !==
          car_class.toLowerCase()
      )
        return false;

      return true;
    });

    setFilteredCars(filterCars);
  }, [cars, filters]);

  const sortedFilteredCars = sortCars(filteredCars, sortOption);
  const visibleCars = sortedFilteredCars.slice(0, visibleCount);

  return { visibleCars, loading };
};

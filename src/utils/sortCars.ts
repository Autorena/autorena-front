import { CarCardType } from "../types";

export const sortCars = (cars: CarCardType[], sortOption: string) => {
  const sorted = [...cars].sort((a, b) => {
    const priceA = Number(a.listing.carRentListing?.pricePerDay ?? 0);
    const priceB = Number(b.listing.carRentListing?.pricePerDay ?? 0);

    switch (sortOption) {
      case "by date": {
        const dateA = new Date(
          a.listing.carRentListing?.carContent?.createdAt ??
            a.listing.carRentListing?.createdAt ??
            new Date()
        ).getTime();
        const dateB = new Date(
          b.listing.carRentListing?.carContent?.createdAt ??
            b.listing.carRentListing?.createdAt ??
            new Date()
        ).getTime();
        return dateB - dateA;
      }
      case "cheaper": {
        return priceA - priceB;
      }
      case "more-expensive": {
        return priceB - priceA;
      }
      case "salary-more": {
        const salaryA = Number(a.listing.driverJobListing?.pricePerDay ?? 0);
        const salaryB = Number(b.listing.driverJobListing?.pricePerDay ?? 0);
        return salaryB - salaryA;
      }
      default:
        return 0;
    }
  });

  return sorted;
};

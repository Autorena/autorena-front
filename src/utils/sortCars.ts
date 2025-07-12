import { CarCardType } from "../types";

export const sortCars = (cars: CarCardType[], sortOption: string) => {
  const sorted = [...cars].sort((a, b) => {
    const priceA = Number(
      a.carRentListing?.pricePerDay ??
        a.carSellListing?.price ??
        a.driverJobListing?.pricePerDay ??
        a.autoServiceListing?.pricePerDay ??
        a.carBuyListing?.pricePerDay ??
        0
    );
    const priceB = Number(
      b.carRentListing?.pricePerDay ??
        b.carSellListing?.price ??
        b.driverJobListing?.pricePerDay ??
        b.autoServiceListing?.pricePerDay ??
        b.carBuyListing?.pricePerDay ??
        0
    );

    const getDate = (item: CarCardType) => {
      const listing = item;
      return new Date(
        listing.carRentListing?.carContent?.createdAt ??
          listing.carRentListing?.createdAt ??
          listing.carSellListing?.carContent?.createdAt ??
          listing.carSellListing?.createdAt ??
          listing.driverJobListing?.carContent?.createdAt ??
          listing.driverJobListing?.createdAt ??
          listing.autoServiceListing?.carContent?.createdAt ??
          listing.autoServiceListing?.createdAt ??
          listing.carBuyListing?.carContent?.createdAt ??
          listing.carBuyListing?.createdAt ??
          listing.wantedCarRentListing?.carContent?.createdAt ??
          listing.wantedCarRentListing?.createdAt ??
          new Date()
      ).getTime();
    };

    switch (sortOption) {
      case "by date": {
        const dateA = getDate(a);
        const dateB = getDate(b);
        return dateB - dateA;
      }
      case "cheaper": {
        return priceA - priceB;
      }
      case "more-expensive": {
        return priceB - priceA;
      }
      case "salary-higher":
      case "salary-more": {
        const salaryA = Number(a.driverJobListing?.pricePerDay ?? 0);
        const salaryB = Number(b.driverJobListing?.pricePerDay ?? 0);
        return salaryB - salaryA;
      }
      default:
        return 0;
    }
  });

  return sorted;
};

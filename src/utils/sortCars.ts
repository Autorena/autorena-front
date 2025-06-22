import { CarCardType } from "../types";

export const sortCars = (cars: CarCardType[], sortOption: string) => {
  const sorted = [...cars].sort((a, b) => {
    const priceA = Number(
      a.listing.carRentListing?.pricePerDay ??
        a.listing.carSellListing?.price ??
        a.listing.driverJobListing?.pricePerDay ??
        a.listing.autoServiceListing?.pricePerDay ??
        a.listing.carBuyListing?.pricePerDay ??
        0
    );
    const priceB = Number(
      b.listing.carRentListing?.pricePerDay ??
        b.listing.carSellListing?.price ??
        b.listing.driverJobListing?.pricePerDay ??
        b.listing.autoServiceListing?.pricePerDay ??
        b.listing.carBuyListing?.pricePerDay ??
        0
    );

    const getDate = (item: CarCardType) => {
      const listing = item.listing;
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

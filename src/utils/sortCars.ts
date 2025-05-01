export const sortCars = (cars: any[], sortOption: string) => {
  return [...cars].sort((a, b) => {
    switch (sortOption) {
      case "by date": {
        const dateA = new Date(a.common.created_at).getTime();
        const dateB = new Date(b.common.created_at).getTime();
        return dateB - dateA;
      }
      case "cheaper": {
        const priceA = Number(a.rent_auto.cost_per_day);
        const priceB = Number(b.rent_auto.cost_per_day);
        return priceA - priceB;
      }
      case "more-expensive": {
        const priceA = Number(a.rent_auto.cost_per_day);
        const priceB = Number(b.rent_auto.cost_per_day);
        return priceB - priceA;
      }
      default:
        return 0;
    }
  });
};

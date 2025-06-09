import { FilterMenuDaily } from "./FilterMenuDaily";
import { FilterMenuDriverVac } from "./FilterMenuDriverVac";
import { FilterMenuRent } from "./FilterMenuRent";
import { FilterMenuCarSell } from "./FilterMenuCarSell";
import { useEffect } from "react";
import { FilterMenuWantedRent } from "./FilterMenuWantedRent";

export type FilterMenuProps = {
  filterType:
    | "RENT_AUTO"
    | "DAILY_RENT"
    | "BUY_AUTO"
    | "DRIVER_JOBS"
    | "AUTO_SERVICES"
    | "WANTED_RENT";
  isOpen: boolean;
  onClose: () => void;
};

export const FilterMenu = ({
  filterType,
  isOpen,
  onClose,
}: FilterMenuProps) => {
  useEffect(() => {
    const handleScrollLock = () => {
      if (window.innerWidth <= 550) {
        if (isOpen) {
          document.body.style.overflow = "hidden";
          document.body.style.paddingRight = "17px";
        } else {
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";
        }
      }
    };

    handleScrollLock();

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  console.log(filterType);

  switch (filterType) {
    case "RENT_AUTO":
    case "AUTO_SERVICES":
      return <FilterMenuRent isOpen={isOpen} onClose={onClose} />;
    case "DAILY_RENT":
      return <FilterMenuDaily isOpen={isOpen} onClose={onClose} />;
    case "BUY_AUTO":
      return <FilterMenuCarSell isOpen={isOpen} onClose={onClose} />;
    case "DRIVER_JOBS":
      return <FilterMenuDriverVac isOpen={isOpen} onClose={onClose} />;
    case "WANTED_RENT":
      return <FilterMenuWantedRent isOpen={isOpen} onClose={onClose} />;
    default:
      return null;
  }
};

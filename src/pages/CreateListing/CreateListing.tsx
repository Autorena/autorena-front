import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateListing.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";
import { CarRentListingForm } from "./CarRentListingForm";
import { categories } from "../../utils/categories";
import { WantedRentListingForm } from "./WantedRentListingForm";
import { DriverVacancyForm } from "./DriverVacancyForm";
import { CarSellListingForm } from "./CarSellListingForm";
import { useState } from "react";

export const CreateListing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const buyout = searchParams.get("buyout") === "true";
  const minimumRentalPeriod = Number(searchParams.get("minimum_rental_period"));
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const matchedCategory = categories.find((c) => {
    const isNameMatch = c.name === category;
    const isBuyoutMatch = (c.extraOptions?.buyout_possible ?? false) === buyout;
    const isMinPeriodMatch =
      (c.extraOptions?.minimum_rental_period ?? null) ===
      (minimumRentalPeriod || null);

    return isNameMatch && isBuyoutMatch && isMinPeriodMatch;
  });
  console.log(category);

  return (
    <div className="container">
      <div className={styles.new_listing}>
        <div className={styles.new_listing_top}>
          <button onClick={() => navigate(-1)} className={styles.arrow}>
            {" "}
            <Arrow />
          </button>

          <h2>{matchedCategory?.value}</h2>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        {category === "car_rent_listing" && (
          <CarRentListingForm
            buyout={buyout}
            minimumRentalPeriod={minimumRentalPeriod}
            setError={setError}
          />
        )}
        {category === "car_sell_listing" && <CarSellListingForm />}
        {category === "wanted_car_rent_listing" && <WantedRentListingForm />}
        {category === "driver_vacancy" && <DriverVacancyForm />}
      </div>
    </div>
  );
};

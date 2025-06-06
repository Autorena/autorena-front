import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CreateListing.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";
import { CarRentListingForm } from "./CarRentListingForm";
import { categories } from "../../utils/categories";
import { WantedRentListingForm } from "./WantedRentListingForm";
import { DriverVacancyForm } from "./DriverVacancyForm";

export const CreateListing = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const buyout = searchParams.get("buyout") === "true";
  const minimumRentalPeriod = Number(searchParams.get("minimum_rental_period"));

  const navigate = useNavigate();

  const matchedCategory = categories.find((c) => {
    const isNameMatch = c.name === category;
    const isBuyoutMatch = (c.extraOptions?.buyout_possible ?? false) === buyout;
    const isMinPeriodMatch =
      (c.extraOptions?.minimum_rental_period ?? null) ===
      (minimumRentalPeriod || null);

    return isNameMatch && isBuyoutMatch && isMinPeriodMatch;
  });

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
        {category === "car_rent_listing" && (
          <CarRentListingForm
            buyout={buyout}
            minimumRentalPeriod={minimumRentalPeriod}
          />
        )}
        {category === "wanted_car_rent_listing" && <WantedRentListingForm />}
        {category === "driver_vacancy" && <DriverVacancyForm />}
      </div>
    </div>
  );
};

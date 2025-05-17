import { CarCardType } from "../../types";
import { ActiveListing } from "../../ui-components/ActiveListing/ActiveListing";
import styles from "./PersonalProfile.module.scss";

export const ActiveListingsTab = ({
  listings,
}: {
  listings: CarCardType[];
}) => {
  return (
    <div className={styles.activeListings}>
      {listings.map((listing) => (
        <ActiveListing carData={listing} />
      ))}
    </div>
  );
};

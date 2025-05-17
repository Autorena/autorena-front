import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import styles from "./ChooseCategory.module.scss";
import { categories } from "../../utils/categories";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";

type Category = {
  name: string;
  value: string;
  extraOptions?: {
    buyout_possible?: boolean;
    minimum_rental_period?: number;
  };
};

export const ChooseCategory = () => {
  const navigate = useNavigate();

  const handleChoose = (category: Category) => {
    const query = new URLSearchParams({ category: category.name });
    if (category.extraOptions?.buyout_possible) query.set("buyout", "true");
    if (category.extraOptions?.minimum_rental_period)
      query.set("minimum_rental_period", "1");

    navigate(`/create-listing?${query.toString()}`);
  };

  return (
    <div className="container">
      <div className={styles.categories}>
        {" "}
        <Breadcrumbs />
        <div className={styles.categories_bottom}>
          <div className={styles.categories_bottom_top}>
            {" "}
            <button onClick={() => navigate(-1)} className={styles.btnBack}>
              <Arrow />
            </button>
            <h2>Выберите категорию</h2>
          </div>
          <div className={styles.categories_wrap}>
            {categories.map((c) => (
              <button
                className={styles.category}
                onClick={() => handleChoose(c)}
              >
                {c.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

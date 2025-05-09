import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import styles from "./ChooseCategory.module.scss";
import { categories } from "../../utils/categories";

export const ChooseCategory = () => {
  const navigate = useNavigate();

  const handleChoose = (category) => {
    const query = new URLSearchParams({ category: category.name });
    if (category.extraOptions?.buyout_possible) query.set("buyout", "true");

    navigate(`/create-listing?${query.toString()}`);
  };

  return (
    <div className="container">
      <div className={styles.categories}>
        {" "}
        <Breadcrumbs />
        <div className={styles.categories_bottom}>
          <h2>Выберите категорию</h2>
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

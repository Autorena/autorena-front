import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import styles from "./Favorites.module.scss";
import homeStyles from "../Home/Home.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { CarCardLarge } from "../../ui-components/CarCardLarge/CarCardLarge";

export const FavoritesDesktop = () => {
  const items = useAppSelector((state) => state.favorites.items);

  return (
    <div className="container">
      <Breadcrumbs />
      <div className={styles.favorites}>
        <div className={styles.favorites_main}>
          <h2 className={styles.favorites_title}>Избранное</h2>
          {items.length === 0 ? (
            <div className={styles.favorites_empty}>
              <LargeSvgImage src={getLargeSvgPath("no-favorites")} />
              <h4>Вы ничего не добавили в избранное</h4>
              <p>Сохраняйте понравившиеся объявления, чтобы не потерять их</p>
            </div>
          ) : (
            <div className={styles.favorites_wrap}>
              {items.map((i) => (
                <CarCardLarge key={i.id} carData={i} isFavoritePage />
              ))}
            </div>
          )}
        </div>
        <div className={homeStyles.home_ads}>
          <div className={homeStyles.home_ad}>
            <p>Здесь будет реклама</p>
          </div>
          <div className={homeStyles.home_ad}>
            <p>Здесь будет реклама</p>
          </div>
        </div>
      </div>
    </div>
  );
};

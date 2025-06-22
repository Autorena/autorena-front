import styles from "./Favorites.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";
import { ReactComponent as More } from "../../assets/more-icon-2.svg";
// import { ReactComponent as Search } from "../../assets/input-search.svg";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearFavorites } from "../../redux/favoritesSlice";
import { useDispatch } from "react-redux";
import { FavoriteFilter, FavoriteFilterType, CarCardType } from "../../types";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { useSortItems } from "../../hooks/useSortItems";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { FavoriteCarCard } from "./FavoriteCarCard";

export const FavoritesMobile = () => {
  const items = useAppSelector((state) => state.favorites.items);
  const allCars = useAppSelector((state) => state.cars.cars);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FavoriteFilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  console.log("favorites:", items);

  const categories: FavoriteFilter[] = [
    {
      type: "all",
      name: "Все",
    },
    {
      type: "long_term_rent",
      name: "Долгосрочная аренда",
    },
    {
      type: "daily_rent",
      name: "Посуточная аренда",
    },
    {
      type: "buy_cars",
      name: "Выкуп автомобилей",
    },
    {
      type: "driver_jobs",
      name: "Работа водителям",
    },
    {
      type: "search_renter",
      name: "Поиск арендатора",
    },
    {
      type: "auto_services",
      name: "Автосервисы",
    },
    {
      type: "road_help",
      name: "Помощь на дороге",
    },
  ];

  const filterByCategory = (item: CarCardType): boolean => {
    if (activeFilter === "all") return true;

    const listing = item.listing;

    switch (activeFilter) {
      case "long_term_rent":
        return !!listing.carRentListing;
      case "daily_rent":
        return (
          !!listing.carRentListing &&
          listing.carRentListing.rentDuration.includes("RENT_DURATION_FROM_DAY")
        );
      case "buy_cars":
        return !!listing.carSellListing;
      case "driver_jobs":
        return !!listing.driverJobListing;
      case "search_renter":
        return !!listing.wantedCarRentListing;
      case "auto_services":
        return !!listing.autoServiceListing;
      case "road_help":
        return !!listing.carBuyListing;
      default:
        return true;
    }
  };

  const filterBySearch = (item: CarCardType): boolean => {
    if (!searchQuery.trim()) return true;

    const listing = item.listing;
    const carContent =
      listing.carRentListing?.carContent ||
      listing.carSellListing?.carContent ||
      listing.driverJobListing?.carContent ||
      listing.wantedCarRentListing?.carContent ||
      listing.autoServiceListing?.carContent ||
      listing.carBuyListing?.carContent;

    if (!carContent) return false;

    const city =
      listing.carRentListing?.city ||
      listing.carSellListing?.city ||
      listing.driverJobListing?.city ||
      listing.wantedCarRentListing?.city ||
      listing.autoServiceListing?.city ||
      listing.carBuyListing?.city ||
      "";

    const searchText = [
      carContent.brandId,
      carContent.modelId,
      carContent.yearOfCarProduction.toString(),
      carContent.color,
      city,
    ]
      .join(" ")
      .toLowerCase();

    return searchText.includes(searchQuery.toLowerCase());
  };

  const combinedFilter = (item: CarCardType): boolean => {
    return filterByCategory(item) && filterBySearch(item);
  };

  const { processedItems, sortOptions } = useSortItems({
    items,
    sortOption,
    filterFunction: combinedFilter,
    activeFilter,
  });

  const handleFilterClick = (filterType: FavoriteFilterType) => {
    setActiveFilter(filterType);
  };

  const handleSortChange = (value: string | string[]) => {
    if (typeof value === "string") {
      setSortOption(value);
    }
  };

  const getSimilarCars = () => {
    if (items.length === 0 || !allCars) return [];

    const favoriteBrands = items
      .map((item) => item.listing.carRentListing?.carContent?.brandId)
      .filter(Boolean);

    const favoriteIds = items.map((item) => item.listing.id);
    const similarCars = allCars.filter(
      (car) =>
        !favoriteIds.includes(car.listing.id) &&
        favoriteBrands.includes(car.listing.carRentListing?.carContent?.brandId)
    );

    return similarCars.slice(0, 3);
  };

  const similarCars = getSimilarCars();

  return (
    <div className="container">
      {items.length === 0 ? (
        <>
          <div className={styles.favorites_mob_header}>
            <h3>Избранное</h3>
          </div>
          <div className={styles.favorites_empty}>
            <LargeSvgImage src={getLargeSvgPath("no-favorites")} />
            <h4>Вы ничего не добавили в избранное</h4>
            <p>
              Сохраняйте понравившиеся <br /> объявления, чтобы не потерять их
            </p>
          </div>
          <HeaderMobile />
        </>
      ) : (
        <div className={styles.favorites_mobile}>
          <div
            className={styles.favorites_mob_header}
            style={{ display: "flex" }}
          >
            <button onClick={() => navigate(-1)}>
              <Arrow />
            </button>
            <h3>Избранное</h3>
            <div className={styles.favorites_btnWrap}>
              <button onClick={() => setIsShowMenu((prev) => !prev)}>
                <More />
              </button>
              {isShowMenu && (
                <div className={styles.favorites_menuMore}>
                  <button onClick={() => dispatch(clearFavorites())}>
                    Удалить все
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.favorites_search}>
            {/* <Search /> */}
            <img src="/assets/input-search.svg" alt="Search" />
            <input
              type="text"
              placeholder="Поиск в избранном"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.favorites_filters}>
            {categories.map((category) => (
              <button
                key={category.type}
                className={`${styles.favorites_filter} ${
                  activeFilter === category.type ? styles.active : ""
                }`}
                onClick={() => handleFilterClick(category.type)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className={styles.favorites_sort}>
            <DropdownList
              options={sortOptions}
              value={sortOption}
              onSelect={handleSortChange}
              buttonStyles={{ fontSize: "14px" }}
              listStyles={{ fontSize: "14px" }}
            />
          </div>
          <LargeSvgImage
            src={getLargeSvgPath("profile-banner-2")}
            className={styles.favorites_banner}
          />
          <div className={styles.favorites_mobile_wrap}>
            {processedItems.length === 0 ? (
              <div className={styles.favorites_empty_results}></div>
            ) : (
              processedItems.map((i) => (
                <FavoriteCarCard key={i.listing.id} carData={i} />
              ))
            )}
          </div>

          <div className={styles.favorites_mobile_similar}>
            <h3>Похоже на то, что вам понравилось</h3>
            <div className={styles.favorites_mobile_wrap}>
              {similarCars.length > 0
                ? similarCars.map((car) => (
                    <FavoriteCarCard
                      key={car.listing.id}
                      carData={car}
                      isSimilar
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
      <HeaderMobile />
    </div>
  );
};

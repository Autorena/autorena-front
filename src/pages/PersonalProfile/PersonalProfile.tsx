import styles from "./PersonalProfile.module.scss";
import { ReactComponent as ChangePhoto } from "../../assets/change-photo.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as PlusProfile } from "../../assets/plus-profile.svg";
import { StarRating } from "../../ui-components/StarRating/StarRating";
import { useContext, useRef, useState } from "react";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { Tabs } from "../../ui-components/Tabs/Tabs";
import { ActiveListingsTab } from "./ActiveListingsTab";
import { useAppSelector } from "../../redux/hooks";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { ModalContext } from "../../HOC/ModalProvider";
import { FillWallet } from "../../components/modals/FillWallet";
import { Link } from "react-router-dom";

export const profileTabs = [
  {
    id: 1,
    label: "Активные",
    content: (
      <ActiveListingsTab
        listings={[
          {
            common: {
              id: "30",
              photos: [
                "car-large.svg",
                "car-large.svg",
                "car-large.svg",
                "car-large.svg",
                "car-large.svg",
              ],
              title: "Аренда TOYOTA Land Cruiser 200",
              description:
                "Mашина aбcолютнo новaя комплектация Ultimаtе. Куплeна в 2024 гoду в сaлонe у официального дилеpa зa наличку, все чеки имеются. Машина на гарантии, русификация, полный пакет документов и.т. д ",
              city: "Новокузнецк",
              district: "Центральный",
              address: "г. Москва, Ярославское шоссе, д 6",
              category: "AUTO_SERVICES",
              created_at: "2025-03-15T12:34:56Z",
            },
            rent_auto: {
              cost_per_day: 12000,
              taxi_possible: false,
              buy_option: true,
              year: 2024,
              color: "black",
              discount: 0,
              min_rental_period_days: 1,
            },
            daily_rent: {
              cost_per_day: 12000,
              delivery_possible: true,
              deposit_required: true,
              buy_option: false,
            },
          },
          {
            common: {
              id: "22",
              photos: ["car.svg"],
              title: "Аренда Li L7 2024",
              description:
                "Mашина aбcолютнo новaя комплектация Ultimаtе. Куплeна в 2024 гoду в сaлонe у официального дилеpa зa наличку, все чеки имеются. Машина на гарантии, русификация, полный пакет документов и.т. д ",
              city: "Иркутск",
              district: "Правобережный",
              address: "г. Москва, Ярославское шоссе, д 6",
              category: "DRIVER_JOBS",
              created_at: "2025-04-07T12:34:56Z",
            },
            rent_auto: {
              cost_per_day: 12000,
              taxi_possible: false,
              buy_option: true,
              year: 2024,
              color: "black",
              discount: 0,
              min_rental_period_days: 1,
            },
            driver_job: {
              cost_per_day: 12000,
              buy_option: true,
            },
          },
        ]}
      />
    ),
  },
  {
    id: 2,
    label: "Архив",
    content: <div>aрхив</div>,
  },
];

export const PersonalProfile = () => {
  const carsData = useAppSelector((state) => state.cars.cars);
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const [profileImg, setProfileImg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container">
      <div className={styles.profile}>
        <div className={styles.profile_headerMob}>
          <button>
            <Share />
          </button>
          <h3>Профиль</h3>
          <button>
            <Settings />
          </button>
        </div>
        <div className={styles.profileWrap}>
          <div className={styles.profile_left}>
            <div className={styles.profile_info}>
              <div
                className={`${styles.profile_imgWrap} ${
                  !profileImg ? styles.empty : ""
                }`}
              >
                {profileImg && (
                  <img
                    src={profileImg}
                    alt="Profile image"
                    className={styles.profile_img}
                  />
                )}
                <button
                  className={styles.profile_changeImg}
                  onClick={triggerFileInput}
                >
                  <ChangePhoto />
                </button>
                <button
                  className={styles.profile_addProfile}
                  onClick={triggerFileInput}
                >
                  <PlusProfile />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
              <p className={styles.profile_name}>Александр</p>
              <div className={styles.profile_rateWrap}>
                <span className={styles.profile_rate}>4,6</span>
                <StarRating
                  rating={4.6}
                  starSize={12}
                  starGap="2px"
                  className={styles.profile_rateStars}
                />
                <span className={styles.profile_rateCount}>12 отзывов</span>
              </div>
              <button className={styles.profile_edit}>
                Редактировать профиль
              </button>
            </div>
          </div>
          <div className={styles.profile_right}>
            <div className={styles.profile_balanceInfo}>
              <h3>Баланс кошелька</h3>
              <div className={styles.profile_balanceWrap}>
                <div className={styles.profile_balance}>
                  0<span>₽</span>
                </div>
                <button
                  className={styles.profile_replenish}
                  onClick={() => {
                    setModalActive(true);
                    setModalContent(<FillWallet />);
                  }}
                >
                  <Plus />
                </button>
                <button
                  className={styles.profile_replenishMob}
                  onClick={() => {
                    setModalActive(true);
                    setModalContent(<FillWallet />, {
                      isRootModal: true,
                    });
                  }}
                >
                  Пополнить
                </button>
                <Link
                  to="/my-listings"
                  className={styles.profile_listings_link}
                >
                  Мои объявления
                  <Arrow />
                </Link>
              </div>
            </div>
            <div className={styles.profile_listings}>
              <h3>Мои объявления</h3>
              <Tabs tabs={profileTabs} />
            </div>
            <div className={styles.profile_recommends}>
              <h3>Возможно вам будет интересно</h3>
              <div className={styles.profile_recommendsWrap}>
                {carsData.slice(0, 4).map((car) => (
                  <CarCard carData={car} />
                ))}
              </div>
            </div>
            <div className={styles.profile_footer}>
              <a href="#">База черного списка</a>
              <a href="#">Помощь</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

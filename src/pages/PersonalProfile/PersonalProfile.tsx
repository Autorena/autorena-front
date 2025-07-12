import styles from "./PersonalProfile.module.scss";
import { ReactComponent as ChangePhoto } from "../../assets/change-photo.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";
import { ReactComponent as PlusProfile } from "../../assets/plus-profile.svg";
import { ReactComponent as Notific } from "../../assets/notification.svg";
import { LargeSvgImage } from "../../components/LargeSvgImage";
import { getLargeSvgPath } from "../../utils/largeSvgPaths";
import { StarRating } from "../../ui-components/StarRating/StarRating";
import { JSX, useRef, useState } from "react";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { Tabs } from "../../ui-components/Tabs/Tabs";
import { ActiveListingsTab } from "./ActiveListingsTab";
import { useAppSelector } from "../../redux/hooks";
import { CarCard } from "../../ui-components/CarCard/CarCard";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";
import { RatingStar } from "../../ui-components/RatingStar/RatingStar";
import { Icons } from "./Icons";
import { ShareBtn } from "../../ui-components/ShareBtn/ShareBtn";
import { BottomSheet } from "../../ui-components/BottomSheet/BottomSheet";
import { useForm } from "react-hook-form";

export const PersonalProfile = () => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isBannerSheetOpen, setIsBannerSheetOpen] = useState(false);
  const { register } = useForm();
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const { cars } = useAppSelector((state) => state.cars);
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

  const toggleDropdown = (text: string) => {
    setOpenDropdowns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(text)) {
        newSet.delete(text);
      } else {
        newSet.add(text);
      }
      return newSet;
    });
  };

  const userListings = cars.slice(0, 2);

  const profileTabs = [
    {
      id: 1,
      label: "Активные",
      content: <ActiveListingsTab listings={userListings} />,
    },
    {
      id: 2,
      label: "Архив",
      content: <div>aрхив</div>,
    },
  ];

  type DropdownItem = {
    to: string;
    text: string;
  };

  type MenuItem = {
    to: string;
    icon:
      | React.ComponentType<React.SVGProps<SVGSVGElement>>
      | (() => JSX.Element);
    text: string;
    dropdown?: DropdownItem[];
  };

  const mainLinks: MenuItem[] = [
    { to: "/my_listings", icon: Icons.Listing, text: "Мои объявления" },
    { to: "/develop", icon: Icons.Documents, text: "Мои документы" },
    { to: "/develop", icon: Icons.Wallet, text: "Способы оплаты" },
    { to: "/develop", icon: Icons.Car, text: "Парк автомобилей" },
    { to: "/develop", icon: Icons.Agent, text: "База черного списка" },
    { to: "/develop", icon: Icons.Eye, text: "CPM Autorena" },
    { to: "/choose-category", icon: Icons.Plus, text: "Разместить объявление" },
  ];

  const secondaryLinks: MenuItem[] = [
    { to: "/develop", icon: Icons.Message, text: "Отзывы" },
    { to: "/favorites", icon: Icons.Favorite, text: "Избранное" },
    { to: "/notifications", icon: Icons.Notific, text: "Уведомления" },
    { to: "/develop", icon: Icons.Wallet, text: "Пополнить кошелек" },
    { to: "/develop", icon: Icons.Suitcase, text: "Autorena для бизнеса" },
  ];

  const footerLinks: MenuItem[] = [
    {
      to: "/develop",
      icon: () => <Icons.Settings width={22} height={22} />,
      text: "Настройки",
    },
    {
      to: "/develop",
      icon: Icons.Support,
      text: "Поддержка",
      dropdown: [
        { to: "/develop", text: "FAQ" },
        { to: "https://t.me/autorena_911_bot", text: "Связаться с поддержкой" },
        { to: "/develop", text: "Оставить отзыв" },
      ],
    },
    { to: "/develop", icon: Icons.Logo3, text: "О сервисе" },
  ];

  const renderLinks = (links: MenuItem[]) => (
    <div className={styles.profile_list}>
      {links.map(({ to, icon: Icon, text, dropdown }, index) => (
        <div key={index} className={styles.profile_list_wrap}>
          <button
            onClick={() => {
              if (dropdown) {
                toggleDropdown(text);
              } else {
                navigate(to);
              }
            }}
            className={`${styles.profile_list_item} ${
              dropdown ? styles.profile_list_item_dropdown : ""
            } ${
              dropdown && openDropdowns.has(text)
                ? styles.profile_list_item_active
                : ""
            }`}
          >
            <Icon />
            {text}
          </button>
          {dropdown && openDropdowns.has(text) && (
            <ul className={styles.profile_dropdown}>
              {dropdown.map((item, idx) => (
                <li key={idx}>
                  {item.to.startsWith("http") ? (
                    <a
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.profile_dropdown_item}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link to={item.to} className={styles.profile_dropdown_item}>
                      {item.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.profile_headerMob}>
        <Link to="/" className={styles.logo}>
          <LargeSvgImage src={getLargeSvgPath("logo-1")} />
        </Link>
        <div className={styles.profile_headerMob_right}>
          <ShareBtn
            title="Профиль"
            text="Посмотрите мой профиль на платформе аренды автомобилей Авторена"
            url={window.location.href}
            className={styles.shareBtn}
          />
          <Link to="/notifications">
            <Notific />
          </Link>
          <button onClick={() => navigate("/develop")}>
            <Settings />
          </button>
        </div>
      </div>
      <div className={styles.profile_container}>
        <div className="container">
          <div className={styles.profile}>
            <HeaderMobile />
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
                  <div className={styles.profile_info_right}>
                    <p className={styles.profile_name}>Александр</p>
                    <div className={styles.profile_rateWrap}>
                      <span className={styles.profile_rate}>4,6</span>
                      <StarRating
                        rating={4.6}
                        starSize={12}
                        starGap="2px"
                        className={styles.profile_rateStars}
                      />
                      <span className={styles.profile_rateCount}>
                        12 отзывов
                      </span>
                    </div>
                    <Link to="/develop" className={styles.profile_edit}>
                      Редактировать профиль
                      <Arrow />
                    </Link>
                  </div>
                  <div className={styles.profile_info_rating}>
                    <Link
                      to="/develop"
                      className={styles.profile_info_rating_rate}
                    >
                      {" "}
                      4,6
                      <RatingStar rating={4.6} size={12} />
                    </Link>
                    <p>Мой рейтинг</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsBannerSheetOpen(true);
                }}
              >
                <LargeSvgImage
                  src={getLargeSvgPath("profile-banner-1")}
                  className={styles.profile_banner}
                />
              </button>
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
                        setIsSheetOpen(true);
                      }}
                    >
                      <Plus />
                    </button>
                    <button
                      className={styles.profile_replenishMob}
                      onClick={() => {
                        setIsSheetOpen(true);
                      }}
                    >
                      Пополнить
                    </button>
                  </div>
                  <Link to="/develop" className={styles.link}>
                    Почему с кошелька оплачивать объявления выгодней?
                  </Link>
                </div>
                <div className={styles.profile_listings}>
                  <h3>Мои объявления</h3>
                  <Tabs tabs={profileTabs} />
                </div>
                <div className={styles.profile_recommends}>
                  <h3>Возможно вам будет интересно</h3>
                  <div className={styles.profile_recommendsWrap}>
                    {cars.slice(0, 4).map((car) => (
                      <CarCard key={car.id} carData={car} />
                    ))}
                  </div>
                </div>
                {renderLinks(mainLinks)}
                {renderLinks(secondaryLinks)}
                <Link to="/develop">
                  <LargeSvgImage
                    src={getLargeSvgPath("profile-banner-2")}
                    className={styles.profile_banner}
                  />
                </Link>
                {renderLinks(footerLinks)}
                <div className={styles.profile_footer}>
                  <a href="#">База черного списка</a>
                  <a href="#">Помощь</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomSheet
          isOpen={isBannerSheetOpen}
          onClose={() => setIsBannerSheetOpen(false)}
          defaultHeight={440}
        >
          <div className={styles.bannerSheet}>
            <div className={styles.bannerSheet_content}>
              <img
                src="/src/assets/profile-banner-1.svg"
                alt="Арендаторы ищут"
                className={styles.bannerSheet_image}
              />
              <h3 className={styles.bannerSheet_title}>
                Арендаторы ищут автомобили
              </h3>
              <p className={styles.bannerSheet_text}>
                В этом разделе арендаторы размещают объявления о поиске
                автомобилей. Вы можете найти клиентов, которые уже готовы
                арендовать ваш автомобиль на определенных условиях. Это отличная
                возможность быстрее найти арендатора и начать зарабатывать.
              </p>
              <button
                className={`red-btn ${styles.bannerSheet_button}`}
                onClick={() => {
                  navigate("/");
                  setIsBannerSheetOpen(false);
                }}
              >
                Посмотреть объявления
              </button>
            </div>
          </div>
        </BottomSheet>
        <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          <form className={styles.wallet}>
            <h2 className={styles.wallet_title}>Пополнение кошелька</h2>
            <div className={styles.inputWrap}>
              <input
                type="number"
                placeholder="1000 ₽"
                {...register("amount", {
                  required: "Поле обязательно",
                })}
              />
              <button className={`red-btn ${styles.confirmBtn}`} type="submit">
                Подтвердить
              </button>
            </div>
            <p className={styles.info_text}>Введите сумму к пополнению</p>
            <div className={styles.wallet_bottom}>
              <h4>Выберите способ пополнения</h4>
            </div>
          </form>
        </BottomSheet>
      </div>
    </>
  );
};

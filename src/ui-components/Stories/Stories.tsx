import styles from "./Stories.module.scss";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import story_1 from "../../assets/story_1.png";
import story_2 from "../../assets/story_2.png";
import { useContext } from "react";
import { StoryViewer } from "../../components/modals/StoryViewer/StoryViewer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { ModalContext } from "../../HOC/ModalProvider";
import { RegistrationModal } from "../../components/modals/RegistrationModal";

export const Stories = () => {
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      img: story_1,
      title: "Правильная аренда авто",
      content: (
        <button
          onClick={() => {
            if (isPhoneConfirmed) {
              setModalContent(null);
              setModalActive(false);
              navigate("/profile");
            } else {
              setModalContent(<RegistrationModal />);
            }
          }}
          className="red-btn"
        >
          Подробнее
        </button>
      ),
    },
    {
      id: 2,
      img: story_2,
      title: "Главное про аренду авто",
      content: "",
    },
    {
      id: 3,
      img: story_1,
      title: "Правильная аренда авто",
      content: "",
    },
    {
      id: 4,
      img: story_2,
      title: "Главное про аренду авто",
      content: "",
    },
    {
      id: 5,
      img: story_1,
      title: "Правильная аренда авто",
      content: "",
    },
    {
      id: 6,
      img: story_2,
      title: "Главное про аренду авто",
      content: "",
    },
    {
      id: 7,
      img: story_1,
      title: "Правильная аренда авто",
      content: "",
    },
  ];

  const handleStoryClick = (index: number) => {
    setModalActive(true);
    setModalContent(
      <StoryViewer
        storiesData={stories}
        initialIndex={index}
        onClose={() => setModalContent(null)}
      />,
      { modalClass: styles.storyModal }
    );
  };

  return (
    <div className={styles.stories}>
      <div className="swiper-wrap">
        <div className="swiper-arrow custom-button-prev">
          <Arrow />
        </div>
        <Swiper
          // spaceBetween={24}
          // slidesPerView={5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 3.7,
              spaceBetween: 12,
            },
            550: {
              slidesPerView: 5,
            },
            1000: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
        >
          {stories.map((s, i) => (
            <SwiperSlide key={i}>
              <button
                className={styles.story}
                onClick={() => handleStoryClick(i)}
              >
                <div className={styles.story_img_wrapper}>
                  <img src={s.img} alt="" className={styles.story_img} />
                </div>
                <h3 className={styles.story_title}>{s.title}</h3>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-arrow custom-button-next">
          <Arrow />
        </div>
      </div>
    </div>
  );
};

import styles from "./Stories.module.scss";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import story1 from "../../assets/story-1.png";
import story1_1 from "../../assets/story-1-1.png";
import story_2 from "../../assets/story-2.png";
import story_3 from "../../assets/story-3.png";
import story_4 from "../../assets/story-4.png";
import stylesStory from "../../components/modals/StoryViewer/StoryViewer.module.scss";
import { useContext } from "react";
import { StoryViewer } from "../../components/modals/StoryViewer/StoryViewer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { ModalContext } from "../../HOC/ModalProvider";
import { RegistrationModal } from "../../components/modals/RegistrationModal";
import { StoryGroup } from "../../types";

export const Stories = () => {
  const { setModalContent, setModalActive } = useContext(ModalContext);
  const { isPhoneConfirmed } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const stories: StoryGroup[] = [
    {
      id: 1,
      img: story1_1,
      title: "Розыгрыш IPhone 16 PRO",
      slides: [
        { background: story1, content: <button>Узнать подробнее</button> },
        {
          content: <p>Подробности акции</p>,
        },
      ],
    },
    {
      id: 2,
      img: story_2,
      title: "Быстро СНЯТЬ автомобиль",
      slides: [
        {
          content: <p> слайд 2</p>,
        },
        {
          content: <p> слайд 2 - подробности</p>,
        },
      ],
    },
    {
      id: 3,
      img: story_3,
      title: "Легко СДАТЬ автомобиль",
      slides: [
        {
          content: <p> слайд 3</p>,
        },
      ],
    },
    {
      id: 4,
      img: story_4,
      title: "Важное про документы",
      slides: [
        {
          content: <p> слайд 4</p>,
        },
      ],
    },
    {
      id: 1,
      img: story1_1,
      title: "Розыгрыш IPhone 16 PRO",
      slides: [
        { background: story1, content: <button>Узнать подробнее</button> },
        {
          content: <p>Подробности акции</p>,
        },
      ],
    },
    {
      id: 2,
      img: story_2,
      title: "Быстро СНЯТЬ автомобиль",
      slides: [
        {
          content: <p> слайд 2</p>,
        },
        {
          content: <p> слайд 2 - подробности</p>,
        },
      ],
    },
    {
      id: 3,
      img: story_3,
      title: "Легко СДАТЬ автомобиль",
      slides: [
        {
          content: <p> слайд 3</p>,
        },
      ],
    },
    {
      id: 4,
      img: story_4,
      title: "Важное про документы",
      slides: [
        {
          content: <p> слайд 4</p>,
        },
      ],
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
    <div className={`stories ${styles.stories}`}>
      <div className="swiper-wrap">
        <div className="swiper-arrow custom-button-prev">
          <Arrow />
        </div>
        <Swiper
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

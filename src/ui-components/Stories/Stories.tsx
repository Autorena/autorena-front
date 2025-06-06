import styles from "./Stories.module.scss";
import modalStyles from "../Modal/Modal.module.scss";
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
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { StoryGroup } from "../../types";
import { StoryViewer } from "../../components/modals/StoryViewer/StoryViewer";

export const Stories = () => {
  const { setModalContent, setModalActive } = useContext(ModalContext);

  const stories: StoryGroup[] = [
    {
      id: 1,
      img: story1_1,
      title: "Розыгрыш IPhone 16 PRO",
      slides: [
        { background: story1, content: <button></button> },
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
      {
        modalClass: `${styles.storyModal} ${modalStyles.other}`,
        skipHistory: true,
      }
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
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.8,
              spaceBetween: 12,
            },
            440: {
              slidesPerView: 2.2,
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

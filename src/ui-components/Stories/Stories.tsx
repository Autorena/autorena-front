import styles from "./Stories.module.scss";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import story_1 from "../../assets/story_1.png";
import story_2 from "../../assets/story_2.png";
import { useState } from "react";
import { StoryViewer } from "../../components/modals/StoryViewer/StoryViewer";

export const Stories = () => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const stories = [
    {
      id: 1,
      img: story_1,
      title: "Правильная аренда авто",
    },
    {
      id: 2,
      img: story_2,
      title: "Главное про аренду авто",
    },
    {
      id: 3,
      img: story_1,
      title: "Правильная аренда авто",
    },
    {
      id: 4,
      img: story_2,
      title: "Главное про аренду автоо",
    },
    {
      id: 5,
      img: story_1,
      title: "Правильная аренда авто",
    },
    {
      id: 6,
      img: story_2,
      title: "Главное про аренду авто",
    },
    {
      id: 7,
      img: story_1,
      title: "Правильная аренда авто",
    },
  ];

  return (
    <div className={styles.stories}>
      <div className="swiper-wrap">
        <div className="swiper-arrow custom-button-prev">
          <Arrow />
        </div>
        <Swiper
          spaceBetween={24}
          slidesPerView={5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-button-next",
            prevEl: ".custom-button-prev",
          }}
        >
          {stories.map((s, i) => (
            <SwiperSlide key={i}>
              <button className={styles.story} onClick={() => setModalIndex(i)}>
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
      {modalIndex !== null && (
        <StoryViewer
          storiesData={stories}
          initialIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </div>
  );
};

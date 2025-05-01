import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./StoryViewer.module.scss";
import { ReactComponent as Arrow } from "../../../assets/swiper-arrow.svg";
import { ReactComponent as Cross } from "../../../assets/cross.svg";
import { StoryModalProps } from "../../../types";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ModalContext } from "../../../HOC/ModalProvider";

export const StoryViewer = ({
  storiesData,
  initialIndex,
  onClose,
}: StoryModalProps) => {
  const { setModalActive } = useContext(ModalContext);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (currentIndex === storiesData.length - 1) {
      const timer = setTimeout(() => onClose(), 7000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="story-viewer">
      <div className={styles.story_slider} onClick={(e) => e.stopPropagation()}>
        <Swiper
          initialSlide={currentIndex}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".story-button-next",
            prevEl: ".story-button-prev",
          }}
          autoplay={{ delay: 7000, stopOnLastSlide: true }}
          // centeredSlides={true}
          loop={false}
          breakpoints={{
            320: {
              spaceBetween: 40,
              slidesPerView: 1,
              centeredSlides: true,
            },
            768: {
              spaceBetween: 184,
              slidesPerView: "auto",
              centeredSlides: true,
            },
          }}
        >
          {storiesData.map((story, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${styles.storyCard} ${
                  index === currentIndex ? styles.center : styles.faded
                }`}
              >
                {index === currentIndex && (
                  <button
                    className={styles.closeBtn}
                    onClick={() => setModalActive(false)}
                  >
                    <Cross />
                  </button>
                )}
                <button
                  className={`story-button-prev swiper-arrow ${styles.arrowPrev}`}
                >
                  <Arrow />
                </button>
                {index === currentIndex && (
                  <>
                    <div className={styles.progress_container}>
                      <div
                        className={styles.progress_bar}
                        key={currentIndex}
                      ></div>
                    </div>
                  </>
                )}
                <p>{story.title}</p>
                <p>{story.id}</p>
                <div className={styles.storyInner}>{story.content}</div>
                <button
                  className={`story-button-next swiper-arrow ${styles.arrowNext}`}
                >
                  <Arrow />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

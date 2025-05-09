import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./StoryViewer.module.scss";
import { ReactComponent as Arrow } from "../../../assets/swiper-arrow.svg";
import { ReactComponent as Cross } from "../../../assets/cross.svg";
import { StoryModalProps } from "../../../types";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ModalContext } from "../../../HOC/ModalProvider";

export const StoryViewer = ({
  storiesData,
  initialIndex,
  onClose,
}: StoryModalProps) => {
  const { setModalActive } = useContext(ModalContext);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentGroup = storiesData[currentGroupIndex];

  const goToNextSlideOrGroup = () => {
    const isLastSlide = currentSlideIndex >= currentGroup.slides.length - 1;
    const isLastGroup = currentGroupIndex >= storiesData.length - 1;

    if (!isLastSlide) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (!isLastGroup) {
      setCurrentGroupIndex((prev) => prev + 1);
      setCurrentSlideIndex(0);
      setIsTransitioning(false);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    // if (isPaused || isTransitioning) return;

    const timer = setTimeout(goToNextSlideOrGroup, 7000);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, currentGroupIndex, isPaused, isTransitioning]);

  useEffect(() => {
    if (currentSlideIndex === 0 && !isPaused && !isTransitioning) {
      const timer = setTimeout(goToNextSlideOrGroup, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentGroupIndex]);

  useEffect(() => {
    setIsTransitioning(false);
  }, [currentGroupIndex]);

  return (
    <div className="story-viewer">
      <div className={styles.story_slider} onClick={(e) => e.stopPropagation()}>
        <Swiper
          initialSlide={initialIndex}
          onSlideChange={(swiper) => {
            const newIndex = swiper.realIndex;
            setCurrentGroupIndex(newIndex);
            setCurrentSlideIndex(0);
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: ".story-button-next",
            prevEl: ".story-button-prev",
          }}
          loop={false}
          breakpoints={{
            0: {
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
          {storiesData.map((group, groupIndex) => {
            const isCurrent = groupIndex === currentGroupIndex;
            const activeSlide = group.slides[isCurrent ? currentSlideIndex : 0];

            return (
              <SwiperSlide key={groupIndex}>
                <div
                  className={`${styles.storyCard} ${
                    isCurrent ? styles.center : styles.faded
                  }`}
                  style={{
                    backgroundImage: `url(${activeSlide?.background || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {isCurrent && (
                    <>
                      <button
                        className={styles.closeBtn}
                        onClick={() => setModalActive(false)}
                      >
                        <Cross />
                      </button>

                      <div className={styles.progress_bars_container}>
                        {group.slides.map((_, idx) => {
                          const isFilled = idx < currentSlideIndex;
                          const isActive = idx === currentSlideIndex;
                          return (
                            <div
                              key={`${groupIndex}-${idx}`}
                              className={`${styles.progress_bar} ${
                                isFilled
                                  ? styles.filled
                                  : isActive
                                  ? styles.active
                                  : ""
                              }`}
                              style={{
                                animation:
                                  isActive && !isTransitioning
                                    ? "fillProgress 7s linear forwards"
                                    : undefined,
                              }}
                            ></div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <button
                    className={`story-button-prev swiper-arrow ${styles.arrowPrev}`}
                  >
                    <Arrow />
                  </button>

                  <div className={styles.storyInner}>
                    {activeSlide?.content}
                  </div>

                  <button
                    className={`story-button-next swiper-arrow ${styles.arrowNext}`}
                  >
                    <Arrow />
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

import { useContext, useState, useCallback, useEffect } from "react";
import Stories from "react-insta-stories";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import styles from "./StoryViewer.module.scss";
import { ReactComponent as Cross } from "../../../assets/cross.svg";
import { ReactComponent as Arrow } from "../../../assets/swiper-arrow.svg";
import { StoryModalProps } from "../../../types";
import "swiper/css";
import { ModalContext } from "../../../HOC/ModalProvider";

const STORY_DURATION = 7000;

export const StoryViewer = ({ storiesData, initialIndex }: StoryModalProps) => {
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialIndex);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (swiper && swiper.activeIndex !== currentGroupIndex) {
      swiper.slideTo(currentGroupIndex);
    }
  }, [currentGroupIndex, swiper]);

  const transformStories = useCallback((group: (typeof storiesData)[0]) => {
    return group.slides.map((slide) => ({
      url: slide.background,
      duration: STORY_DURATION,
      content: () => (
        <div
          className={styles.story_content}
          style={{
            backgroundImage: slide.background
              ? `url(${slide.background})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundClip: "padding-box",
            width: "100%",
            height: "100%",
          }}
        >
          {slide.content}
        </div>
      ),
    }));
  }, []);

  const handleAllStoriesEnd = useCallback(() => {
    if (currentGroupIndex < storiesData.length - 1) {
      const nextIndex = currentGroupIndex + 1;
      setCurrentGroupIndex(nextIndex);
      swiper?.slideTo(nextIndex, 300);
    } else {
      setModalActive(false);
      setModalContent(null);
    }
  }, [currentGroupIndex, storiesData.length, swiper]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setModalActive(false);
      setModalContent(null);
    },
    [setModalActive, setModalContent]
  );

  const handlePrevClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentGroupIndex > 0) {
        const prevIndex = currentGroupIndex - 1;
        setCurrentGroupIndex(prevIndex);
      }
    },
    [currentGroupIndex]
  );

  const handleNextClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentGroupIndex < storiesData.length - 1) {
        const nextIndex = currentGroupIndex + 1;
        setCurrentGroupIndex(nextIndex);
      }
    },
    [currentGroupIndex, storiesData.length]
  );

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalActive(false);
      setModalContent(null);
    }
  };

  return (
    <div className={styles.storyViewer} onClick={handleOverlayClick}>
      <div className={`${styles.story_slider} story-viewer`}>
        <Swiper
          initialSlide={initialIndex}
          onSwiper={setSwiper}
          onSlideChange={(swiper) => {
            console.log("Slide changed:", {
              activeIndex: swiper.activeIndex,
              currentGroupIndex,
              realIndex: swiper.realIndex,
            });
            setCurrentGroupIndex(swiper.activeIndex);
          }}
          loop={false}
          allowTouchMove={true}
          speed={300}
          centeredSlides={true}
          slideToClickedSlide={true}
          breakpoints={{
            0: {
              spaceBetween: 20,
              slidesPerView: 1,
              centeredSlides: true,
            },
            768: {
              spaceBetween: 100,
              slidesPerView: 1,
              centeredSlides: true,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
            900: {
              spaceBetween: 140,
              slidesPerView: "auto",
              centeredSlides: true,
              width: null,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
            },
          }}
        >
          {storiesData.map((group, groupIndex) => {
            const isCurrent = groupIndex === currentGroupIndex;
            const stories = transformStories(group);

            return (
              <SwiperSlide
                key={groupIndex}
                className={styles.story_slide}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`${styles.story_card} ${
                    isCurrent ? styles.center : styles.faded
                  }`}
                >
                  {isCurrent && (
                    <>
                      <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={handleClose}
                        aria-label="Close stories"
                      >
                        <Cross />
                      </button>

                      {currentGroupIndex > 0 && (
                        <button
                          type="button"
                          className={`${styles.nav_arrow} ${styles.prev} story-prev`}
                          onClick={handlePrevClick}
                          aria-label="Previous story"
                        >
                          <Arrow />
                        </button>
                      )}

                      {currentGroupIndex < storiesData.length - 1 && (
                        <button
                          type="button"
                          className={`${styles.nav_arrow} ${styles.next} story-next`}
                          onClick={handleNextClick}
                          aria-label="Next story"
                        >
                          <Arrow />
                        </button>
                      )}

                      <div className={styles.story_content}>
                        <Stories
                          stories={stories}
                          defaultInterval={STORY_DURATION}
                          width="100%"
                          height="100%"
                          onAllStoriesEnd={handleAllStoriesEnd}
                          storyContainerStyles={{
                            background: "transparent",
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                          progressContainerStyles={{
                            gap: "4px",
                            filter: "none",
                            margin: "20px 0 0",
                            padding: "0 24px",
                          }}
                          progressWrapperStyles={{
                            background: "#efefef",
                            height: "6px",
                            margin: "0",
                            padding: "0",
                            borderRadius: "40px",
                          }}
                          progressStyles={{
                            background: "rgba(17, 17, 17, 0.24)",
                            height: "100%",

                            borderRadius: "40px",
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState, useEffect } from "react";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "../../pages/CarPage/CarPage.module.scss";

export const CarGallery = ({ photos }: { photos: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    setSlidesPerView(photos.length > 0 ? photos.length : 4);
  }, [photos]);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  return (
    <div className="car_photos">
      <div className={styles.swiper_top}>
        <button
          className={`btn-prev ${styles.arrow} ${styles.prev} swiper-arrow`}
        >
          <Arrow />
        </button>
        <Swiper
          spaceBetween={10}
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="SwiperThumbs"
          onSlideChange={handleSlideChange}
          speed={500}
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <img src={photo} alt={`Main Image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={`btn-next ${styles.arrow} ${styles.next} swiper-arrow`}
        >
          <Arrow />
        </button>
      </div>
      <div className={styles.swiper_counter}>
        <span className={styles.swiper_current}>{currentSlide}/</span>
        <span>{photos.length}</span>
      </div>
      <Swiper
        onSwiper={(swiper: SwiperType) => setThumbsSwiper(swiper)}
        spaceBetween={8}
        slidesPerView={slidesPerView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="SwiperThumbs_min"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img src={photo} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

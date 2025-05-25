import styles from "./Home.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export const HomeSlider = () => {
  return (
    <div className={styles.home_sliderWrap}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="home-slider"
        spaceBetween={20}
      >
        <SwiperSlide className={styles.home_slide}>
          <h3 className={styles.home_slider_title}>
            Найдите идеальный <br /> автомобиль в аренду
          </h3>
          <Link to="/">Перейти к поиску</Link>
        </SwiperSlide>
        <SwiperSlide className={styles.home_slide}></SwiperSlide>
      </Swiper>
    </div>
  );
};

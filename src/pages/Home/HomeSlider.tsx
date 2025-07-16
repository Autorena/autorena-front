import styles from "./Home.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import slide1desk from "../../assets/banner-desk-1.svg?url";
import slide1 from "../../assets/home-slide-1.png";
import slide2 from "../../assets/home-slide-2.png";
import slide3 from "../../assets/home-slider-3.png";

export const HomeSlider = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.home_sliderWrap}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="home-slider"
        spaceBetween={20}
      >
        {" "}
        <SwiperSlide className={styles.home_slide}>
          <picture>
            <source srcSet={slide1desk} media="(min-width: 769px)" />
            <img src={slide1} alt="" />
          </picture>
        </SwiperSlide>{" "}
        <SwiperSlide
          className={styles.home_slide}
          onClick={() => navigate("/filter/RENT_AUTO")}
        >
          <img src={slide2} alt="" />
        </SwiperSlide>
        <SwiperSlide className={styles.home_slide}>
          <img src={slide3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

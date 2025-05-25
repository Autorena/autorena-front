import { useState, useCallback } from "react";
import { LazyImage } from "../LazyImage/LazyImage";
import styles from "./CarGallery.module.scss";

interface CarGalleryProps {
  images: string[];
}

export const CarGallery = ({ images }: CarGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const handleNextClick = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <LazyImage
          src={images[currentImageIndex]}
          alt="Car gallery main image"
          className={styles.mainImageContent}
          width="100%"
          height={400}
        />
        {images.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={handlePrevClick}
              disabled={currentImageIndex === 0}
            >
              ←
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={handleNextClick}
              disabled={currentImageIndex === images.length - 1}
            >
              →
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                currentImageIndex === index ? styles.active : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <LazyImage
                src={image}
                alt={`Car thumbnail ${index + 1}`}
                className={styles.thumbnailImage}
                width={80}
                height={60}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import { ReactComponent as Star0 } from "../../assets/stars/star-0.svg";
import { ReactComponent as Star1 } from "../../assets/stars/star-1.svg";
import { ReactComponent as Star2 } from "../../assets/stars/star-2.svg";
import { ReactComponent as Star3 } from "../../assets/stars/star-3.svg";
import { ReactComponent as Star4 } from "../../assets/stars/star-4.svg";
import { ReactComponent as Star5 } from "../../assets/stars/star-5.svg";
import { ReactComponent as Star6 } from "../../assets/stars/star-6.svg";
import { ReactComponent as Star7 } from "../../assets/stars/star-7.svg";
import { ReactComponent as Star8 } from "../../assets/stars/star-8.svg";
import { ReactComponent as Star9 } from "../../assets/stars/star-9.svg";
import { ReactComponent as Star10 } from "../../assets/stars/star-10.svg";

type RatingStarProps = {
  rating: number;
  size?: number;
  className?: string;
};

const starComponents = {
  0: Star0,
  1: Star1,
  2: Star2,
  3: Star3,
  4: Star4,
  5: Star5,
  6: Star6,
  7: Star7,
  8: Star8,
  9: Star9,
  10: Star10,
  11: Star1,
  12: Star2,
  13: Star3,
  14: Star4,
  15: Star5,
  16: Star6,
  17: Star7,
  18: Star8,
  19: Star9,
  20: Star10,
  21: Star1,
  22: Star2,
  23: Star3,
  24: Star4,
  25: Star5,
  26: Star6,
  27: Star7,
  28: Star8,
  29: Star9,
  30: Star10,
  31: Star1,
  32: Star2,
  33: Star3,
  34: Star4,
  35: Star5,
  36: Star6,
  37: Star7,
  38: Star8,
  39: Star9,
  40: Star10,
  41: Star1,
  42: Star2,
  43: Star3,
  44: Star4,
  45: Star5,
  46: Star6,
  47: Star7,
  48: Star8,
  49: Star9,
  50: Star10,
};

export const RatingStar = ({
  rating,
  size = 24,
  className = "",
}: RatingStarProps) => {
  const getStarIndex = (rating: number): number => {
    const clampedRating = Math.max(0, Math.min(5, rating));
    return Math.round(clampedRating * 10);
  };

  const starIndex = getStarIndex(rating);
  const StarComponent =
    starComponents[starIndex as keyof typeof starComponents];

  return (
    <StarComponent
      style={{ width: size, height: size }}
      className={className}
    />
  );
};

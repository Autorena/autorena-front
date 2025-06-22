import { FavoritesDesktop } from "./FavoritesDesktop";
import { FavoritesMobile } from "./FavoritesMobile";
import { useScreenSize } from "../../hooks/useScreenSize";

export const Favorites = () => {
  const { isMobile } = useScreenSize();

  return isMobile ? <FavoritesMobile /> : <FavoritesDesktop />;
};

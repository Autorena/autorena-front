import { useScreenSize } from "../../hooks/useScreenSize";
import { NotificDesktop } from "./NotificDesktop";
import { NotificMobile } from "./NotificMobile";

export const Notifications = () => {
  const { isMobile } = useScreenSize();

  return isMobile ? <NotificMobile /> : <NotificDesktop />;
};

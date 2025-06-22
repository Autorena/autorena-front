import styles from "./Notifications.module.scss";
import { ReactComponent as Arrow } from "../../assets/arrowBack.svg";
import { ReactComponent as More } from "../../assets/more-icon-2.svg";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  notifications as initialNotifications,
} from "./NotificDesktop";
import { useState } from "react";

export const NotificMobile = () => {
  const navigate = useNavigate();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
    setIsShowMenu(false);
  };

  return (
    <div className="container">
      <div className={styles.notifications}>
        <div className={styles.notifications_mob_header}>
          <button onClick={() => navigate(-1)}>
            <Arrow />
          </button>
          <h4>Уведомления</h4>
          <div className={styles.notifications_btnWrap}>
            <button onClick={() => setIsShowMenu(!isShowMenu)}>
              <More />
              {isShowMenu && (
                <div className={styles.notifications_menuMore}>
                  <button onClick={markAllAsRead}>Прочитать все</button>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className={styles.notifications_mob_wrap}>
          {[...notifications]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((n) => (
              <div
                key={n.createdAt}
                className={`${styles.notifications_mob_item} ${
                  n.isRead ? "" : styles.unread
                }`}
              >
                <div className={styles.notifications_item_img}></div>
                <div className={styles.notifications_item_info}>
                  <h4>{n.title}</h4>
                  <p className={styles.notifications_item_text}>
                    {n.description}
                  </p>
                </div>
                <div className={styles.notifications_item_right}>
                  <p className={styles.date}>{formatDate(n.createdAt)}</p>
                  {!n.isRead && (
                    <span
                      className={styles.notifications_item_identifier}
                    ></span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import styles from "./Notifications.module.scss";
import { ReactComponent as Notification } from "../../assets/notification-2.svg";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  if (diffDays === 0) {
    return `Сегодня в ${hours}:${minutes}`;
  } else if (diffDays === 1) {
    return `Вчера в ${hours}:${minutes}`;
  } else {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year} в ${hours}:${minutes}`;
  }
};

export const notifications = [
  {
    title: "Новое сообщение",
    description: "Вам написал пользователь по объявлению 'Аренда BMW X5 2022'",
    createdAt: "2025-06-15T10:30:00Z",
    isRead: false,
  },
  {
    title: "Объявление одобрено",
    description:
      "Ваше объявление 'Аренда Mercedes C-Class' прошло модерацию и опубликовано",
    createdAt: "2025-06-17T15:45:00Z",
    isRead: true,
  },
  {
    title: "Новый отклик",
    description: "На ваше объявление 'Выкуп автомобилей' поступил новый отклик",
    createdAt: "2025-06-16T09:20:00Z",
    isRead: false,
  },
  {
    title: "Напоминание",
    description:
      "Не забудьте продлить объявление 'Аренда Audi A4' - срок действия истекает через 3 дня",
    createdAt: "2025-06-17T14:15:00Z",
    isRead: true,
  },
  {
    title: "Пора обновиться",
    description:
      "Скачайте новое обновление для того чтобы получить доступ к новым...",
    createdAt: "2025-05-11T11:00:00Z",
    isRead: true,
  },
];

export const NotificDesktop = () => {
  return (
    <div className="container">
      <Breadcrumbs />
      <div className={styles.notifications}>
        <div className={styles.notifications_main}>
          <h2 className={styles.notifications_title}>Уведомления</h2>
          {notifications.length === 0 ? (
            <div className={styles.notifications_empty}>
              <Notification />
              <p>У вас пока нет новых уведомлений</p>
            </div>
          ) : (
            <div className={styles.notificationsWrap}>
              {[...notifications]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((n) => (
                  <a href="#" className={styles.notifications_item}>
                    <p className={styles.date}>{formatDate(n.createdAt)}</p>
                    <p className={styles.title}>{n.title}</p>
                    <p className={styles.text}>{n.description}</p>
                  </a>
                ))}
            </div>
          )}
        </div>
        <div className={styles.ads}>
          <div className={styles.ad}>
            <p>Здесь будет реклама</p>
          </div>
        </div>
      </div>
    </div>
  );
};

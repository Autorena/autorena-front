import { Breadcrumbs } from "../../ui-components/Breadcrumbs/Breadcrumbs";
import styles from "./Messages.module.scss";
import { ReactComponent as Support } from "../../assets/support.svg";
import { ReactComponent as User } from "../../assets/user.svg";
import { ReactComponent as ArrowSend } from "../../assets/arrow-send.svg";
import { ReactComponent as ArrowRead } from "../../assets/arrow-read.svg";
import { ReactComponent as More } from "../../assets/more-icon-2.svg";
// import { ReactComponent as Search } from "../../assets/input-search.svg";
import logo from "../../assets/logo-1.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DropdownList } from "../../ui-components/DropdownList/DropdownList";
import { HeaderMobile } from "../../ui-components/HeaderMobile/HeaderMobile";

export const Messages = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [filterValue, setFilterValue] = useState("All");

  const mockMessages = [
    {
      id: 1,
      user: {
        name: "Александр",
        avatar: <User className={styles.message_avatar} />,
      },
      car: "Toyota Land Cruiser 200",
      image: "car-large.svg",
      messages: [
        {
          text: "Здравствуйте.",
          date: "20.03.2025",
          fromMe: true,
          isRead: true,
        },
        {
          text: "Интересует аренда.",
          date: "20.03.2025",
          fromMe: false,
          isRead: true,
        },
        {
          text: "Когда можно посмотреть?",
          date: "20.03.2025",
          fromMe: true,
          isRead: false,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Мария",
        avatar: <User className={styles.message_avatar} />,
      },
      car: "Toyota Land Cruiser 200",
      image: "car-large.svg",
      messages: [
        {
          text: "Здравствуйте. Подскажите, пожалуйста, можно ли арендовать автомобиль...",
          date: "19.03.2025",
          fromMe: false,
          isRead: true,
        },
        {
          text: "Да, автомобиль доступен.",
          date: "19.03.2025",
          fromMe: true,
          isRead: true,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Иван",
        avatar: <User className={styles.message_avatar} />,
      },
      car: "Toyota Land Cruiser 200",
      image: "car-large.svg",
      messages: [
        {
          text: "Актуально ли объявление?",
          date: "18.03.2025",
          fromMe: false,
          isRead: false,
        },
      ],
    },
    {
      id: 4,
      user: {
        name: "Иван",
        avatar: <User className={styles.message_avatar} />,
      },
      car: "Toyota Land Cruiser 200",
      image: "car-large.svg",
      messages: [
        {
          text: "Здравствуйте",
          date: "18.03.2025",
          fromMe: false,
          isRead: true,
        },
      ],
    },
    {
      id: 5,
      user: {
        name: "Александр",
        avatar: <User className={styles.message_avatar} />,
      },
      car: "Toyota Land Cruiser 200",
      image: "car-large.svg",
      messages: [
        {
          text: "Здравствуйте.",
          date: "20.03.2025",
          fromMe: false,
          isRead: false,
        },
        {
          text: "Интересует аренда.",
          date: "20.03.2025",
          fromMe: false,
          isRead: false,
        },
        {
          text: "Когда можно посмотреть?",
          date: "20.03.2025",
          fromMe: false,
          isRead: false,
        },
      ],
    },
  ];

  const [allMessages, setMessages] = useState(mockMessages);

  const filterMessages = (filter: string) => {
    switch (filter) {
      case "Read":
        return allMessages.filter((msg) => {
          const last = msg.messages[msg.messages.length - 1];
          return last.isRead;
        });
      case "Unread":
        return allMessages.filter((msg) => {
          const last = msg.messages[msg.messages.length - 1];
          return !last.fromMe && !last.isRead;
        });
      case "All":
      default:
        return allMessages;
    }
  };

  const filteredMessages = filterMessages(filterValue);

  const handleReadAll = () => {
    setMessages((prev) =>
      prev.map((chat) => ({
        ...chat,
        messages: chat.messages.map((msg) =>
          msg.fromMe ? msg : { ...msg, isRead: true }
        ),
      }))
    );
  };

  return (
    <div className="container">
      <Breadcrumbs />
      <div className={styles.messages}>
        <div className={styles.messages_main}>
          <div className={styles.messages_header}>
            <h2 className={styles.messages_title}>Сообщения</h2>
            <div className={styles.messages_btnWrap}>
              <button onClick={() => setIsShowMenu((prev) => !prev)}>
                {" "}
                <More />
              </button>
              {isShowMenu && (
                <div className={styles.messages_menuMore}>
                  <button onClick={() => setMessages([])}>Удалить все</button>
                  <button onClick={handleReadAll}>Прочитать все</button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.messages_searchWrap}>
            {/* <Search className={styles.searchIcon} /> */}
            <img
              src="/assets/input-search.svg"
              alt="Search"
              className={styles.searchIcon}
            />
            <input type="text" placeholder="Поиск по сообщениям" />
          </div>
          <div className={styles.messages_dropdown}>
            <DropdownList
              options={[
                { label: "Все", value: "All" },
                { label: "Прочитанные", value: "Read" },
                { label: "Непрочитанные", value: "Unread" },
              ]}
              buttonStyles={{ fontSize: "14px" }}
              listStyles={{ fontSize: "14px" }}
              value={filterValue}
              onSelect={setFilterValue}
            />
          </div>
          <Link to="/" className={styles.messages_support}>
            <div className={styles.left}>
              <Support />
            </div>
            <div className={styles.right}>
              <h5>
                Поддержка
                <img src={logo} alt="" />
              </h5>
              <p>Будем рады помочь</p>
            </div>
          </Link>

          <div className={styles.messagesWrap}>
            {filteredMessages.length === 0 ? (
              <div className={styles.messages_empty}>
                У вас пока нет новых сообщений
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const lastMessage = msg.messages[msg.messages.length - 1];
                return (
                  <a href="#" className={styles.message} key={msg.id}>
                    <div className={styles.message_img}>
                      <img src={msg.image} alt="" />
                      {msg.user.avatar}
                    </div>
                    <div className={styles.message_info}>
                      <h5>{msg.user.name}</h5>
                      <p className={styles.message_info_listing}>{msg.car}</p>
                      <p className={styles.message_info_text}>
                        {lastMessage.text}
                      </p>
                    </div>
                    <div className={styles.message_status}>
                      <p className={styles.message_status_date}>
                        {lastMessage.date}
                      </p>
                      {lastMessage.fromMe && (
                        <span>
                          {lastMessage.isRead ? (
                            <ArrowRead className={styles.check} />
                          ) : (
                            <ArrowSend className={styles.check} />
                          )}
                        </span>
                      )}
                      {(() => {
                        const unreadCount = msg.messages.filter(
                          (m) => !m.fromMe && !m.isRead
                        ).length;
                        return (
                          unreadCount > 0 && (
                            <div className={styles.message_count}>
                              {unreadCount}
                            </div>
                          )
                        );
                      })()}
                    </div>
                  </a>
                );
              })
            )}
          </div>
        </div>
        <div className={styles.ads}>
          <div className={styles.ad}>
            <p>Здесь будет реклама</p>
          </div>
          <div className={styles.ad}>
            <p>Здесь будет реклама</p>
          </div>
        </div>
      </div>
      <HeaderMobile />
    </div>
  );
};

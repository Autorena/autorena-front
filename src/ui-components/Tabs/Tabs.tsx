import { useState } from "react";
import styles from "./Tabs.module.scss";

type TabItem = {
  id: number;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  className?: string;
};

export const Tabs = ({ tabs, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={`${styles.tabs} ${className ? className : ""}`}>
      <div className={styles.tabs_header}>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`${styles.tabs_header_item} ${
              activeTab === t.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.tabsContent}>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

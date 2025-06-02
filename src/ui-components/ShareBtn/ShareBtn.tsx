import { ReactComponent as ShareIcon } from "../../assets/share.svg";
import { useShare } from "../../hooks/useShare";
import styles from "./ShareBtn.module.scss";

type ShareButtonProps = {
  title: string;
  text: string;
  url: string;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const ShareBtn = ({
  title,
  text,
  url,
  className = "",
  icon: Icon,
}: ShareButtonProps) => {
  const { handleShare } = useShare();

  return (
    <button
      onClick={() => handleShare(title, text, url)}
      title="Поделиться"
      className={`${styles.share} ${className}`}
    >
      {Icon ? <Icon /> : <ShareIcon />}
    </button>
  );
};

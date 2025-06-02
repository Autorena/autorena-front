import { useCallback } from "react";

export const useShare = () => {
  const handleShare = useCallback(
    (title: string, text: string, url: string) => {
      try {
        const shareData = {
          title,
          text,
          url,
        };

        if (navigator.share) {
          navigator.share(shareData).catch((err) => {
            console.error("Ошибка при попытке поделиться:", err);
            fallbackShare(url);
          });
        } else {
          fallbackShare(url);
        }
      } catch (err) {
        console.error("Ошибка при попытке поделиться:", err);
        fallbackShare(url);
      }
    },
    []
  );

  const fallbackShare = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Ссылка скопирована в буфер обмена");
  };

  return { handleShare };
};

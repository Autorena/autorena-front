import { useEffect } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  canLoadMore: boolean
) => {
  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 420;

      if (bottomReached && canLoadMore) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, canLoadMore]);
};

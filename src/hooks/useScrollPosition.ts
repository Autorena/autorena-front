import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollPosition = (storageKey: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      sessionStorage.setItem(storageKey, scrollPosition.toString());
    };

    let scrollTimeout: number;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, [storageKey]);

  useEffect(() => {
    if (pathname === "/") {
      const savedPosition = sessionStorage.getItem(storageKey);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
        }, 100);
      }
    }
  }, [pathname, storageKey]);

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(storageKey);

    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  }, [storageKey]);
};

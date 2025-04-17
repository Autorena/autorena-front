import styles from "./Pagination.module.scss";
import { ReactComponent as Arrow } from "../../assets/swiper-arrow.svg";
import { ReactComponent as Ellipsis } from "../../assets/ellipsis.svg";
import { JSX } from "react";
import { PaginationProps } from "../../types";

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = () => {
    const pages = new Set<number>();

    pages.add(1);
    pages.add(currentPage);
    if (currentPage + 1 < totalPages) pages.add(currentPage + 1);
    if (currentPage + 2 < totalPages) pages.add(currentPage + 2);
    pages.add(totalPages);

    return Array.from(pages).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  const paginationItems: (number | JSX.Element)[] = [];
  let lastPage = 0;

  visiblePages.forEach((page) => {
    if (page - lastPage > 1) {
      paginationItems.push(
        <Ellipsis
          key={`ellipsis-${page}`}
          className={styles.pagination_ellipsis}
        />
      );
    }
    paginationItems.push(page);
    lastPage = page;
  });

  return (
    <div className={styles.pagination}>
      <button
        className={`swiper-arrow ${styles.paginationButton} ${styles.paginationArrow}`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
      >
        <Arrow />
      </button>

      {paginationItems.map((item, index) =>
        typeof item === "number" ? (
          <button
            className={`${styles.paginationButton} ${
              currentPage === item ? styles.active : ""
            }`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ) : (
          <>{item}</>
        )
      )}

      <button
        className={`swiper-arrow ${styles.paginationButton} ${styles.paginationArrow} ${styles.right}`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Следующая страница"
      >
        <Arrow />
      </button>
    </div>
  );
};

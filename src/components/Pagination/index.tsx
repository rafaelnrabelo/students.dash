import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import styles from "./styles.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPaginationButtons = () => {
    const buttons = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={page === i ? styles.activePage : undefined}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (page < 4) {
        for (let i = 1; i <= 4; i++) {
          buttons.push(
            <button
              key={i}
              className={page === i ? styles.activePage : undefined}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
        buttons.push(<button>...</button>);
      } else if (page >= totalPages - 3) {
        buttons.push(<button>...</button>);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              className={page === i ? styles.activePage : undefined}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          );
        }
      } else {
        buttons.push(<button>...</button>);
        buttons.push(
          <button onClick={() => onPageChange(page - 1)}>{page - 1}</button>
        );
        buttons.push(<button className={styles.activePage}>{page}</button>);

        buttons.push(
          <button onClick={() => onPageChange(page + 1)}>{page + 1}</button>
        );

        buttons.push(<button>...</button>);
      }
    }

    return buttons;
  };

  return (
    <div className={styles.tablePagination}>
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="anterior"
        name="anterior"
      >
        <FiChevronLeft color={page === 1 ? "#dfe4eb" : undefined} />
      </button>
      {getPaginationButtons()}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="proximo"
        name="proximo"
      >
        <FiChevronRight color={page === totalPages ? "#dfe4eb" : undefined} />
      </button>
    </div>
  );
};

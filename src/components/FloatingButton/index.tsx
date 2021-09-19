import Link from "next/link";
import { FiPlus } from "react-icons/fi";

import styles from "./styles.module.scss";

export const FloatingButton = () => {
  return (
    <Link href="/student/create" replace passHref>
      <button
        className={styles.floatingButton}
        data-href="/create"
        aria-label="criar"
        name="criar"
      >
        <a data-href="/create">
          <FiPlus size={24} />
        </a>
      </button>
    </Link>
  );
};

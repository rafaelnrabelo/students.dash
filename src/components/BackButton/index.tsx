import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import styles from "./styles.module.scss";

interface BackButtonProps {
  href: string;
}

export const BackButton = ({ href }: BackButtonProps) => {
  return (
    <Link href={href} replace passHref>
      <button
        className={styles.backButton}
        role="link"
        data-href={href}
        aria-label="voltar"
        name="voltar"
      >
        <a>
          <FiArrowLeft size={24} />
        </a>
      </button>
    </Link>
  );
};

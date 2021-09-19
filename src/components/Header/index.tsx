import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.scss";

import logoImg from "../../../public/logo.svg";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a className={styles.headerTitle}>
            <Image src={logoImg} width={210} height={34} alt="logo" priority />
          </a>
        </Link>
      </div>
    </header>
  );
};

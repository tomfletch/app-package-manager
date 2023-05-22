import { ReactNode } from 'react';
import LoginBtn from '../LoginBtn/LoginBtn';
import styles from './PageLayout.module.css';
import Link from 'next/link';

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <div className={styles.headerContainer}>
        <header className={`container ${styles.header}`}>
          <Link className={styles.title} href="/">App Package Manager</Link>
          <LoginBtn />
        </header>
      </div>
      <main>{children}</main>
    </>
  );
}

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
      <div className="container">
        <header className={styles.header}>
          <h1><Link href="/">App Package Manager</Link></h1>
          <LoginBtn />
        </header>
      </div>
      <main>{children}</main>
    </>
  );
}

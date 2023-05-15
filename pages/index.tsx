import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getAllAppPackages } from '../service/db';
import { AppPackage } from '../models/appPackage';
import styles from '../styles/Home.module.css';
import AppPackageLogoName from '../components/AppPackageLogoName/AppPackageLogoName';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

type HomeProps = {
  appPackages: AppPackage[];
};

function isSearchMatch(appPackage: AppPackage, searchTerm: string) {
  const searchable = `${appPackage.name} ${appPackage.packageName} ${appPackage.version}`;
  return searchable.toLowerCase().includes(searchTerm);
}

export default function Home({ appPackages }: HomeProps) {
  const [search, setSearch] = useState('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  let filteredAppPackages = appPackages;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredAppPackages = appPackages.filter((appPackage) => isSearchMatch(appPackage, searchLower));
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <h1>App Packages</h1>
        <div className={styles.headerOptions}>
          <div className={styles.searchContainer}>
            <label htmlFor="search">Search</label>
            <input id="search" type="text" value={search} onChange={onSearchChange} />
          </div>
          <Link href="/add-package">Add Package</Link>
        </div>
      </header>
      <table className={styles.appPackagesTable}>
        <thead>
          <tr>
            <th>App</th>
            <th>Version</th>
            <th>Notes</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredAppPackages.map((appPackage) => (
            <tr key={`${appPackage.packageName}-${appPackage.version}`}>
              <td>
                <Link href={`/apps/${encodeURIComponent(appPackage.packageName)}/${encodeURIComponent(appPackage.version)}`}>
                  <AppPackageLogoName appPackage={appPackage} />
                </Link>
              </td>
              <td>
                {appPackage.version}
              </td>
              <td>
                {appPackage.notes.length || '-'}
              </td>
              <td>
                <div className={`status status-${appPackage.status.toLowerCase()}`}>
                  {appPackage.status}
                </div>
              </td>
              <td>
                Actions
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appPackages = getAllAppPackages();

  return {
    props: { appPackages }
  }
};

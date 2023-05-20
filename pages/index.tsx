import { GetServerSideProps } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { IAppPackage } from '../models/AppPackage';
import AppPackageRow from '../components/AppPackageRow/AppPackageRow';
import { getAllAppPackages } from '../lib/appPackages';
import useUser from '../hooks/useUser';
import { Button, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

function isSearchMatch(appPackage: IAppPackage, searchTerm: string) {
  const searchable = `${appPackage.name} ${appPackage.packageName} ${appPackage.version}`;
  return searchable.toLowerCase().includes(searchTerm);
}

type HomeProps = {
  initialAppPackages: IAppPackage[];
};

export default function Home({ initialAppPackages }: HomeProps) {
  const { isLoggedIn } = useUser();
  const [search, setSearch] = useState('');
  const [appPackages, setAppPackages] = useState(initialAppPackages);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  let filteredAppPackages = appPackages;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredAppPackages = appPackages.filter((appPackage) => isSearchMatch(appPackage, searchLower));
  }

  const onDeleteAppPackage = (appPackageId: string) => {
    setAppPackages((prevAppPackages) => prevAppPackages.filter((appPackage) => appPackage._id !== appPackageId));
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <h1>App Packages</h1>
        <div className={styles.headerOptions}>
          <div className={styles.searchContainer}>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              }}
              size="small"
              variant="outlined"
              value={search}
              onChange={onSearchChange}
            />
          </div>
          {isLoggedIn && (
            <Button type="submit" variant="contained" component={Link} href="/apps/add">
              Add Package
            </Button>
          )}
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
            <AppPackageRow
              key={appPackage._id}
              appPackage={appPackage}
              onDelete={() => onDeleteAppPackage(appPackage._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialAppPackages = await getAllAppPackages();

  return {
    props: { initialAppPackages }
  }
};

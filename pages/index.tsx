import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getAllAppPackages } from '../service/db';
import { AppPackage } from '../models/appPackage';
import styles from '../styles/Home.module.css';
import AppPackageLogoName from '../components/AppPackageLogoName/AppPackageLogoName';

type HomeProps = {
  appPackages: AppPackage[];
};

export default function Home({ appPackages }: HomeProps) {
  return (
    <div className="container">
      <header>
        <h1>App Packages</h1>
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
          {appPackages.map((appPackage) => (
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

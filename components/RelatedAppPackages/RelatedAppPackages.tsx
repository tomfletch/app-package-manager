import Link from 'next/link';
import { IAppPackage } from '../../models/AppPackage';
import styles from './RelatedAppPackages.module.css';

type RelatedAppPackagesProps = {
  thisAppPackage: IAppPackage;
  relatedAppPackages: IAppPackage[];
}

export default function RelatedAppPackages({ thisAppPackage, relatedAppPackages }: RelatedAppPackagesProps) {
  return (
    <section>
      <h2>Related App Packages</h2>
      {relatedAppPackages.length !== 0 ? (
        <ul className={styles.relatedAppPackageList}>
          {relatedAppPackages.map((appPackage) => (
            <li key={`${appPackage.packageName}-${appPackage.version}`}>
              <Link
                href={`/apps/${appPackage.packageName}/${appPackage.version}`}
                className={`${styles.appPackageLink} ${appPackage._id === thisAppPackage._id ? styles.current : ''}`}
              >
                <div className={styles.version}>
                  {appPackage.version}
                </div>
                <div className={`status status-label status-${appPackage.status.toLowerCase()}`}>
                  {appPackage.status}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no related app packages</p>
      )}

    </section>
  );
}
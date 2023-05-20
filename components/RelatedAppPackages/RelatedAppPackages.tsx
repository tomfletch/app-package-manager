import Link from 'next/link';
import { IAppPackage } from '../../models/AppPackage';
import styles from './RelatedAppPackages.module.css';

type RelatedAppPackagesProps = {
  relatedAppPackages: IAppPackage[];
}

export default function RelatedAppPackages({ relatedAppPackages }: RelatedAppPackagesProps) {
  return (
    <section>
      <h2>Related App Packages</h2>
      {relatedAppPackages.length !== 0 ? (
        <ul className={styles.relatedAppPackageList}>
          {relatedAppPackages.map((appPackage) => (
            <li key={`${appPackage.packageName}-${appPackage.version}`}>
              <Link
                href={`/apps/${appPackage.packageName}/${appPackage.version}`}
                className={styles.packageName}
              >
                {appPackage.version}
              </Link>
              <div className={`status status-label status-${appPackage.status.toLowerCase()}`}>
                {appPackage.status}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no related app packages</p>
      )}

    </section>
  );
}
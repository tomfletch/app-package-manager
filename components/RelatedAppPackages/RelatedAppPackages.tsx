import Link from 'next/link';
import { AppPackage } from '../../models/appPackage';
import styles from './RelatedAppPackages.module.css';

type RelatedAppPackagesProps = {
  relatedAppPackages: AppPackage[];
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
              <div className={`status status-${appPackage.status.toLowerCase()}`}>
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
import { GetServerSideProps } from 'next';
import { getAppPackage, getRelatedAppPackages } from '../../../service/db';
import { AppPackage } from '../../../models/appPackage';
import styles from '../../../styles/AppPackageVersion.module.css';
import { remark } from 'remark';
import html from 'remark-html';
import InternalNotes from '../../../components/InternalNotes/InternalNotes';
import AppPackageLogoName from '../../../components/AppPackageLogoName/AppPackageLogoName';
import Link from 'next/link';
import RelatedAppPackages from '../../../components/RelatedAppPackages/RelatedAppPackages';

type AppPackageVersionProps = {
  appPackage: AppPackage;
  descriptionHTML: string;
  relatedAppPackages: AppPackage[];
};

export default function AppPackageVersion({ appPackage, descriptionHTML, relatedAppPackages }: AppPackageVersionProps) {

  return (
    <div className="container">
      <header className={styles.header}>
        <AppPackageLogoName appPackage={appPackage} />
        <div className={`status status-${appPackage.status.toLowerCase()}`}>
          {appPackage.status}
        </div>
        <div>
          Actions
        </div>
      </header>
      <div className={styles.content}>
        <main>
          <ul className={styles.breadcrumbs}>
            <li><Link href="/">App Packages</Link></li>
            <li>{appPackage.name}</li>
            <li>{appPackage.version}</li>
          </ul>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: descriptionHTML}} />
          <InternalNotes notes={appPackage.notes} />
        </main>
        <div className={styles.sidebar}>
          <section>
            <AppPackageLogoName appPackage={appPackage} />
            <div className={styles.options}>
              <button type="button">Download</button>
              <button type="button">Share</button>
            </div>
          </section>
          <RelatedAppPackages relatedAppPackages={relatedAppPackages} />
        </div>
      </div>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const packageName = context.query.packageName as string;
  const version = context.query.version as string;

  const appPackage = getAppPackage(packageName, version);
  const processedDescription = await remark().use(html).process(appPackage.description);
  const descriptionHTML = processedDescription.toString();

  const relatedAppPackages = getRelatedAppPackages(packageName);

  return {
    props: {
      appPackage,
      descriptionHTML,
      relatedAppPackages,
    }
  }
};

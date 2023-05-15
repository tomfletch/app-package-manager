import { AppPackage } from '../../models/appPackage';
import styles from './AppPackageLogoName.module.css';

type AppPackageLogoNameProps = {
  appPackage: AppPackage;
};

export default function AppPackageLogoName({ appPackage }: AppPackageLogoNameProps) {
  return (
    <div className={styles.appPackageLogoName}>
      <img className={styles.logo} src="https://img.logoipsum.com/296.svg" width={48} height={48} alt="" />
      <div className={styles.name}>
        <div className={styles.displayName}>{appPackage.name} {appPackage.version}</div>
        <div className={styles.packageName}>{appPackage.packageName}</div>
      </div>
    </div>
  );
}
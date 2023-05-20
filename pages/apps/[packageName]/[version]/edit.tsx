import { GetServerSideProps } from 'next';
import { getAppPackage } from '../../../../lib/appPackages';
import AddEditAppPackageForm from '../../../../components/AddEditAppPackageForm/AddEditAppPackageForm';
import { IAppPackage } from '../../../../models/AppPackage';

type EditPackagePageProps = {
  appPackage: IAppPackage;
};

export default function EditPackagePage({ appPackage }: EditPackagePageProps) {
  return (
    <div className="container">
      <header>
        <h1>Edit Package</h1>
      </header>
      <main>
        <AddEditAppPackageForm appPackage={appPackage} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const packageName = context.query.packageName as string;
  const version = context.query.version as string;

  const appPackage = await getAppPackage(packageName, version);

  return {
    props: {
      appPackage
    }
  }
};

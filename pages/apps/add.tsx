import AddEditAppPackageForm from '../../components/AddEditAppPackageForm/AddEditAppPackageForm';


export default function AddPackagePage() {
  return (
    <div className="container">
      <header>
        <h1>Add Package</h1>
      </header>
      <main>
        <AddEditAppPackageForm />
      </main>
    </div>
  );
}
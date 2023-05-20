import { useRouter } from "next/router";
import styles from '../styles/AddPackage.module.css';
import { useForm } from 'react-hook-form';
import { INewAppPackage } from '../models/AppPackage';

export default function AddPackage() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<INewAppPackage>({
    defaultValues: {
      name: '',
      packageName: '',
      version: '',
      description: '## Changelog',
      status: 'Draft'
    }
  });

  const onSubmit = async (newAppPackage: INewAppPackage) => {
    await fetch('/api/app-package', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppPackage)
    });
    router.push(`/apps/${newAppPackage.packageName}/${newAppPackage.version}`);
  }

  return (
    <div className="container">
      <header>
        <h1>Add Package</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label htmlFor="display-name">Display name</label>
            <input
              id="display-name"
              type="text"
              placeholder="App Name"
              {...register('name', { required: 'Required'})}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="package-name">Package name</label>
            <input
              id="package-name"
              type="text"
              placeholder="com.app.package.name"
              {...register('packageName', { required: 'Required'})}
              aria-invalid={errors.packageName ? "true" : "false"}
            />
            {errors.packageName && (
              <p className="error-message">{errors.packageName.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="version">Version</label>
            <input
              id="version"
              type="text"
              placeholder="v1.0.0"
              {...register('version', { required: 'Required'})}
              aria-invalid={errors.version ? "true" : "false"}
            />
            {errors.version && (
              <p className="error-message">{errors.version.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description (Markdown)</label>
            <textarea {...register('description', { required: 'Required'})} id="description"></textarea>
            {errors.description && (
              <p className="error-message">{errors.description.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="status">Status</label>
            <select {...register('status', { required: 'Required'})} id="status">
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Released">Released</option>
            </select>
            {errors.description && (
              <p className="error-message">{errors.status.message}</p>
            )}
          </div>

          <div>
            <button type="submit">Add Package</button>
          </div>
        </form>
      </main>
    </div>
  );
}

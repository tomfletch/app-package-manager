import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IAppPackage, INewAppPackage } from '../../models/AppPackage';
import styles from './AddEditAppPackageForm.module.css';
import { Button, MenuItem, Select, TextField } from '@mui/material';

type AddEditAppPackageFormProps = {
  appPackage?: IAppPackage;
};

const DEFAULT_VALUES = {
  name: '',
  packageName: '',
  version: '',
  description: '## Changelog',
  status: 'Draft'
}

export default function AddEditAppPackageForm({ appPackage }: AddEditAppPackageFormProps) {
  const router = useRouter();

  let defaultValues = DEFAULT_VALUES;

  if (appPackage) {
    defaultValues = {
      name: appPackage.name,
      packageName: appPackage.packageName,
      version: appPackage.version,
      description: appPackage.description,
      status: appPackage.status
    }
  }

  const { register, handleSubmit, formState: { errors }, watch } = useForm<INewAppPackage>({
    defaultValues
  });

  const status = watch('status');

  const onSubmit = async (newAppPackage: INewAppPackage) => {
    let method = 'POST';
    let url = '/api/app-packages';

    if (appPackage) {
      method = 'PATCH';
      url = `/api/app-packages/${appPackage._id}`;
    }

    await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppPackage)
    });
    router.push(`/apps/${newAppPackage.packageName}/${newAppPackage.version}`);
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <TextField
          id="display-name"
          label="Display name"
          placeholder="App Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          InputLabelProps={{shrink: true}}
          {...register('name', { required: 'Required'})}
        />
      </div>

      <div className={styles.field}>
        <TextField
          id="package-name"
          label="Package name"
          placeholder="com.app.package.name"
          error={!!errors.packageName}
          helperText={errors.packageName?.message}
          InputLabelProps={{shrink: true}}
          {...register('packageName', { required: 'Required'})}
        />
      </div>

      <div className={styles.field}>
        <TextField
          id="version"
          label="Version"
          placeholder="v1.0.0"
          error={!!errors.version}
          helperText={errors.version?.message}
          InputLabelProps={{shrink: true}}
          {...register('version', { required: 'Required'})}
        />
      </div>

      <div className={styles.field}>
        <TextField
          id="description"
          label="Description (Markdown)"
          multiline
          minRows={5}
          error={!!errors.description}
          helperText={errors.description?.message}
          InputLabelProps={{shrink: true}}
          {...register('description', { required: 'Required'})}
        />
      </div>

      <div className={styles.field}>
        <Select
          value={status}
          className={`select-status-${status.toLowerCase()}`}
          size="small"
          {...register('status', { required: 'Required'})}
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Submitted">Submitted</MenuItem>
          <MenuItem value="Released">Released</MenuItem>
        </Select>
      </div>

      <div className={styles.field}>
        <Button type="submit" variant="contained">
          {appPackage ? 'Update Package' : 'Add Package'}
        </Button>
      </div>
    </form>
  );
}
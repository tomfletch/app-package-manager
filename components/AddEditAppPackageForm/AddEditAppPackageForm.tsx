import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IAppPackage, INewAppPackage } from '../../models/AppPackage';
import styles from './AddEditAppPackageForm.module.css';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { FilePresent } from '@mui/icons-material';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (newAppPackage: INewAppPackage) => {
    setIsSubmitting(true);

    let method = 'POST';
    let url = '/api/app-packages';

    if (appPackage) {
      method = 'PATCH';
      url = `/api/app-packages/${appPackage._id}`;
    }

    // Create/update the app package
    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppPackage)
    });
    const updatedAppPackage = await response.json();

    // If there is a selected file, upload it
    if (selectedFile) {
      await fetch(`/api/app-packages/${updatedAppPackage._id}/file`, {
        method: 'PUT',
        body: selectedFile
      });
    }

    // Redirect to app package page
    router.push(`/apps/${newAppPackage.packageName}/${newAppPackage.version}`);
  };


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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          {...register('description', { required: 'Required'})}
        />
      </div>

      <div className={styles.field}>
        <Select
          value={status}
          className={`select-status-${status.toLowerCase()}`}
          size="small"
          disabled={isSubmitting}
          {...register('status', { required: 'Required'})}
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Submitted">Submitted</MenuItem>
          <MenuItem value="Released">Released</MenuItem>
        </Select>
      </div>

      <div className={styles.field}>
        <Button
          variant="outlined"
          component="label"
          endIcon={<FilePresent />}
        >
          Select APK File
          <input
            hidden
            type="file"
            onChange={handleFileUpload}
          />
        </Button>
        {selectedFile && (
          <span className={styles.filename}>Selected File: {selectedFile.name}</span>
        )}
      </div>

      <div className={styles.field}>
        <Button type="submit" variant="contained">
          {appPackage ? 'Update Package' : 'Add Package'}
        </Button>
      </div>
    </form>
  );
}
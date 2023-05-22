import { GetServerSideProps } from 'next';

import InternalNotes from '../../../../components/InternalNotes/InternalNotes';
import AppPackageLogoName from '../../../../components/AppPackageLogoName/AppPackageLogoName';
import Link from 'next/link';
import RelatedAppPackages from '../../../../components/RelatedAppPackages/RelatedAppPackages';
import { IAppPackage } from '../../../../models/AppPackage';
import { getAppPackage, getRelatedAppPackages } from '../../../../lib/appPackages';
import { markdownToHTML } from '../../../../lib/markdown';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';
import { KeyboardArrowDown, Edit, Delete, Download, Share } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useUser from '../../../../hooks/useUser';
import styles from '../../../../styles/AppPackageVersion.module.css';


type AppPackageVersionProps = {
  appPackage: IAppPackage;
  descriptionHTML: string;
  relatedAppPackages: IAppPackage[];
  baseURL: string;
};

export default function AppPackageVersion({ appPackage, descriptionHTML, relatedAppPackages, baseURL }: AppPackageVersionProps) {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const [status, setStatus] = useState(appPackage.status);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isActionsOpen = Boolean(anchorEl);

  const onActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseActions = () => {
    setAnchorEl(null);
  };

  const onDeleteClick = async () => {
    setAnchorEl(null);
    await fetch(`/api/app-packages/${appPackage._id}`, { method: 'DELETE' });
    router.push('/');
  }


  const onStatusChange = (e: SelectChangeEvent<string>) => {
    setStatus(e.target.value);
    fetch(`/api/app-packages/${appPackage._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: e.target.value}),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <AppPackageLogoName appPackage={appPackage} />
        <div>
          {isLoggedIn ? (
            <Select
              value={status}
              onChange={onStatusChange}
              className={`select-status-${status.toLowerCase()}`}
              size="small"
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Submitted">Submitted</MenuItem>
              <MenuItem value="Released">Released</MenuItem>
            </Select>
          ) : (
            <div className={`status status-label status-${appPackage.status.toLowerCase()}`}>
              {appPackage.status}
            </div>
          )}

        </div>

        { isLoggedIn && (
          <div>
            <Button
              id="actions-btn"
              aria-controls={isActionsOpen ? 'actions-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isActionsOpen ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={onActionsClick}
              endIcon={<KeyboardArrowDown />}
            >
              Actions
            </Button>
            <Menu
              id="actions-menu"
              MenuListProps={{
                'aria-labelledby': 'actions-btn',
              }}
              anchorEl={anchorEl}
              open={isActionsOpen}
              onClose={onCloseActions}
            >
              <MenuItem
                disableRipple
                component={Link}
                href={`/apps/${appPackage.packageName}/${appPackage.version}/edit`}
              >
                <Edit />
                Edit
              </MenuItem>
              <MenuItem onClick={onDeleteClick} disableRipple>
                <Delete />
                Delete
              </MenuItem>
            </Menu>
          </div>
        )}
      </header>
      <div className={styles.content}>
        <main>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: descriptionHTML}} />
          <InternalNotes appPackageId={appPackage._id} notes={appPackage.notes} />
        </main>
        <div className={styles.sidebar}>
          <section className={styles.apkSection}>
            <AppPackageLogoName appPackage={appPackage} />
            <div className={styles.options}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Download />}
                href={`/api/app-packages/${appPackage._id}/file`}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Share />}
                onClick={() => setIsShareModalOpen(true)}
              >
                Share
              </Button>
              <Dialog
                open={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
              >
                <DialogTitle>Share this App Package</DialogTitle>
                <DialogContent>
                  <DialogContentText>Use the following link to share this App Package APK file</DialogContentText>
                  <TextField
                    value={`${baseURL}/api/app-packages/${appPackage._id}/file`}
                    InputProps={{ readOnly: true }}
                    className={styles.shareLinkInput}
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    variant="outlined"
                    size="small"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </section>
          <RelatedAppPackages thisAppPackage={appPackage} relatedAppPackages={relatedAppPackages} />
        </div>
      </div>

    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const packageName = context.query.packageName as string;
  const version = context.query.version as string;

  const appPackage = await getAppPackage(packageName, version);
  const descriptionHTML = await markdownToHTML(appPackage.description);
  const relatedAppPackages = await getRelatedAppPackages(packageName);

  return {
    props: {
      appPackage,
      descriptionHTML,
      relatedAppPackages,
      baseURL: process.env.BASE_URL,
    }
  }
};

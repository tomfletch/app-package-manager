import { GetServerSideProps } from 'next';

import InternalNotes from '../../../../components/InternalNotes/InternalNotes';
import AppPackageLogoName from '../../../../components/AppPackageLogoName/AppPackageLogoName';
import Link from 'next/link';
import RelatedAppPackages from '../../../../components/RelatedAppPackages/RelatedAppPackages';
import { IAppPackage } from '../../../../models/AppPackage';
import { getAppPackage, getRelatedAppPackages } from '../../../../lib/appPackages';
import { markdownToHTML } from '../../../../lib/markdown';
import { Button, Menu, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { KeyboardArrowDown, Edit, Delete } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { INote } from '../../../../models/Note';
import useUser from '../../../../hooks/useUser';
import styles from '../../../../styles/AppPackageVersion.module.css';


type AppPackageVersionProps = {
  appPackage: IAppPackage;
  descriptionHTML: string;
  relatedAppPackages: IAppPackage[];
};

export default function AppPackageVersion({ appPackage, descriptionHTML, relatedAppPackages }: AppPackageVersionProps) {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const [status, setStatus] = useState(appPackage.status);

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
          <ul className={styles.breadcrumbs}>
            <li><Link href="/">App Packages</Link></li>
            <li>{appPackage.name}</li>
            <li>{appPackage.version}</li>
          </ul>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: descriptionHTML}} />
          <InternalNotes appPackageId={appPackage._id} notes={appPackage.notes} />
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

  const appPackage = await getAppPackage(packageName, version);
  const descriptionHTML = await markdownToHTML(appPackage.description);
  const relatedAppPackages = await getRelatedAppPackages(packageName);

  return {
    props: {
      appPackage,
      descriptionHTML,
      relatedAppPackages,
    }
  }
};

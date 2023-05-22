import { KeyboardArrowDown, Edit, Delete, Visibility } from '@mui/icons-material';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { IAppPackage } from '../../models/AppPackage';
import AppPackageLogoName from '../AppPackageLogoName/AppPackageLogoName';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';
import styles from './AppPackageRow.module.css';

type AppPackageRowProps = {
  appPackage: IAppPackage,
  onDelete: () => void,
};

export default function AppPackageRow({ appPackage, onDelete }: AppPackageRowProps) {
  const { isLoggedIn } = useUser();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isActionsOpen = Boolean(anchorEl);

  const onActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onViewClick = () => {
    setAnchorEl(null);
    router.push(`/apps/${appPackage.packageName}/${appPackage.version}`);
  }

  const onCloseActions = () => {
    setAnchorEl(null);
  };

  const onDeleteClick = async () => {
    setAnchorEl(null);
    fetch(`/api/app-packages/${appPackage._id}`, { method: 'DELETE' });
    onDelete();
  }

  return (
    <tr key={`${appPackage.packageName}-${appPackage.version}`}>
      <td>
        <Link className={styles.appPackageLink} href={`/apps/${encodeURIComponent(appPackage.packageName)}/${encodeURIComponent(appPackage.version)}`}>
          <AppPackageLogoName appPackage={appPackage} />
        </Link>
      </td>
      <td>
        {appPackage.version}
      </td>
      <td>
        {appPackage.notes.length || '-'}
      </td>
      <td>
        <div className={`status status-label status-${appPackage.status.toLowerCase()}`}>
          {appPackage.status}
        </div>
      </td>
      <td>
        <Button
          id={`actions-btn-${appPackage._id}`}
          aria-controls={isActionsOpen ? `actions-menu-${appPackage._id}` : undefined}
          aria-haspopup="true"
          aria-expanded={isActionsOpen ? 'true' : undefined}
          variant="outlined"
          disableElevation
          onClick={onActionsClick}
          endIcon={<KeyboardArrowDown />}
        >
          Actions
        </Button>
        <Menu
          id={`actions-menu-${appPackage._id}`}
          MenuListProps={{
            'aria-labelledby': `actions-btn-${appPackage._id}`,
          }}
          anchorEl={anchorEl}
          open={isActionsOpen}
          onClose={onCloseActions}
        >
          <MenuItem onClick={onViewClick} disableRipple>
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
          <MenuItem
            disableRipple
            component={Link}
            href={`/apps/${appPackage.packageName}/${appPackage.version}/edit`}
            disabled={!isLoggedIn}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={onDeleteClick} disableRipple disabled={!isLoggedIn}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
}

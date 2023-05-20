import { KeyboardArrowDown, Edit, Delete, Visibility } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { IAppPackage } from '../../models/AppPackage';
import AppPackageLogoName from '../AppPackageLogoName/AppPackageLogoName';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../hooks/useUser';

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
        <Link href={`/apps/${encodeURIComponent(appPackage.packageName)}/${encodeURIComponent(appPackage.version)}`}>
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
          id="demo-customized-button"
          aria-controls={isActionsOpen ? 'demo-customized-menu' : undefined}
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
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={isActionsOpen}
          onClose={onCloseActions}
        >
          <MenuItem onClick={onViewClick} disableRipple>
            <Visibility />
            View
          </MenuItem>
          <MenuItem
            disableRipple
            component={Link}
            href={`/apps/${appPackage.packageName}/${appPackage.version}/edit`}
          >
            <Edit />
            Edit
          </MenuItem>
          <MenuItem onClick={onDeleteClick} disableRipple disabled={!isLoggedIn}>
            <Delete />
            Delete
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
}

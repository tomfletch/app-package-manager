import { useState } from 'react';
import { Avatar, Button, IconButton, ListItem, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';
import { Logout } from '@mui/icons-material';
import useUser from '../../hooks/useUser';

export default function LoginBtn() {
  const { isLoggedIn, user } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoggedIn) {
    return (
      <>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            alt={user.name}
            sx={{ width: 32, height: 32 }}
            src={user.image}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={isOpen}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <ListItem>{user.name}</ListItem>
          <MenuItem onClick={() => { signOut(); handleClose(); }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  }
  return (
    <Button
      onClick={() => signIn()}
      variant="contained"
    >
      Sign in
    </Button>
  );
}
'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';

export default function NavDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        School
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link onClick={handleClose}>Profile</Link>
        <Link onClick={handleClose}>My account</Link>
        <Link onClick={handleClose}>Logout</Link>
      </Menu>
    </div>
  );
}
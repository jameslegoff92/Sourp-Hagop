"use client";
import { useState } from "react";
import Image from "next/image";

//Local Imports
import Button from "../inputs/Button";
import css from "./NavDropdown.module.css";

//Third-Party Imports
import Menu from "@mui/material/Menu";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

export default function NavDropdown({ title = "add title", items = [] }) {
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
      <Stack direction="row" alignItems="center">
        <Button
          className={`${css.btn}`}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {title}
        </Button>
        <Image src="/images/chevron-down-2.svg" alt="chevron down" width={8} height={4} priority={true} />
      </Stack>
      <Menu
        classes={{ list: css.dropdown, paper: css.paper }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item, index) => (
          <li className={css.listItem}>
            <Link className={css.link} key={index} onClick={handleClose}>
              {item}
            </Link>
          </li>
        ))}
      </Menu>
    </div>
  );
}

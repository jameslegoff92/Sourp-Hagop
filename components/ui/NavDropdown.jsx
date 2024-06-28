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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NavDropdown({ title = "add title", items = [] }) {
  const [visibility, setVisibility] = useState(false);

  const handleMouseEnter = () => {
    setVisibility(true);
  };
  const handleMouseLeave = () => {
    setVisibility(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={css.container}>
      <Stack onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  sx={{ "&:hover": { color: "black" } }} direction="row" alignItems="center">
        <Button id="basic-button">{title}</Button>
        <KeyboardArrowDownIcon />
      </Stack>

      {visibility && (
        <div className={css.dropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {items.map((item, index) => (
            <li className={css.listItem}>
              <Link className={css.link} key={index} onClick={handleClose}>
                {item}
              </Link>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

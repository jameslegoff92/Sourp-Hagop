"use client";
import { useState } from "react";

//Local Imports
import css from "./NavDropdown.module.css";
import NavItem from "./NavItem";

//Third-Party Imports
import Link from "@mui/material/Link";

export default function NavDropdown({ title = "add title", items = [] }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={css.container}>
      <NavItem title={title} />

      {isHovered && (
        <div className={css.dropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {items.map((item, index) => (
            <li className={css.listItem}>
              <Link className={css.link} key={index}>
                {item}
              </Link>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";

//Local Imports
import css from "./NavDropdown.module.css";
import NavItem from "./NavItem";

//Third-Party Imports
import Link from "@mui/material/Link";

export default function NavDropdown({ title = "add title", items = [], type }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navColor = type === "secondary" ? "var(--white)" : "var(--black)";
  const hoverColor = "var(--primary-color)";

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={css.container}>
      <NavItem  color={navColor} hover={hoverColor} title={title} />

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

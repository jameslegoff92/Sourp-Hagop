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

  const handleMouseLeave = (e) => {
    console.log("event fired");
    setIsHovered(false);
  };

  const navColor = type === "secondary" ? "var(--white)" : "var(--black)";
  const hoverColor = "var(--primary-color)";

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={css.container}>
      <NavItem  color={navColor} hover={hoverColor} title={title} main={true} isHovered={isHovered}/>

      {isHovered && (
        <div className={css.wrapper} onMouseLeave={handleMouseLeave}   >
          <ul className={css.dropdown}  >
            {items.map((item, index) => (
              <li className={css.listItem}>
                <Link className={css.link} key={index} href={item.link}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

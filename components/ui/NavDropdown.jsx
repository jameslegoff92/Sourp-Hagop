"use client";
import { useState, useRef } from "react";

//Local Imports
import css from "./NavDropdown.module.css";
import NavItem from "./NavItem";

//Third-Party Imports
import Link from "@mui/material/Link";

export default function NavDropdown({ title, items, type, align = "left", offset = 0 }) {

  const [isHovered, setIsHovered] = useState(false);

  const closeTimer = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    closeTimer.current = setTimeout(() => setIsHovered(false), 80);
  };

  const navColor = type === "secondary" ? "var(--white)" : "var(--black)";
  const hoverColor = "var(--primary-color)";

  

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={css.container}>
      <NavItem color={navColor} hover={hoverColor} title={title} main={true} isHovered={isHovered}/>

      {isHovered && (
        <div className={css.wrapper} onMouseLeave={handleMouseLeave}   
          style={{
            left: align === "right" ? "auto" : 0,
            right: align === "right" ? `-${offset}px` : "auto",
          }}
        >
          <ul className={css.dropdown}>
            {items.map((item, index) => (
              <li className={css.listItem} key={index}>
                {item.external ? (
                  <a 
                    className={css.link} 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link className={css.link} href={item.link}>
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
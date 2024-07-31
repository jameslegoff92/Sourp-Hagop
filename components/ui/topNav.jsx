"use client";

//Native Imports
import Link from "next/link";
import Image from "next/image";
import css from "./topNav.module.css";
import Container from "@/components/layout/Container";

//Third-Party Imports
import { motion } from "framer-motion";

const navItems = [
  { title: "Carrières", url: "/" },
  { title: "Événements", url: "/about" },
  { title: "Anciens et Anciennes", url: "/contact" },
  { title: "La Fondation", url: "/contact" },
];

const TopNav = ({ animate = false }) => {
  const content = (
    <nav className={css.navContainer}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: "4.375rem"
        }}
      >
        <ul className={css.nav}>
          {/* Iterates through the top navigation items */}
          {navItems.map((item, index) => (
            <li key={index}>
              <Link className={css.link} href={item.url}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link className={`${css.link} ${css.portal}`} href="/portal">
          Portail
        </Link>
        <div className={css.langContainer}>
          <Image src="/images/chevron-down.svg" alt="chevron down" width={8} height={4} priority={true} />
          <Image src="/images/lang.svg" alt="logo" width={21} height={23} priority={true} />
        </div>
      </Container>
    </nav>
  );

  if (animate) {
    return (
      <motion.div
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.1, duration: 0.3, type: "easeIn" }}
    >
      {content}
    </motion.div>
    );
  }

  return content;
};

export default TopNav;

"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "@emotion/styled";
import css from "./topNav.module.css";
import Container from "@/components/layout/Container";
import { motion } from "framer-motion";

const navItems = [
  { title: "Carrières", url: "/" },
  { title: "Calendrier", url: "/about" },
  { title: "Locations", url: "/contact" },
  { title: "La Fondation", url: "/contact" },
];

const NavItem = ({ title, url }) => {
  return (
    <motion.li className={css.navItem} whileHover="hover" initial="rest">
      <Link className={css.link} href={url}>
        {title}
      </Link>
      <motion.div
        className={css.underline}
        variants={{
          rest: { width: 0 },
          hover: { width: "105%" },
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.li>
  );
};

//Portal Link Component
const StyledPortalLink = styled(Link)``;

export const PortalLink = ({ mobile }) => (
  <StyledPortalLink
    className={`${css.portalLink} ${ mobile ? css.portalLinkMobile : ""}`}
    target="_blank"
    href="https://ecolesourphagop.coba.ca/pednet/login.coba"
  >
    Portail
  </StyledPortalLink>
);

const TopNav = ({ animate = false }) => {
  const content = (
    <nav className={css.navContainer}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: "4.375rem",
        }}
      >
        <ul className={css.nav}>
          {navItems.map((item, index) => (
            <NavItem key={index} title={item.title} url={item.url} />
          ))}
        </ul>
        <PortalLink />
        <div className={css.langContainer}>
          <Image
            src="/images/chevron-down.svg"
            alt="chevron down"
            width={8}
            height={4}
            priority={true}
          />
          <Image
            src="/images/lang.svg"
            alt="logo"
            width={21}
            height={23}
            priority={true}
          />
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

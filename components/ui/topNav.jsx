"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import Image from 'next/image';
import css from "./topNav.module.css";
import Container from "../layout/Container";
import { motion } from "framer-motion";

const navItems = [
/*   { title: "", url: "https://eash50.wixsite.com/site", logo: "/images/header/50e-logo-secmenu.svg", },
 */  
  { title: "Carrières", url: "/carrieres" },
  { title: "Calendrier", url: "/calendrier" },
  { title: "Location d'espaces", url: "/locations" },
  { title: "La Fondation", url: "https://fondationsh.com/", external: true },
  { title: "Nous joindre", url: "/nous-joindre" },
];

const NavItem = ({ title, url, logo, external }) => (
  <motion.li
    className={`${css.navItem} ${logo ? css.logoItem : ""}`}
    whileHover="hover"
    initial="rest"
  >
    {external ? (
      <a 
        className={css.link} 
        href={url} 
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
    ) : (
      <Link 
        className={css.link} 
        href={url} 
        target={logo ? "_blank" : "_self"}
      >
        {logo ? (
          <Image src={logo} alt="50e logo" width={45} height={40} />
        ) : (
          title
        )}
      </Link>
    )}
    {!logo && (
      <motion.div
        className={css.underline}
        variants={{
          rest: { width: 0 },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.3 }}
      />
    )}
  </motion.li>
);

//Portal Link Component
const StyledPortalLink = styled(Link)``;

export const PortalLink = ({ mobile }) => (
  <StyledPortalLink
    className={`${css.portalLink} ${mobile ? css.portalLinkMobile : ""}`}
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
            <NavItem
              key={index}
              title={item.title}
              url={item.url}
              logo={item.logo}
              external={item.external}
            />
          ))}
        </ul>
        <PortalLink />
{/*        <div className={css.langContainer}>
          <img src="/images/chevron-down.svg" alt="chevron down" />
          <img src="/images/lang.svg" alt="logo" />
        </div>
*/}
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

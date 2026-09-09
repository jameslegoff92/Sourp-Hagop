"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import Image from 'next/image';
import css from "./topNav.module.css";
import Container from "@/components/layout/Container";
import LangSwitcher from "./LangSwitcher";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const navItems = [
/*   { titleKey: "", url: "https://eash50.wixsite.com/site", logo: "/images/header/50e-logo-secmenu.svg", },
 */
  { titleKey: "items.careers", url: "/carrieres" },
  { titleKey: "items.calendar", url: "/calendrier" },
  { titleKey: "items.locations", url: "/locations" },
  { titleKey: "items.foundation", url: "https://fondationsh.com/", external: true },
  { titleKey: "items.contact", url: "/nous-joindre" },
];

const NavItem = ({ title, url, logo, logoAlt, external }) => (
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
          <Image src={logo} alt={logoAlt} width={45} height={40} />
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
const StyledPortalLink = styled(Link)`
  top: 2px;
  &.${css.portalLinkMobile} {
    top: 18px;
  }
`;

export const PortalLink = ({ mobile }) => {
  const t = useTranslations("TopNav");
  return (
    <StyledPortalLink
      className={`${css.portalLink} ${mobile ? css.portalLinkMobile : ""}`}
      target="_blank"
      href="https://ecolesourphagop.coba.ca/pednet/login.coba"
    >
      {t("portalLink")}
    </StyledPortalLink>
  );
};

const TopNav = ({ animate = false }) => {
  const t = useTranslations("TopNav");
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
              title={t(item.titleKey)}
              url={item.url}
              logo={item.logo}
              logoAlt={t("legacyLogoAlt")}
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
<LangSwitcher />
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

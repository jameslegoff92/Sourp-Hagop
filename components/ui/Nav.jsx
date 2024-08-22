"use client";

// React Component for the navigation menu
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

// Libraries
import { motion } from "framer-motion";

// Components
import { PortalLink } from "./TopNav";
import NavDropdown from "./NavDropdown";

// Styles
import css from "./Nav.module.css";
import styled from "@emotion/styled";

// Data for the navigation menu
const navList = [
  {
    title: "École",
    items: [
      { text: "Historique", link: "/history" },
      { text: "Notre Équipe", link: "/team" },
      { text: "Conseil d'administration", link: "/conseiladministration" },
      { text: "Projet Éducatif", link: "/projeteducatif" },
      { text: "Comité de parents", link: "/comiteparents" },
      { text: "Fondation", link: "/fondation" },
      { text: "Anciens et anciennes", link: "/anciens" },
      { text: "Protecteur National de l'élève", link: "/pne" },
    ],
  },
  {
    title: "Pédagogie",
    items: [
      { text: "Préscolaire", link: "/prescolaire" },
      { text: "Primaire", link: "/primaire" },
      { text: "Secondaire", link: "/secondaire" },
    ],
  },
  {
    title: "Vie Étudiante",
    items: [
      { text: "Vie Communautaire", link: "/viecommunautaire" },
      { text: "Voyages", link: "/voyages" },
      { text: "Activités Parascolaires", link: "/activitesparascolaires" },
      { text: "Équipe des Aigles", link: "/aigles" },
      { text: "Conseil étudiant", link: "/conseiletudiant" },
      { text: "Sorties Scolaires", link: "/sortiesscolaires" },
    ],
  },
  {
    title: "Services À L'Élève",
    items: [
      { text: "Soutien aux élèves", link: "/soutien" },
      { text: "Agora Anna et Manouk Djoukhadjian", link: "/agora" },
      { text: "Bibliothèque", link: "/bibliotheque" },
      { text: "Service de Garde", link: "/servicedegarde" },
      { text: "Transport", link: "/transport" },
      { text: "Uniforme Scolaire", link: "/uniformescolaire" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { text: "Pourquoi Sourp Hagop", link: "/pourquoi" },
      { text: "Demande d'Admission", link: "/demandeadmission" },
      { text: "Droits de scolarité et autres frais", link: "/droits" },
    ],
  },
];

const navItems = [
  { title: "Carrières", url: "/" },
  { title: "Événements", url: "/about" },
  { title: "Anciens et Anciennes", url: "/contact" },
  { title: "La Fondation", url: "/contact" },
];

//Mobile Navigation Styling
const MobileNavContainer = styled.div`
  background-color: var(--primary-color-transparent);
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 6rem 1.5rem;
  text-align: left;

  @media (min-width: 1112px) {
    display: none;
  }
`;
const SecondaryNavigation = styled.div`
  padding: 2rem 1rem 0;
  display: flex;
  row-gap: 1rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const SecondaryLink = styled(Link)`
  font-size: clamp(0.8rem, 2vw, 1.5rem);
  font-weight: 600;
`;

const CSSUL = styled.ul`
`

const CSSNavDropdown = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0 1rem;
  padding: 2rem 0 0;
`;

const CSSMobileNavItems = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-botton: 1rem;
`;

const CSSMobileNavItem = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
`;

const CSSMobileNavHeader = styled.li`
  cursor: pointer;
  font-size: clamp(1rem, 3vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const CSSChevronContainer = styled(motion.div)``;

//Component Framer Motion Variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
};

// Mobile navigation menu component
const MobileNav = ({ open }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    École: false,
    Pédagogie: false,
    "Vie Étudiante": false,
    "Services À L'Élève": false,
    Admissions: false,
  });

  const handleDropdownClick = (e) => {
    const textContent = e.target.textContent;
    setIsDropdownOpen((prevState) => {
      console.log("prevState: ", prevState);
      console.log("prevState[textContent]: ", prevState[textContent]);
      return {
        ...prevState,
        [textContent]: !prevState[textContent], // Toggle the clicked nav item's state
      };
    });
  };

  return (
    <>
      {open && (
        <MobileNavContainer>
          <SecondaryNavigation>
            {navItems.map((item, index) => (
              <SecondaryLink key={index} href={item.url}>
                {item.title}
              </SecondaryLink>
            ))}
          </SecondaryNavigation>
          <PortalLink mobile={true} />
          <CSSUL>
            {navList.map((navItem, index) => (
              <CSSNavDropdown>
                <CSSMobileNavHeader key={index} onClick={handleDropdownClick}>
                  {navItem.title}
                  <CSSChevronContainer
                    animate={{
                      rotate: isDropdownOpen[navItem.title] ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown style={{ fontSize: "1.4rem" }} />
                  </CSSChevronContainer>
                </CSSMobileNavHeader>

                {navItem.items.map((item, index) => (
                  <CSSMobileNavItems
                    variants={dropdownVariants}
                    initial="hidden"
                    animate={
                      isDropdownOpen[navItem.title] ? "visible" : "hidden"
                    }
                  >
                    <CSSMobileNavItem href={item.link} key={index}>
                      {" "}
                      {item.text}{" "}
                    </CSSMobileNavItem>
                  </CSSMobileNavItems>
                ))}
              </CSSNavDropdown>
            ))}
          </CSSUL>
        </MobileNavContainer>
      )}
    </>
  );
};

//Mobile navigation dropwon
const MobileNavDropdown = ({ title, items }) => {};

// Navigation menu component
const Nav = ({ type = "primary", animate = true }) => {
  const animationState = animate ? "visible" : { x: 0, opacity: 1 };
  const [menuOpen, setMenuOpen] = useState(false);

  const hamburgerVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 0,
    },
  };

  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 },
  };

  const line2Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 },
  };

  //useEffect()
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${css.navContainer} ${type === "secondary" ? css.navContainerSecondary : ""}`}
      >
        <motion.div
          initial={animate ? "hidden" : false}
          animate={animationState}
          className={css.logoContainer}
        >
          <img
            src="images/logo-alt.png"
            alt="logo"
            width={89}
            height={90}
            className={css.logo}
          />
          <div className={css.logoText}>
            <p
              className={`${css.logoTextItem} ${type === "secondary" ? css.logoAlt : ""}`}
            >
              L'ÉCOLE ARMÉNIENNE
            </p>
            <p
              className={`${css.logoTextItem} ${css.logoTextLg} ${type === "secondary" ? css.logoAlt : ""}`}
            >
              SOURP HAGOP
            </p>
            <p
              className={`${css.logoTextItem} ${css.logoTextSm} ${type === "secondary" ? css.logoAlt : ""}`}
            >
              ÉCOLE PRIMAIRE V. ET A. SAFARIAN
            </p>
            <p
              className={`${css.logoTextItem} ${css.logoTextSmAlternate} ${type === "secondary" ? css.logoAlt : ""}`}
            >
              ÉCOLE SECONDAIRE PASDERMAJIAN
            </p>
          </div>
        </motion.div>
        <motion.ul
          className={css.nav}
          initial={animate ? "hidden" : false}
          animate={animationState}
          transition={{ duration: 0.3 }}
        >
          {navList.map((navItem, index) => (
            <li key={index}>
              <NavDropdown
                title={navItem.title}
                items={navItem.items}
                type={type}
              />
            </li>
          ))}
        </motion.ul>

        {/* Mobile Navigation Button */}
        <motion.div
          className={css.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          animate={menuOpen ? "open" : "closed"}
          variants={hamburgerVariants}
          style={{ transformOrigin: "center" }}
        >
          <motion.span
            className={`${css.hamburgerLine} ${type === "secondary" ? css.hamburgerLineSecondary : ""}`}
            variants={line1Variants}
          ></motion.span>
          <motion.span
            className={`${css.hamburgerLine} ${type === "secondary" ? css.hamburgerLineSecondary : ""}`}
            variants={line2Variants}
            style={{ transformOrigin: "center" }}
          ></motion.span>
        </motion.div>
      </nav>
      <MobileNav open={menuOpen} />
    </>
  );
};

export default Nav;

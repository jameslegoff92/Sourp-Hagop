"use client";

// React Component for the navigation menu
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";

// Libraries
import { motion } from "framer-motion";

// Components
import { PortalLink } from "./topNav";
import NavDropdown from "./NavDropdown";

// Styles
import css from "./Nav.module.css";
import styled from "@emotion/styled";

// Data for the navigation menu
const navList = [
  {
    title: "École",
    items: [
      { text: "Historique", link: "/historique" },
      { text: "Notre Équipe", link: "/equipe" },
      { text: "Conseil d'administration", link: "/conseil-administration" },
      { text: "Projet Éducatif", link: "/projet-educatif" },
      { text: "Comité de parents", link: "/comite-parents" },
      { text: "Anciens et anciennes", link: "/anciens" },
      {
        text: "Protecteur National de l'élève",
        link: "/protecteur-national-eleve",
      },
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
      { text: "Vie Communautaire", link: "/vie-communautaire" },
      { text: "Voyages", link: "/voyages" },
      { text: "Activités Parascolaires", link: "/activites-parascolaires" },
      { text: "Équipe des Aigles", link: "/aigles" },
      { text: "Conseil étudiant", link: "/conseil-etudiant" },
      { text: "Sorties Scolaires", link: "/sorties-scolaires" },
    ],
  },
  {
    title: "Services à l'élève",
    items: [
      { text: "Soutien aux élèves", link: "/soutien" },
      { text: "Agora Anna et Manouk Djoukhadjian", link: "/agora" },
      { text: "Bibliothèque", link: "/bibliotheque" },
      { text: "Service de Garde", link: "/service-de-garde" },
      { text: "Transport", link: "/transport" },
      { text: "Uniforme Scolaire", link: "/uniforme-scolaire" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { text: "Pourquoi Sourp Hagop", link: "/pourquoi" },
      { text: "Demande d'Admission", link: "/admissions" },
      { text: "Droits de scolarité et autres frais", link: "/droits" },
    ],
  },
];

const navItems = [
  { title: "Carrières", url: "/" },
  { title: "Calendrier", url: "/about" },
  { title: "Anciens et Anciennes", url: "/contact" },
  { title: "La Fondation", url: "https://fondationsh.com/" },
];

//Mobile Navigation Styling
const MobileNavContainer = styled.div`
  background-color: var(--primary-color-transparent);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  padding: 6rem 1.5rem;
  text-align: left;
  z-index: 2;

  @media (min-width: 1112px) {
    display: none;
  }
`;
const SecondaryNavigation = styled.div`
  padding: 1rem 1rem 0;
  display: flex;
  row-gap: 1rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const SecondaryLink = styled(Link)`
  color: var(--white);
  font-size: clamp(0.8rem, 2vw, 1.5rem);
  font-weight: 600;
`;

const CSSUL = styled.ul``;

const CSSNavDropdown = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  margin: 0 1rem;
  padding: 1rem 0 0;
`;

const CSSMobileNavItems = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-botton: 1rem;
`;

const CSSMobileNavItem = styled(Link)`
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    color: var(--white);
  }
`;

const CSSMobileNavHeader = styled.li`
  color: var(--white);
  cursor: pointer;
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  position: relative;
  z-index: 2; // To prevent the dropdown from being hidden behind the next dropdown
`;

const CSSChevronContainer = styled(motion.div)``;

//Component Framer Motion Variants
const dropdownVariants = {
  hidden: { 
    pointerEvents: "none",
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2, delay: 0.1 },

    },
  },
  visible: {
    pointerEvents: "auto",
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
    "Services à l'élève": false,
    Admissions: false,
  });

  const handleDropdownClick = (text) => {
    const title = text;
    setIsDropdownOpen((prevState) => {
      return {
        ...prevState,
        [title]: !prevState[title],
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
              <CSSNavDropdown key={index}>
                <CSSMobileNavHeader
                  onClick={() => handleDropdownClick(navItem.title)}
                >
                  {navItem.title}
                  <CSSChevronContainer
                    animate={{
                      rotate: isDropdownOpen[navItem.title] ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownClick(navItem.title);
                      }}
                      style={{ fontSize: "1rem" }}
                    />
                  </CSSChevronContainer>
                </CSSMobileNavHeader>
                <CSSMobileNavItems
                  variants={dropdownVariants}
                  initial="hidden"
                  animate={isDropdownOpen[navItem.title] ? "visible" : "hidden"}
                >
                  {navItem.items.map((item, index) => (
                    <li>
                      <CSSMobileNavItem href={item.link} key={index}>
                        {" "}
                        {item.text}{" "}
                      </CSSMobileNavItem>
                    </li>
                  ))}
                </CSSMobileNavItems>
              </CSSNavDropdown>
            ))}
          </CSSUL>
        </MobileNavContainer>
      )}
    </>
  );
};

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
          <Link href="/" style={{ display: "flex", gap: "4px" }}>
            <img
              src="images/logo-blackWhite.jpg"
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
          </Link>
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

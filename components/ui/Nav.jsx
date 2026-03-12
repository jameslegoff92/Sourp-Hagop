"use client";

import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PortalLink } from "./topNav";
import NavDropdown from "./NavDropdown";
import css from "./Nav.module.css";
import styled from "@emotion/styled";

/* ─────────────────────────────────────────────
   DATA  (unchanged from original)
───────────────────────────────────────────── */
const navList = [
  {
    title: "L'école",
    items: [
      { text: "Historique", link: "/historique" },
      { text: "L'équipe", link: "/equipe" },
      { text: "Conseil d'administration", link: "/conseil-administration" },
      { text: "Projet éducatif", link: "/projet-educatif" },
      { text: "Comité de parents", link: "/comite-parents" },
      { text: "Anciens et anciennes", link: "/anciens" },
      { text: "Protecteur national de l'élève", link: "/protecteur-national-eleve" },
    ],
  },
  {
    title: "Pédagogie",
    items: [
      { text: "Programme éducatif au préscolaire", link: "/prescolaire" },
      { text: "Programme éducatif au primaire", link: "/primaire" },
      { text: "Programme éducatif au secondaire", link: "/secondaire" },
    ],
  },
  {
    title: "Vie Étudiante",
    items: [
      {
        text: "Activités parascolaires",
        link: "https://sites.google.com/ecolesourphagop.com/parascolaire/home?utm_source=brevo&utm_campaign=EASHebdo%205%20septembre%202025&utm_medium=email",
        external: true,
      },
      { text: "Conseil étudiant", link: "/conseil-etudiant" },
      { text: "Équipe des Aigles", link: "/aigles" },
      { text: "Sorties scolaires et voyages", link: "/sorties-scolaires-voyages" },
    ],
  },
  {
    title: "Services à l'élève",
    items: [
      { text: "Soutien aux élèves", link: "/soutien" },
      { text: "Agora Anna et Manouk Djoukhadjian", link: "/agora" },
      { text: "Bibliothèque", link: "/bibliotheque" },
      { text: "Mer Aykin: un jardin littéraire", link: "/jardin-litteraire" },
      { text: "Créalab", link: "/crealab" },
      { text: "Service de garde", link: "/service-de-garde" },
      { text: "Transport", link: "/transport" },
      { text: "Uniforme scolaire", link: "/uniforme-scolaire" },
    ],
  },
  {
    title: "Admissions",
    items: [
      { text: "Pourquoi Sourp Hagop", link: "/pourquoi-sourp-hagop" },
      { text: "Demande d'admission", link: "/admissions" },
      { text: "Droits de scolarité et autres frais", link: "/droits" },
    ],
  },
];

const navItems = [
  { title: "Carrières", url: "/carrieres" },
  { title: "Calendrier", url: "/about" },
  { title: "Location d'espaces", url: "/locations" },
  { title: "Nous joindre", url: "/nous-joindre" },
  //{ title: "La Fondation", url: "https://fondationsh.com/", external: true },
];

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const BORDER = "rgba(255,255,255,0.14)";
const ACCENT = "rgba(255,255,255,0.07)";
const ACCENT_HOVER = "rgba(255,255,255,0.13)";
const TEXT_MUTED = "rgba(255,255,255,0.5)";

/* ─────────────────────────────────────────────
   STYLED COMPONENTS
───────────────────────────────────────────── */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 49;

  @media (min-width: 1112px) {
    display: none;
  }
`;

const DrawerPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100dvh;
  width: min(400px, 100vw);
  background: var(--primary-color);
  z-index: 50;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: -6px 0 48px rgba(0, 0, 0, 0.4), inset 1px 0 0 ${BORDER};

  @media (min-width: 1112px) {
    display: none;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid ${BORDER};
  flex-shrink: 0;
`;

const CloseBtn = styled(motion.button)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  padding: 0;
`;

const BtnLine = styled(motion.span)`
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--white);
  border-radius: 2px;
  transform-origin: center;
`;

const ScrollBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.25rem 0;
  position: relative;

  scrollbar-width: thin;
  scrollbar-color: ${BORDER} transparent;
  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 99px; }
`;

const PortalSection = styled.div`
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid ${BORDER};
`;

const SectionLabel = styled.p`
  color: ${TEXT_MUTED};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0 0 0.6rem 0.25rem;
`;

const AccordionItem = styled.div`
  border-radius: 10px;
  margin-bottom: 3px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: border-color 0.2s, background 0.2s;

  &[data-open="true"] {
    border-color: ${BORDER};
    background: ${ACCENT};
  }
`;

const AccordionTrigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0.75rem 0.75rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 0.75rem;
  border-radius: 7px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.92rem;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  &:active { background: ${ACCENT_HOVER}; color: var(--white); }
`;

const ExternalBadge = styled.span`
  color: ${TEXT_MUTED};
  display: inline-flex;
  align-items: center;
`;

const DrawerFooter = styled.div`
  padding: 1.1rem 1.25rem;
  border-top: 1px solid ${BORDER};
  flex-shrink: 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
`;

const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.5rem;
  border-radius: 8px;
  border: 1px solid ${BORDER};
  background: ${ACCENT};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.78rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:active { background: ${ACCENT_HOVER}; color: var(--white); }
`;

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerVariants = {
  hidden: { x: "100%", transition: { type: "spring", stiffness: 320, damping: 32 } },
  visible: { x: 0, transition: { type: "spring", stiffness: 320, damping: 32 } },
};

const panelVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.22 } },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.28 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -5 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.035 } }),
};

/* ─────────────────────────────────────────────
   MOBILE NAV
───────────────────────────────────────────── */
const MobileNav = ({ open, onClose }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const closeBtnRef = useRef(null);

  const toggle = (title) =>
    setActiveDropdown((prev) => (prev === title ? null : title));

  // Focus close button when drawer opens
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  // Escape to close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <DrawerPanel
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <DrawerHeader>
              <PortalLink mobile={true} />
              <CloseBtn
                ref={closeBtnRef}
                onClick={onClose}
                whileTap={{ scale: 0.88 }}
                aria-label="Fermer le menu"
              >
                <BtnLine
                  initial={{ rotate: 0, y: 0, scaleX: 1 }}
                  animate={{ rotate: 45, y: 10, scaleX: [1, 0.45, 1] }}
                  transition={{ duration: 0.38, times: [0, 0.45, 1], ease: "easeInOut" }}
                />
                <BtnLine
                  initial={{ rotate: 0, y: 0, scaleX: 1 }}
                  animate={{ rotate: -45, y: -7.5, scaleX: [1, 0.45, 1] }}
                  transition={{ duration: 0.38, times: [0, 0.45, 1], ease: "easeInOut", delay: 0.04 }}
                />
              </CloseBtn>
            </DrawerHeader>

            {/* Scroll area */}
            <ScrollBody>
              {/* Logo watermark */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "60%",
                transform: "translate(-50%, -50%)",
                width: "65%",
                opacity: 0.06,
                pointerEvents: "none",
                zIndex: 0,
              }}>
                <img src="/images/logo-blackWhite.jpg" alt="" aria-hidden="true" style={{ width: "100%", height: "auto", filter: "grayscale(1) brightness(2)" }} />
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
              {navList.map((navItem, index) => {
                const isOpen = activeDropdown === navItem.title;
                return (
                  <AccordionItem key={index} data-open={isOpen}>
                    <AccordionTrigger
                      onClick={() => toggle(navItem.title)}
                      aria-expanded={isOpen}
                    >
                      <span>{navItem.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ display: "flex", alignItems: "center", color: TEXT_MUTED, fontSize: "1.4rem", fontWeight: 300, lineHeight: 1 }}
                      >
                        +
                      </motion.span>
                    </AccordionTrigger>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="panel"
                          variants={panelVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          style={{ overflow: "hidden" }}
                        >
                          <ItemList>
                            {navItem.items.map((item, i) => (
                              <motion.li
                                key={i}
                                custom={i}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                              >
                                <NavLink
                                  href={item.link}
                                  onClick={onClose}
                                  target={item.external ? "_blank" : "_self"}
                                  rel={item.external ? "noopener noreferrer" : undefined}
                                >
                                  <span>{item.text}</span>
                                  {item.external && (
                                    <ExternalBadge>
                                      <FaExternalLinkAlt size={9} />
                                    </ExternalBadge>
                                  )}
                                </NavLink>
                              </motion.li>
                            ))}
                          </ItemList>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </AccordionItem>
                );
              })}
              </div>
            </ScrollBody>
            <DrawerFooter>
              <SectionLabel style={{ marginBottom: "0.6rem" }}>Accès rapide</SectionLabel>
              <FooterGrid>
                {navItems.map((item, index) => (
                  <FooterLink
                    key={index}
                    href={item.url}
                    onClick={onClose}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.title}
                  </FooterLink>
                ))}
              </FooterGrid>
            </DrawerFooter>
          </DrawerPanel>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────
   MAIN NAV
───────────────────────────────────────────── */
const Nav = ({ type = "primary", animate = true }) => {
  const animationState = animate ? "visible" : { x: 0, opacity: 1 };
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`${css.navContainer} ${type === "secondary" ? css.navContainerSecondary : ""}`}>
        <motion.div
          initial={animate ? "hidden" : false}
          animate={animationState}
          className={css.logoContainer}
        >
          <Link href="/" style={{ display: "flex", gap: "4px" }}>
            <img src="/images/logo.jpg" alt="logo" width={89} height={90} className={css.logo} />
            <div className={css.logoText}>
              <p className={`${css.logoTextItem} ${type === "secondary" ? css.logoAlt : ""}`}>
                L'ÉCOLE ARMÉNIENNE
              </p>
              <p className={`${css.logoTextItem} ${css.logoTextLg} ${type === "secondary" ? css.logoAlt : ""}`}>
                SOURP HAGOP
              </p>
              <p className={`${css.logoTextItem} ${css.logoTextSm} ${type === "secondary" ? css.logoAlt : ""}`}>
                ÉCOLE PRIMAIRE V. ET A. SARAFIAN
              </p>
              <p className={`${css.logoTextItem} ${css.logoTextSmAlternate} ${type === "secondary" ? css.logoAlt : ""}`}>
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
                align={index === navList.length - 1 ? "right" : "left"}
                offset={index === navList.length - 1 ? 40 : 0}
              />
            </li>
          ))}
        </motion.ul>

        <motion.div
          className={css.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.85 }}
          style={{ cursor: "pointer" }}
        >
          <motion.span
            className={`${css.hamburgerLine} ${type === "secondary" ? css.hamburgerLineSecondary : ""}`}
            animate={menuOpen
              ? { rotate: 45, y: 8, scaleX: [1, 0.4, 1], transition: { duration: 0.35, times: [0, 0.45, 1], ease: "easeInOut" } }
              : { rotate: 0, y: 0, scaleX: [1, 0.4, 1], transition: { duration: 0.35, times: [0, 0.45, 1], ease: "easeInOut" } }
            }
            style={{ backgroundColor: menuOpen ? "white" : undefined, transformOrigin: "center" }}
          />
          <motion.span
            className={`${css.hamburgerLine} ${type === "secondary" ? css.hamburgerLineSecondary : ""}`}
            animate={menuOpen
              ? { rotate: -45, y: -8, scaleX: [1, 0.4, 1], transition: { duration: 0.35, times: [0, 0.45, 1], ease: "easeInOut", delay: 0.04 } }
              : { rotate: 0, y: 0, scaleX: [1, 0.4, 1], transition: { duration: 0.35, times: [0, 0.45, 1], ease: "easeInOut", delay: 0.04 } }
            }
            style={{ backgroundColor: menuOpen ? "white" : undefined, transformOrigin: "center" }}
          />
        </motion.div>
      </nav>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Nav;

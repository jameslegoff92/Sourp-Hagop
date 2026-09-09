"use client";

import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { PortalLink } from "./topNav";
import NavDropdown from "./NavDropdown";
import css from "./Nav.module.css";
import styled from "@emotion/styled";

/* ─────────────────────────────────────────────
   DATA  (links/routing only - display text lives in
   messages/*.json under the "Nav" namespace, keyed below)
───────────────────────────────────────────── */
const navList = [
  {
    titleKey: "groups.school.title",
    items: [
      { textKey: "groups.school.items.historique", link: "/historique" },
      { textKey: "groups.school.items.equipe", link: "/equipe" },
      { textKey: "groups.school.items.administration", link: "/conseil-administration" },
      { textKey: "groups.school.items.projetEducatif", link: "/projet-educatif" },
      { textKey: "groups.school.items.comiteParents", link: "/comite-parents" },
      { textKey: "groups.school.items.anciens", link: "/anciens" },
      { textKey: "groups.school.items.ombudsman", link: "/protecteur-national-eleve" },
    ],
  },
  {
    titleKey: "groups.pedagogy.title",
    items: [
      { textKey: "groups.pedagogy.items.prescolaire", link: "/prescolaire" },
      { textKey: "groups.pedagogy.items.primaire", link: "/primaire" },
      { textKey: "groups.pedagogy.items.secondaire", link: "/secondaire" },
    ],
  },
  {
    titleKey: "groups.studentLife.title",
    items: [
      {
        textKey: "groups.studentLife.items.activitesParascolaires",
        link: "https://sites.google.com/ecolesourphagop.com/parascolaire/home?utm_source=brevo&utm_campaign=EASHebdo%205%20septembre%202025&utm_medium=email",
        external: true,
      },
      { textKey: "groups.studentLife.items.conseilEtudiant", link: "/conseil-etudiant" },
      { textKey: "groups.studentLife.items.aigles", link: "/aigles" },
      { textKey: "groups.studentLife.items.sorties", link: "/sorties-scolaires-voyages" },
    ],
  },
  {
    titleKey: "groups.studentServices.title",
    items: [
      { textKey: "groups.studentServices.items.soutien", link: "/soutien" },
      { textKey: "groups.studentServices.items.agora", link: "/agora" },
      { textKey: "groups.studentServices.items.bibliotheque", link: "/bibliotheque" },
      { textKey: "groups.studentServices.items.jardinLitteraire", link: "/jardin-litteraire" },
      { textKey: "groups.studentServices.items.crealab", link: "/crealab" },
      { textKey: "groups.studentServices.items.serviceDeGarde", link: "/service-de-garde" },
      { textKey: "groups.studentServices.items.transport", link: "/transport" },
      { textKey: "groups.studentServices.items.uniforme", link: "/uniforme-scolaire" },
    ],
  },
  {
    titleKey: "groups.admissions.title",
    items: [
      { textKey: "groups.admissions.items.pourquoi", link: "/pourquoi-sourp-hagop" },
      { textKey: "groups.admissions.items.demande", link: "/admissions" },
      { textKey: "groups.admissions.items.droits", link: "/droits" },
    ],
  },
];

const navItems = [
  { titleKey: "quickLinks.careers", url: "/carrieres" },
  { titleKey: "quickLinks.calendar", url: "/about" },
  { titleKey: "quickLinks.locations", url: "/locations" },
  { titleKey: "quickLinks.contact", url: "/nous-joindre" },
  //{ titleKey: "quickLinks.foundation", url: "https://fondationsh.com/", external: true },
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
  const t = useTranslations("Nav");
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
            aria-label={t("menuAriaLabel")}
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
                aria-label={t("closeMenuAriaLabel")}
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
                const isOpen = activeDropdown === navItem.titleKey;
                return (
                  <AccordionItem key={index} data-open={isOpen}>
                    <AccordionTrigger
                      onClick={() => toggle(navItem.titleKey)}
                      aria-expanded={isOpen}
                    >
                      <span>{t(navItem.titleKey)}</span>
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
                                  <span>{t(item.textKey)}</span>
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
              <SectionLabel style={{ marginBottom: "0.6rem" }}>{t("quickAccessLabel")}</SectionLabel>
              <FooterGrid>
                {navItems.map((item, index) => (
                  <FooterLink
                    key={index}
                    href={item.url}
                    onClick={onClose}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {t(item.titleKey)}
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
  const t = useTranslations("Nav");
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
            <img src="/images/logo.jpg" alt={t("logoAlt")} width={89} height={90} className={css.logo} />
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
                title={t(navItem.titleKey)}
                items={navItem.items.map((item) => ({ ...item, text: t(item.textKey) }))}
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

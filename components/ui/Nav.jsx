import Image from "next/image";
import { useState } from 'react';
import NavDropdown from "./NavDropdown";
import css from "./Nav.module.css";
import { motion } from "framer-motion";

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

const Nav = ({ type = "primary", animate = true }) => {
  const animationState = animate ? "visible" : { x: 0, opacity: 1 };
  const [menuOpen, setMenuOpen] = useState(false);

  const hamburgerVariants = {
    closed: {
      rotate: 0
    },
    open: {
      rotate: 0
    }
  };

  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 8 }
  };

  const line2Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -8 }
  };

  return (
    <nav className={`${css.navContainer} ${type === "secondary" ? css.navContainerSecondary : ""}`}>
      <motion.div
        initial={animate ? "hidden" : false}
        animate={animationState}
        className={css.logoContainer}
      >
        <img src="images/logo-alt.png" alt="logo" width={89} height={90} className={css.logo}/>
        <div className={css.logoText}>
          <p className={`${css.logoTextItem} ${type === "secondary" ? css.logoAlt : ""}`}>L'ÉCOLE ARMÉNIENNE</p>
          <p className={`${css.logoTextItem} ${css.logoTextLg} ${type === "secondary" ? css.logoAlt : ""}`}>
            SOURP HAGOP
          </p>
          <p className={`${css.logoTextItem} ${css.logoTextSm} ${type === "secondary" ? css.logoAlt : ""}`}>
            ÉCOLE PRIMAIRE V. ET A. SAFARIAN
          </p>
          <p className={`${css.logoTextItem} ${css.logoTextSmAlternate} ${type === "secondary" ? css.logoAlt : ""}`}>
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
            <NavDropdown title={navItem.title} items={navItem.items} type={type} />
          </li>
        ))}
      </motion.ul>

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
  );
};

export default Nav;
import Image from "next/image";
import NavDropdown from "./NavDropdown";
import css from "./Nav.module.css";

const navList = [
  {
    title: "École",
    items: [
      { text: "Historique", link: "/history" },
      { text: "Notre Équipe", link: "/equipe" },
      { text: "Notre Personel", link: "/personel" },
      { text: "Project Éducatif", link: "/educatif" },
    ],
  },
  {
    title: "Pédagogie",
    items: [
      { text: "Préscolaire", link: "/prescolaire" },
      { text: "Primaire", link: "/primaire" },
      { text: "Grille Matières", link: "/grillematieres" },
      { text: "Technologie", link: "/technologie" },
    ],
  },
  {
    title: "Vie Étudiante",
    items: [
      { text: "Vie Communautaire", link: "/viecommunautaire" },
      { text: "Voyages", link: "/voyages" },
      { text: "Activités Parascolaires", link: "/activitesparascolaires" },
      { text: "Code de Vie", link: "/codedevie" },
    ],
  },
  {
    title: "Services À L'Élève",
    items: [
      { text: "Services Professionnels", link: "/servicesprofessionnels" },
      { text: "Cafétéria", link: "/cafeteria" },
      { text: "Bibliothèque", link: "/bibliotheque" },
      { text: "Service de Garde", link: "/servicedegarde" },
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

const Nav = ({ type = "primary" }) => {
  return (
    <nav className={`${css.navContainer} ${type === "secondary" ? css.navContainerSecondary : ""}`}>
      <div className={css.logoContainer}>
        <Image src="/images/logo.svg" alt="logo" width={89} height={79} />
        <div>
          <p className={`${css.logoText} ${type === "secondary" ? css.logoAlt : ""}`}> L’ÉCOLE ARMÉNIENNE </p>
          <p className={`${css.logoText} ${css.logoTextLg} ${type === "secondary" ? css.logoAlt : ""}`}> SOURP HAGOP</p>
          <p className={`${css.logoText} ${css.logoTextSm} ${type === "secondary" ? css.logoAlt : ""}`}>
            ÉCOLE PRIMAIRE V. ET A. SAFARIAN
          </p>
          <p className={`${css.logoText} ${css.logoTextSmAlternate} ${type === "secondary" ? css.logoAlt : ""}`}>
            ÉCOLE SECONDAIRE PASDERMAJIAN
          </p>
        </div>
      </div>
      <ul className={css.nav}>
        {navList.map((navItem, index) => (
          <li key={index}>
            <NavDropdown title={navItem.title} items={navItem.items} type={type} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

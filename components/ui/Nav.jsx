import Image from "next/image";
import NavDropdown from "./NavDropdown";
import css from "./Nav.module.css";

const navList = [
  { title: "École", items: ["Historique", "Notre Équipe", "Notre Personel", "Project Éducatif"] },
  { title: "Pédagogie", items: ["Préscolaire", "Primaire", "Grille Matières", "Technologie"] },
  { title: "Vie Étudiante", items: ["Vie Communautaire", "Voyages", "Activités Parascolaires", "Code de Vie"] },
  {
    title: "Services À L'Élève",
    items: ["Services Professionnels", "Cafétéria", "Bibliothèque", "Service de Garde", "Uniforme Scolaire"],
  },
  {
    title: "Admissions",
    items: ["Pourquoi Sourp Hagop", "Demande d'Admission", "Droits de scolarité et autres frais"],
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

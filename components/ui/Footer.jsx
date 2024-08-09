import React from 'react';
import css from './Footer.module.css';

const Footer = () => (
    <footer className={css.footer}>
        <div className={css.logoTextContainer}>
            <img 
                src="../images/logo.svg" 
                alt="School Logo" 
                className={css.logo}
            />
            <div>
                <p className={`${css.logoText}`}> L’ÉCOLE ARMÉNIENNE </p>
                <p className={`${css.logoText} ${css.logoTextLg}`}> SOURP HAGOP</p>
                <p className={`${css.logoText} ${css.logoTextSm}`}>ÉCOLE PRIMAIRE V. ET A. SAFARIAN</p>
                <p className={`${css.logoText} ${css.logoTextSmAlternate}`}>ÉCOLE SECONDAIRE PASDERMAJIAN</p>
            </div>
            <div className={css.bottomText}>
                <p>L’École arménienne Sourp Hagop donne l’enseignement en français.</p>
                <p>Elle conduit ses élèves du secondaire à l’obtention du Diplôme d’études secondaires du Québec.</p>
            </div>
            <img 
                src="../images/feep_sceau_osbl.svg" 
                alt="OSBL Logo" 
                className={css.osblLogo}
            />
        </div>
        <div className={css.imageContainer}>
            <img 
                src="../images/school.svg" 
                alt="Sourp Hagop School" 
                className={css.footerImage}
            />
        </div>
        <div className={css.blueOverlay}></div>
    </footer>
);

export default Footer;
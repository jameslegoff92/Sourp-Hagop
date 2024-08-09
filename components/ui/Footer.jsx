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
                <p className={`${css.logoText}`}> École arménienne Sourp Hagop </p>
                <p className={`${css.logoText} ${css.logoTextAddress}`}> 3400 Rue Nadon</p>
                <p className={`${css.logoText} ${css.logoTextAddress}`}>Montréal, Québec</p>
                <p className={`${css.logoText} ${css.logoTextAddress}`}>Canada, H4J 1P7</p>
                <p className={css.phoneEmailContainer} style={{ marginTop: '20px' }}>
                    <span className={css.letterTandC}>T</span>
                    <span className={css.phoneEmailText}>514 332-1373</span>
                </p>
                <p className={css.phoneEmailContainer}>
                    <span className={css.letterTandC}>C</span>
                    <span className={css.phoneEmailText}>info@ecolesourphagop.com</span>
                </p>
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
        <div className={css.verticalLine}></div>

    </footer>
);

export default Footer;
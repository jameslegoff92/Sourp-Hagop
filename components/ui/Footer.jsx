"use client";

import React from 'react';
import { motion } from 'framer-motion';
import css from './Footer.module.css';

export const AnimatedMenuLink = ({ href, children, external }) => (
    <motion.a 
        href={href}
        className={css.verticalWord}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        whileHover={{ 
            scale: 1.1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
    >
        <span className={css.hoverUnderline}>{children}</span>
    </motion.a>
);

const Footer = () => (
    <footer className={css.footer}>
        <div className={css.logoTextContainer}>
            <img 
                src="/images/logo.jpg" 
                alt="School Logo" 
                className={css.logo}
            />
            <div className={`${css.textContainer}`}>
                <p className={`${css.logoText}`}> École arménienne Sourp Hagop </p>
                <p className={`${css.logoText} ${css.logoTextAddress}`}> 3400 Rue Nadon</p>
                <p className={`${css.logoText} ${css.logoTextAddress}`}>Montréal, Québec</p>
                <p className={`${css.logoText} ${css.logoTextAddress}`}>Canada, H4J 1P5</p>
                <p className={css.phoneEmailContainer} style={{ marginTop: '20px' }}>
                    <span className={css.letterTandC}>T</span>
                    <span className={css.phoneEmailText}>514 332-1373</span>
                </p>
                <p className={css.phoneEmailContainer}>
                    <span className={css.letterTandC}>C</span>
                    <span className={css.phoneEmailText}>info@ecolesourphagop.com</span>
                </p>
            </div>
            <img 
                src="/images/feep_sceau_osbl.svg" 
                alt="OSBL Logo" 
                className={css.osblLogo}
            />
        </div>
        <div className={css.imageContainer}>
            <img 
                src="/images/school.svg" 
                alt="Sourp Hagop School" 
                className={css.footerImage}
            />
        </div>
        <div className={css.blueOverlay}>
            <nav className={css.verticalWordsContainerLeft}>
                <AnimatedMenuLink href="https://ecolesourphagop.coba.ca/pednet/login.coba">PORTAIL</AnimatedMenuLink>
                <AnimatedMenuLink href="/carrieres">CARRIÈRES</AnimatedMenuLink>
                <AnimatedMenuLink href="/admissions">ADMISSIONS</AnimatedMenuLink>
                <AnimatedMenuLink href="/calendrier">CALENDRIER</AnimatedMenuLink>
                <AnimatedMenuLink href="/protecteur-national-eleve">
                    <span className={css.longTextWrap}>PROTECTEUR NATIONAL DE L'ÉLÈVE</span>
                </AnimatedMenuLink>
            </nav>
            <div className={css.verticalLine}></div>
            <nav className={css.verticalWordsContainerRight}>
                <AnimatedMenuLink href="https://www.fondationsh.com" external>LA FONDATION</AnimatedMenuLink>
                <AnimatedMenuLink href="/anciens">
                    <span className={css.longTextWrap}>ANCIENS ET ANCIENNES</span>
                </AnimatedMenuLink>
                <AnimatedMenuLink href="/locations">LOCATION D'ESPACES</AnimatedMenuLink>
                <AnimatedMenuLink href="/nous-joindre">NOUS JOINDRE</AnimatedMenuLink>
            </nav>
            <div className={css.socialMediaContainer}>
                <a href="https://www.facebook.com/ecolearmeniennesourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-facebook.svg" alt="Facebook" className={css.facebookIcon}/>
                </a>                
                <a href="https://www.instagram.com/ecolesourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-instagram.svg" alt="Instagram" className={css.facebookIcon}/>
                </a>                   
                <a href="https://www.linkedin.com/company/ecole-armenienne-sourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-linkedIn.svg" alt="LinkedIn" className={css.facebookIcon}/>
                </a>                   
                <a href="https://twitter.com/easourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-x.svg" alt="X" className={css.facebookIcon}/>
                </a>                

            </div>
        </div>
        <div className={css.bottomText}>
                <p>L'École arménienne Sourp Hagop dispense un enseignement en langue française,</p>
                <p>conduisant les élèves du secondaire à l’obtention du Diplôme d’études secondaires du Québec.</p>
        </div>

    </footer>
);

export default Footer;
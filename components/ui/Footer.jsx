"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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

const Footer = () => {
    const t = useTranslations('Footer');

    return (
    <footer className={css.footer}>
        <div className={css.logoTextContainer}>
            <img
                src="/images/logo.jpg"
                alt={t('logoAlt')}
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
                alt={t('osblLogoAlt')}
                className={css.osblLogo}
            />
        </div>
        <div className={css.imageContainer}>
            <img
                src="/images/school.svg"
                alt={t('schoolImageAlt')}
                className={css.footerImage}
            />
        </div>
        <div className={css.blueOverlay}>
            <nav className={css.verticalWordsContainerLeft}>
                <AnimatedMenuLink href="https://ecolesourphagop.coba.ca/pednet/login.coba">{t('nav.portal')}</AnimatedMenuLink>
                <AnimatedMenuLink href="/carrieres">{t('nav.careers')}</AnimatedMenuLink>
                <AnimatedMenuLink href="/admissions">{t('nav.admissions')}</AnimatedMenuLink>
                <AnimatedMenuLink href="/calendrier">{t('nav.calendar')}</AnimatedMenuLink>
                <AnimatedMenuLink href="/protecteur-national-eleve">
                    <span className={css.longTextWrap}>{t('nav.studentOmbudsman')}</span>
                </AnimatedMenuLink>
            </nav>
            <div className={css.verticalLine}></div>
            <nav className={css.verticalWordsContainerRight}>
                <AnimatedMenuLink href="https://www.fondationsh.com" external>{t('nav.foundation')}</AnimatedMenuLink>
                <AnimatedMenuLink href="/anciens">
                    <span className={css.longTextWrap}>{t('nav.alumni')}</span>
                </AnimatedMenuLink>
                <AnimatedMenuLink href="/locations">{t('nav.spaceRentals')}</AnimatedMenuLink>
                <AnimatedMenuLink href="/nous-joindre">{t('nav.contactUs')}</AnimatedMenuLink>
            </nav>
            <div className={css.socialMediaContainer}>
                <a href="https://www.facebook.com/ecolearmeniennesourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-facebook.svg" alt={t('socialAlt.facebook')} className={css.facebookIcon}/>
                </a>
                <a href="https://www.instagram.com/ecolesourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-instagram.svg" alt={t('socialAlt.instagram')} className={css.facebookIcon}/>
                </a>
                <a href="https://www.linkedin.com/company/ecole-armenienne-sourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-linkedIn.svg" alt={t('socialAlt.linkedin')} className={css.facebookIcon}/>
                </a>
                <a href="https://twitter.com/easourphagop" className={css.facebookLink} target="_blank" rel="noopener noreferrer">
                    <img src="/images/footer-x.svg" alt={t('socialAlt.x')} className={css.facebookIcon}/>
                </a>

            </div>
        </div>
        <div className={css.bottomText}>
                {t.rich('tagline', {
                    p1: (chunks) => <p>{chunks}</p>,
                    p2: (chunks) => <p>{chunks}</p>,
                })}
        </div>

    </footer>
    );
};

export default Footer;

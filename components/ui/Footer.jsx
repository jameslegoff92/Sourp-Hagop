import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.imageContainer}>
            <img 
                src="../images/school.svg" 
                alt="Sourp Hagop School" 
                className={styles.footerImage}
            />
        </div>
        <div className={styles.blueOverlay}></div>
    </footer>
);

export default Footer;
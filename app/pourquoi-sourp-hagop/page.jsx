"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Button from '@mui/material/Button';
import Typography from "@/components/display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

const StyledDiv = styled.div`
  text-align: left;
  padding: 10px 0 150px;
  position: relative;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 50px 30px 30px;
  width: 80%;
  max-width: 700px;
  position: relative;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const StyledButton = styled(Button)`
  background-color: ${({ className }) => className === "primary" ? "#006096" : "transparent"} !important;
  border: 2px solid #006096;
  color: ${({ className }) => className === "primary" ? "#fff" : "#006096"};
  padding: 15px 25px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  flex: 1;
  width: auto;

  span {
    display: inline-block;
    transition: transform 0.3s ease;
    transform-origin: center;
    will-change: transform;
  }

  &:hover span {
    transform: scale(1.08);
  }

  @media (max-width: 576px) {
    font-size: 16px;
    padding: 10px 20px;
  }

  @media (max-width: 320px) {
    font-size: 14px;
    padding: 8px 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 20px 10px ;
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: left;

  @media (max-width: 1110px) {
    text-align: left;
  }
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: var(--spacing-4);
  height: auto;
  margin: 20px 0;

  @media (max-width: 1110px) {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }
`;

const OrderContainer = styled.div`
  @media (max-width: 1110px) {
    order: 1;
  }
`;

const Image = styled(motion.img)`
  width: 40%;
  height: auto;
  object-fit: cover;

  @media (max-width: 1110px) {
    width: 100%;
    align-items: stretch;
  }
`;

const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: var(--secondary-color);
  align-items: flex-start;
  flex: 1;
  overflow: hidden;

  @media (max-width: 1200px) {
    align-items: left;
    padding: 50px 30px 50px 45px;
    
  @media (max-width: 768px) {
    align-items: left;
    padding: 50px 20px 50px 35px;
  }
`;

const CustomButton = ({ children, variant, ...props }) => (
    <StyledButton className={variant} {...props}>
      <span>{children}</span>
    </StyledButton>
  );

export default function ComiteParents() {

    const [showPopup, setShowPopup] = useState(true);

    const handleOverlayClick = () => {
        setShowPopup(false);
    };

    const handleReserveClick = () => {
        window.open("https://doodle.com/bp/EASH/visitepersoeash-23-24", "_blank");
    };

    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();
    const controls5 = useAnimation();

    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const containerRef3 = useRef(null);
    const containerRef4 = useRef(null);
    const containerRef5 = useRef(null);

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target) {
                        case containerRef1.current:
                            controls1.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef2.current:
                            controls2.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef3.current:
                            controls3.start({ x: 0, opacity: 1 });
                            break;                        
                        case containerRef4.current:
                            controls4.start({ x: 0, opacity: 1 });
                            break;                        
                        case containerRef5.current:
                            controls5.start({ x: 0, opacity: 1 });
                            break;
                        default:
                            break;
                    }
                }
            });
        };

        const observerOptions = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (containerRef1.current) observer.observe(containerRef1.current);
        if (containerRef2.current) observer.observe(containerRef2.current);
        if (containerRef3.current) observer.observe(containerRef3.current);
        if (containerRef4.current) observer.observe(containerRef4.current);
        if (containerRef5.current) observer.observe(containerRef5.current);

        return () => {
            if (containerRef1.current) observer.unobserve(containerRef1.current);
            if (containerRef2.current) observer.unobserve(containerRef2.current);
            if (containerRef3.current) observer.unobserve(containerRef3.current);
            if (containerRef4.current) observer.unobserve(containerRef4.current);
            if (containerRef5.current) observer.unobserve(containerRef5.current);
        };
    }, [controls1, controls2, controls3, controls4, controls5]);

    useEffect(() => {
        if (showPopup) {
            document.documentElement.classList.add("no-scroll");
            document.body.classList.add("no-scroll");
        } else {
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        };
    }, [showPopup]);

    return (
        <>
            {showPopup && (
                <PopupOverlay onClick={handleOverlayClick}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setShowPopup(false)}>✕</CloseButton>
                        <Typography as="h3" type="h3" color="primary">
                            Réservez votre prochaine visite 
                        </Typography>
                        <Typography as="p" type="h6" color="dark" style={{ paddingTop: '10px' }}>
                            Nos prochaines visites personnalisées prendront place du <br/> <span style={{ color: "var(--primary-color)", fontWeight: "700" }}>8 novembre</span> au <span style={{ color: "var(--primary-color)", fontWeight: "700" }}>7 décembre</span>
                        </Typography>

                        <ButtonContainer>
                            <CustomButton variant="secondary" onClick={() => setShowPopup(false)}>
                                Non, merci
                            </CustomButton>
                            <CustomButton variant="primary" onClick={handleReserveClick}>
                                Réserver
                            </CustomButton>
                        </ButtonContainer>
                    </PopupContent>
                </PopupOverlay>
            )}

            <div className={showPopup ? "disable-interaction" : ""}>
                <BackgroundLogo src="../images/logo-big.svg" style={{
                    marginLeft: '0',
                }} />
                <Header
                    animate={false}
                    imageSrc="../images/header/pourquoi-header.jpg"
                    headerText="POURQUOI SOURP HAGOP"
                    headerTextTop="70%"

                />

                <StyledDiv>
                    <MotionDiv>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            style={{textAlign: 'center', paddingBottom: '10px'}}
                        >
                            À Sourp Hagop, chaque élève est accueilli dans une communauté chaleureuse et bienveillante, où l’esprit de famille se ressent dès la maternelle et se poursuit jusqu’au secondaire, créant un environnement propice à l’épanouissement de chacun.                    </Typography>
                        <ContentContainer ref={containerRef1}>
                            <Image src="../images/pourquoi/photo1.jpg" alt="Parent Image" />

                            <TextBlock
                                initial={{ x: "100%", opacity: 0 }}
                                animate={controls1}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" color="primary">
                                    Parcours harmonieux
                                </Typography>

                                <TextContainer>
                                    <Typography as="p" type="h6" color="dark">
                                    Notre école offre une scolarité continue de la maternelle au secondaire, 
                                    avec un accompagnement personnalisé, des transitions fluides et des projets inter-niveaux pour favoriser l’entraide. 
                                    De plus, une communication de qualité avec les parents qui assure un suivi optimal.
                                    </Typography>
                                </TextContainer>
                            </TextBlock>
                        </ContentContainer>
                    </MotionDiv>

                    <MotionDiv>
                        <ContentContainer ref={containerRef2}>
                            <OrderContainer>
                                <TextBlock
                                    initial={{ x: "-100%", opacity: 0 }}
                                    animate={controls2}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Typography as="h3" type="h3" color="primary">
                                        Enseignement enrichi et culturel
                                    </Typography>

                                    <TextContainer>
                                        <Typography as="p" type="h6" color="dark">
                                        La langue et la culture arménienne sont au cœur de notre projet éducatif, apportant un enrichissement unique au curriculum.                                        
                                        «[...] nous considérons cela comme un atout pour aider à façonner l’identité de nos enfants au sein d‘une société québécoise pluriethnique.» dit Madame Lory Abrakian, directrice générale.
                                        </Typography>
                                    </TextContainer>
                                </TextBlock>
                            </OrderContainer>
                            <Image src="../images/pourquoi/photo2.jpg" alt="Parent Image" />
                        </ContentContainer>
                    </MotionDiv>

                    <MotionDiv>
                        <ContentContainer ref={containerRef3}>
                            <Image src="../images/parent-reunion.jpg" alt="Parent Image" />

                            <TextBlock
                                initial={{ x: "100%", opacity: 0 }}
                                animate={controls3}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" color="primary">
                                    Services d’accompagnement adaptés
                                </Typography>

                                <TextContainer>
                                <Typography as="p" type="h6" color="dark">
                                    Notre école offre un encadrement inclusif et personnalisé : tutorat, plans d’intervention, orthopédagogues et des professionnels qui sont disponibles pour assurer la réussite de chaque élève.
                                </Typography>
                                </TextContainer>
                            </TextBlock>
                        </ContentContainer>
                    </MotionDiv>

                    <MotionDiv>
                        <ContentContainer ref={containerRef4}>
                            <OrderContainer>
                                <TextBlock
                                    initial={{ x: "-100%", opacity: 0 }}
                                    animate={controls4}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <Typography as="h3" type="h3" color="primary">
                                        Technologie de pointe
                                    </Typography>

                                    <TextContainer>
                                    <Typography as="p" type="h6" color="dark">
                                        Ordinateurs, tableaux interactifs, tablettes numériques (iPads) et salle de robotique : 
                                        l’École offre à ses élèves des outils technologiques de pointe pour favoriser les apprentissages, 
                                        stimuler la motivation et mieux préparer les jeunes aux défis du XXIe siècle.                                
                                    </Typography>
                                    </TextContainer>
                                </TextBlock>
                            </OrderContainer>
                            <Image src="../images/pourquoi/photo4.jpg" alt="Parent Image" />
                        </ContentContainer>
                    </MotionDiv>

                    <MotionDiv>
                        <ContentContainer ref={containerRef5}>
                            <Image src="../images/pourquoi/photo5.jpg" alt="Parent Image" />

                            <TextBlock
                                initial={{ x: "100%", opacity: 0 }}
                                animate={controls5}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" color="primary">
                                    Activités parascolaires variées
                                </Typography>

                                <TextContainer>
                                <Typography as="p" type="h6" color="dark">
                                    Nos élèves profitent d'activités variées : au primaire, échecs, jeux vidéo, animation, piano, violon, peinture, hockey cosom et karaté. Au secondaire, place au sport (soccer, basketball) et à la musique (piano, violon), offrant aux élèves des occasions d’épanouissement et de développement de leurs talents.                            </Typography>
                                </TextContainer>
                            </TextBlock>
                        </ContentContainer>
                    <Typography as="p" type="h6" color="dark" style={{ paddingTop: '10px', textAlign: 'center', fontWeight: "400" }}>
                        Nos prochaines visites personnalisées prendront place du <span style={{ color: "var(--primary-color)", fontWeight: "700" }}>8 novembre</span> au <span style={{ color: "var(--primary-color)", fontWeight: "700" }}>7 décembre</span>
                    </Typography>
                    <Typography as="p" type="label" color="dark" style={{ textAlign: 'center' }}>
                        Pour réserver votre visite personalisée, veuillez confirmer votre présence en cliquant <span style={{ color: "var(--primary-color)", fontWeight: "700" }}><a href="https://doodle.com/bp/EASH/visitepersoeash-23-24" target="_blank" rel="noopener noreferrer">ici</a></span>.                    
                    </Typography>
                    </MotionDiv>

                </StyledDiv>

                <Footer />
            </div>
        </>
    );
}

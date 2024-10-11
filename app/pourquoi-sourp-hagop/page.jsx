"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Typography from "@/components/display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

const StyledDiv = styled.div`
  text-align: left;
  padding: 10px 0 150px;
  position: relative;
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

export default function ComiteParents() {
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

    return (
        <>
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
                </MotionDiv>
            </StyledDiv>

            <Footer />
        </>
    );
}

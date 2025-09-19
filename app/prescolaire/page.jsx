"use client";

import { useEffect, useRef } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
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
  width: 50%;
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
  }
    
  @media (max-width: 768px) {
    align-items: left;
    padding: 50px 20px 50px 35px;
  }
`;

// Special pricing components
const PricingContainer = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary-color) 0%, #004d7a 100%);
  color: white;
  padding: 60px;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: 1200px) {
    padding: 40px 30px 40px 45px;
  }
    
  @media (max-width: 768px) {
    padding: 40px 20px 40px 35px;
  }
`;

const PriceItem = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PriceCircle = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
`;

// Process steps component
const ProcessContainer = styled(motion.div)`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: 1200px) {
    padding: 40px 30px 40px 45px;
  }
    
  @media (max-width: 768px) {
    padding: 40px 20px 40px 35px;
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const StepNumber = styled.div`
  background: var(--primary-color);
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
`;

// Information highlight box
const InfoHighlight = styled(motion.div)`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-left: 4px solid #ffc107;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: 1200px) {
    padding: 40px 30px 40px 45px;
  }
    
  @media (max-width: 768px) {
    padding: 40px 20px 40px 35px;
  }
`;

export default function ServiceParascolaire() {
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
            <Header
                animate={false}
                imageSrc="../images/header/parascolaire-header.jpg"
                headerText="SERVICE PARASCOLAIRE"
                headerTextTop="70%"
            />

            <StyledDiv>
                {/* Introduction Section */}
                <MotionDiv>
                    <ContentContainer ref={containerRef1}>
                        <Image src="../images/parent-role.jpg" alt="Service parascolaire" />
                        <TextBlock
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls1}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary">
                                Service Enrichi
                            </Typography>
                            <TextContainer>
                                <Typography as="p" type="h6" color="dark">
                                    L'école arménienne Sourp Hagop offre un service de garde enrichi d'activités parascolaires pour les élèves du primaire. Conformément aux normes et aux valeurs de l'école, ce service propose une variété d'activités pour les jeunes du primaire entre 16h20 et 18h00 tous les jours d'école.
                                </Typography>
                            </TextContainer>
                        </TextBlock>
                    </ContentContainer>
                </MotionDiv>

                {/* Pricing Section */}
                <MotionDiv>
                    <ContentContainer ref={containerRef2}>
                        <OrderContainer>
                            <PricingContainer
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={controls2}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" style={{ color: "white", marginBottom: "20px" }}>
                                    Tarifs et Inscription
                                </Typography>
                                <TextContainer>
                                    <Typography as="p" type="h6" style={{ color: "white", marginBottom: "20px" }}>
                                        L'inscription peut se faire sur une base quotidienne, hebdomadaire ou mensuelle via le portail Parents.
                                    </Typography>
                                    <PriceItem>
                                        <PriceCircle>8$</PriceCircle>
                                        <Typography as="p" type="p" style={{ color: "white" }}>
                                            Hebdomadaire/Mensuel par jour
                                        </Typography>
                                    </PriceItem>
                                    <PriceItem>
                                        <PriceCircle>10$</PriceCircle>
                                        <Typography as="p" type="p" style={{ color: "white" }}>
                                            Quotidien par jour
                                        </Typography>
                                    </PriceItem>
                                    <Typography as="p" type="caption" style={{ color: "#cce7ff", marginTop: "15px", fontStyle: "italic" }}>
                                        Date limite: 11h00 le matin même. Aucun remboursement en cas d'absence.
                                    </Typography>
                                </TextContainer>
                            </PricingContainer>
                        </OrderContainer>
                        <Image src="../images/parent-formation.jpg" alt="Inscription service parascolaire" />
                    </ContentContainer>
                </MotionDiv>

                {/* Student Process Section */}
                <MotionDiv>
                    <ContentContainer ref={containerRef3}>
                        <Image src="../images/parent-reunion.jpg" alt="Activités élèves" />
                        <ProcessContainer
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls3}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary">
                                Procédure Élèves
                            </Typography>
                            <StepsList>
                                <StepItem>
                                    <StepNumber>1</StepNumber>
                                    <div>
                                        <Typography as="p" type="body" color="dark">
                                            <strong>16h10:</strong> Accompagnement au local 114 pour la prise de présence
                                        </Typography>
                                    </div>
                                </StepItem>
                                <StepItem>
                                    <StepNumber>2</StepNumber>
                                    <div>
                                        <Typography as="p" type="body" color="dark">
                                            Activités variées: sports, arts plastiques, jeux coopératifs, activités culturelles et lecture animée
                                        </Typography>
                                    </div>
                                </StepItem>
                                <StepItem>
                                    <StepNumber>3</StepNumber>
                                    <div>
                                        <Typography as="p" type="body" color="dark">
                                            Période de devoirs en autonomie
                                        </Typography>
                                    </div>
                                </StepItem>
                            </StepsList>
                        </ProcessContainer>
                    </ContentContainer>
                </MotionDiv>

                {/* Parent Process Section */}
                <MotionDiv>
                    <ContentContainer ref={containerRef4}>
                        <OrderContainer>
                            <TextBlock
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={controls4}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" color="primary">
                                    Procédure Parents
                                </Typography>
                                <TextContainer>
                                    <Typography as="p" type="h6" color="dark">
                                        Les parents devront se présenter à la porte d'entrée des autobus scolaires et se présenter au local 114 pour récupérer leur enfant. Une signature sera exigée du parent lors de la récupération.
                                    </Typography>
                                </TextContainer>
                            </TextBlock>
                        </OrderContainer>
                        <Image src="../images/parent-role.jpg" alt="Récupération des enfants" />
                    </ContentContainer>
                </MotionDiv>

                {/* Important Information Section */}
                <MotionDiv>
                    <ContentContainer ref={containerRef5}>
                        <Image src="../images/parent-formation.jpg" alt="Informations importantes" />
                        <InfoHighlight
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls5}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" style={{ color: "#856404", marginBottom: "20px" }}>
                                Informations Importantes
                            </Typography>
                            <TextContainer>
                                <Typography as="p" type="h6" style={{ color: "#856404", marginBottom: "20px" }}>
                                    En cas d'absence, envoyez un courriel avant 11h00 à serviceparascolaire@ecolesourphagop.com avec le nom, la classe et la date d'absence.
                                </Typography>
                                <Typography as="p" type="p" style={{ color: "#856404", marginBottom: "10px" }}>
                                    <strong>Contact:</strong>
                                </Typography>
                                <Typography as="p" type="p" style={{ color: "#856404" }}>
                                    514 332-1373 poste 249
                                </Typography>
                            </TextContainer>
                        </InfoHighlight>
                    </ContentContainer>
                </MotionDiv>
            </StyledDiv>

            {/* <BackgroundLogo src="../images/logo-big.svg" /> */}
            <Footer />
        </>
    );
}
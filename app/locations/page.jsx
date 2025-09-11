"use client";

import { useState, useRef } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 90%;
  max-width: 1200px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const SpacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin: 40px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const SpaceCard = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border: 1px solid #e8f4fd;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color);
    box-shadow: 0 8px 25px rgba(0, 125, 195, 0.15);
  }

  &:hover .imageWrapper {
    transform: translateY(-70%); /* slide up the image+title */
  }

  &:hover .contentContainer {
    transform: translateY(0); /* bring in content */
    opacity: 1;
  }
`

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));
  }
`

const SpaceTitle = styled(Typography)`
  position: relative;
  z-index: 3;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(100%); /* hidden initially */
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.4s ease;
  z-index: 1;
`

const SpaceDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 0.95rem;
  flex-grow: 1;
`;

const SpaceFeatures = styled.div`
  margin-bottom: 20px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #6b7280;
  
  &::before {
    content: '✓';
    color: var(--primary-color);
    font-weight: bold;
    margin-right: 8px;
  }
`;

const ContactButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
  padding: 14px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: transparent;
    color: var(--primary-color);
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SpaceItem = ({ space, index }) => {
  const imageControls = useAnimation();
  const contentControls = useAnimation();
  const isOpen = useRef(false);

  const handleHoverStart = async () => {
    await imageControls.start({
      height: "25%",
      transition: { duration: 0.3 },
    });
    await contentControls.start({
      scale: 1.2,
      opacity: 1,
      transition: { duration: 0.5 },
    });
  };

  const handleHoverEnd = async () => {
    await imageControls.start({
      height: "100%",
      transition: { duration: 0.3 },
    });
    await contentControls.start({
      scale: 1,
      opacity: 0,
      transition: { duration: 0.2 },
    });
  };

  const handleTap = async () => {
    if (isOpen.current) {
      await imageControls.start({
        height: "100%",
        transition: { duration: 0.3 },
      });
      await contentControls.start({
        scale: 1,
        opacity: 0,
        transition: { duration: 0.2 },
      });
    } else {
      await imageControls.start({
        height: "25%",
        transition: { duration: 0.3 },
      });
      await contentControls.start({
        scale: 1.2,
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }
    isOpen.current = !isOpen.current;
  };

  return (
    <SpaceCard>
      <ImageWrapper
        className="imageWrapper"
        style={{ backgroundImage: `url('${space.imageUrl}')` }}
      >
        <SpaceTitle>{space.title}</SpaceTitle>
      </ImageWrapper>

      <ContentContainer className="contentContainer">
        <div>
          <SpaceDescription>{space.description}</SpaceDescription>
          <SpaceFeatures>
            {space.features.map((feature, idx) => (
              <FeatureItem key={idx}>{feature}</FeatureItem>
            ))}
          </SpaceFeatures>
        </div>
        <ContactButton>Demander un devis</ContactButton>
      </ContentContainer>
    </SpaceCard>
  );
};

export default function RentalSpacesPage() {
  const data = null; // This will be replaced with Sanity data later
  
  const spaces = [
    {
      id: 1,
      title: "Amphithéâtre",
      imageUrl: "../images/amphitheater.jpg",
      description: "Un amphithéâtre moderne équipé pour vos événements, conférences et spectacles. Capacité de 200 personnes avec système audiovisuel professionnel.",
      features: [
        "Capacité de 200 personnes",
        "Système son et projection",
        "Éclairage professionnel",
        "Climatisation",
        "Accès handicapés"
      ]
    },
    {
      id: 2,
      title: "Gymnase",
      imageUrl: "../images/gymnasium.jpg",
      description: "Espace sportif polyvalent idéal pour événements sportifs, tournois et activités physiques. Sol spécialisé et équipements inclus.",
      features: [
        "Surface de 800 m²",
        "Vestiaires inclus",
        "Équipements sportifs",
        "Gradins pour spectateurs",
        "Parking disponible"
      ]
    },
    {
      id: 3,
      title: "Salles de classe",
      imageUrl: "../images/classrooms.jpg",
      description: "Locaux modulaires parfaits pour formations, séminaires et réunions. Différentes tailles disponibles selon vos besoins.",
      features: [
        "Capacité 20-40 personnes",
        "Tableau interactif",
        "WiFi haut débit",
        "Mobilier modulable",
        "Service traiteur possible"
      ]
    }
  ];

  return (
    <>
      <Header
        imageSrc={data?.headerImageUrl || "../images/header/rental-header.jpg"}
        headerText={data?.headerText || "LOCATION D'ESPACES"}
        headerTextTop="70%"
      />

      <StyledDiv>
        <MotionDiv>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              as="h1"
              type="h1"
              color="primary"
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              {data?.introTitle || "Nos espaces à votre disposition"}
            </Typography>
            
            <TextContainer>
              <Typography
                as="p"
                type="h6"
                color="dark"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                {data?.introText || "Découvrez nos espaces de qualité disponibles à la location. Que ce soit pour des événements culturels, sportifs ou éducatifs, nous avons l'espace qu'il vous faut."}
              </Typography>
            </TextContainer>
          </motion.div>

          <SpacesGrid>
            {spaces.map((space, index) => (
              <SpaceItem key={space.id} space={space} index={index} />
            ))}
          </SpacesGrid>
        </MotionDiv>
      </StyledDiv>
      
      <BackgroundLogo src="../images/logo-big.svg" />
      <Footer />
    </>
  );
}
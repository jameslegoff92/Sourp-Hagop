"use client";

import { useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import BackgroundLogo from "../components/ui/BackgroundLogo";
import Typography from "../components/display/Typography";
import LocationModal from "../components/modal/LocationModal";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

// --- STYLED COMPONENTS ---

const Section = styled.section`
  text-align: center;
  padding: 4rem 2rem 5rem;
  position: relative;

  @media (min-width: 768px) { padding: 5rem 3rem 6rem; }
  @media (min-width: 1024px) { padding: 6rem 4rem 8rem; }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionSubtitle = styled(motion.span)`
  display: inline-block;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #007dc3;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #007dc3;
  }
`;

const TitleWrapper = styled(motion.div)`
  margin-top: 1.5rem;
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const SpacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SpaceCard = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: box-shadow 0.4s ease, transform 0.4s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 125, 195, 0.15);
    transform: translateY(-5px);
  }

  &:hover .imageWrapper {
    transform: translateY(-70%);
  }

  &:hover .contentContainer {
    transform: translateY(0);
    opacity: 1;
  }
`;

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
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6));
  }
`;

const SpaceTitle = styled(Typography)`
  position: relative;
  z-index: 3;
  color: white !important;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.05rem;
  padding: 0 20px;
  text-shadow: 0 4px 10px rgba(0,0,0,0.3);
`;

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: var(--secondary-color, #f8fafc);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  z-index: 1;
`;

const SpaceDescription = styled.p`
  color: #444;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.05rem;
  font-weight: 400;
  flex-grow: 1;
  text-align: left;
`;

// --- COMPONENTS ---

const SpaceItem = ({ space, onOpen, index }) => (
  <SpaceCard
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onClick={() => onOpen(space)}
  >
    <ImageWrapper
      className="imageWrapper"
      style={{ backgroundImage: `url('${space.imageUrl}')` }}
    >
      <SpaceTitle as="h4" type="h4">{space.title}</SpaceTitle>
    </ImageWrapper>

    <ContentContainer className="contentContainer">
      <div>
        <SpaceDescription>{space.description}</SpaceDescription>
      </div>
      <Button style={{ width: "100%" }}>SAVOIR PLUS</Button>
    </ContentContainer>
  </SpaceCard>
);

export default function RentalSpacesPage({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);

  const openModal = (space) => {
    setSelectedSpace(space);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSpace(null);
  };

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImageUrl || "../images/header/rental-header.jpg"}
        headerText={data?.headerText || "LOCATION D'ESPACES"}
        headerTextTop="70%"
      />
      
      <Section>
        <ContentWrapper>
          
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nos installations
            </SectionSubtitle>
            
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                Nos espaces à votre disposition
              </Typography>
            </TitleWrapper>
          </SectionHeader>

          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography as="p" type="h6" color="dark">
              {data?.introText}
            </Typography>
          </TextContainer>

          <SpacesGrid>
            {data?.spaces?.map((space, idx) => (
              <SpaceItem key={idx} index={idx} space={space} onOpen={openModal} />
            ))}
          </SpacesGrid>

          <LocationModal
            isOpen={showModal}
            onClose={closeModal}
            space={selectedSpace}
          />

        </ContentWrapper>
      </Section>
      
      <Footer />
    </>
  );
}
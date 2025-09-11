"use client";

import { useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import BackgroundLogo from "../components/ui/BackgroundLogo";
import Typography from "../components/display/Typography";
import LocationModal from "../components/modal/LocationModal";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";

const StyledDiv = styled.div`
  text-align: left;
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
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

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
  transition: transform 0.5s ease;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));
  }
`;

const SpaceTitle = styled(Typography)`
  position: relative;
  z-index: 3;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.05rem;
`;

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: var(--secondary-color);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translateY(100%);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.4s ease;
  z-index: 1;
`;

const SpaceDescription = styled.p`
  color: black;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-family: var(--secondary-ff);
  font-size: 1rem;
  font-weight: 300;
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

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SpaceItem = ({ space, onOpen }) => (
    <SpaceCard>
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
            <Button onClick={() => onOpen(space)}>SAVOIR PLUS</Button>
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
                imageSrc={data?.headerImageUrl || "../images/header/rental-header.jpg"}
                headerText={data?.headerText || "LOCATION D'ESPACES"}
                headerTextTop="70%"
            />
            <StyledDiv>
                <MotionDiv>
                    <Typography as="h1" type="h1" color="primary" style={{ textAlign: "center" }}>
                        Nos espaces à votre disposition
                    </Typography>
                    <TextContainer>
                        <Typography as="p" type="h6" color="dark" style={{ textAlign: "center" }}>
                            {data?.introText}
                        </Typography>
                    </TextContainer>
                    <SpacesGrid>
                        {data?.spaces?.map((space, idx) => (
                            <SpaceItem key={idx} space={space} onOpen={openModal} />
                        ))}
                    </SpacesGrid>

                    <LocationModal
                        isOpen={showModal}
                        onClose={closeModal}
                        space={selectedSpace}
                    />

                </MotionDiv>
            </StyledDiv>
            <BackgroundLogo src="../images/logo-big.svg" />
            <Footer />
        </>
    );
}

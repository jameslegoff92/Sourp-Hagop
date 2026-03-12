"use client";

import { useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import Typography from "../components/display/Typography";
import LocationModal from "../components/modal/LocationModal";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   LAYOUT
───────────────────────────────────────────── */
const Section = styled.section`
  padding: 4rem 0 5rem;
  position: relative;
  background: #fff;

  @media (min-width: 768px) { padding: 5rem 0 6rem; }
  @media (min-width: 1024px) { padding: 6rem 0 8rem; }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (min-width: 768px) { padding: 0 2rem; }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Eyebrow = styled(motion.span)`
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
  margin-bottom: 1.5rem;
`;

const IntroText = styled(motion.div)`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
`;

/* ─────────────────────────────────────────────
   GRID
───────────────────────────────────────────── */
const SpacesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
const SpaceCard = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 96, 150, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 12px 36px rgba(0, 125, 195, 0.14);
    transform: translateY(-4px);
  }

  &:hover .card-image {
    transform: scale(1.05);
  }

  &:hover .card-accent {
    width: 60px;
  }
`;

const CardImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #e8f4fd;

  @media (min-width: 768px) { height: 240px; }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

/* Blue top bar on card image */
const CardImageBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #007dc3;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #006096;
  margin: 0 0 0.75rem 0;
  letter-spacing: 0.01em;
`;

const CardAccent = styled.div`
  width: 36px;
  height: 2px;
  background: #007dc3;
  margin-bottom: 1rem;
  transition: width 0.3s ease;
`;

const CardDescription = styled.p`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 96, 150, 0.08);
`;

const CardCta = styled.span`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #006096;
`;

const CardArrow = styled(motion.span)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 96, 150, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #006096;
`;

/* ─────────────────────────────────────────────
   SPACE ITEM
───────────────────────────────────────────── */
const SpaceItem = ({ space, onOpen, index }) => (
  <SpaceCard
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    onClick={() => onOpen(space)}
  >
    <CardImageWrap>
      <CardImageBar />
      <CardImage
        className="card-image"
        style={{ backgroundImage: `url('${space.imageUrl}')` }}
      />
    </CardImageWrap>

    <CardBody>
      <CardTitle>{space.title}</CardTitle>
      <CardAccent className="card-accent" />
      <CardDescription>{space.description}</CardDescription>

      <CardFooter>
        <CardCta>En savoir plus</CardCta>
        <CardArrow whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CardArrow>
      </CardFooter>
    </CardBody>
  </SpaceCard>
);

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function RentalSpacesPage({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);

  const openModal = (space) => { setSelectedSpace(space); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setSelectedSpace(null); };

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImageUrl || "../images/header/rental-header.jpg"}
        headerText={data?.headerText || "LOCATION D'ESPACES"}
        headerTextTop="70%"
      />

      <Section>
        <Container>
          <SectionHeader>
            <Eyebrow
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Nos installations
            </Eyebrow>

            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                Nos espaces à votre disposition
              </Typography>
            </TitleWrapper>

            <IntroText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography as="p" type="h6" color="dark">
                {data?.introText}
              </Typography>
            </IntroText>
          </SectionHeader>

          <SpacesGrid>
            {data?.spaces?.map((space, idx) => (
              <SpaceItem key={idx} index={idx} space={space} onOpen={openModal} />
            ))}
          </SpacesGrid>
        </Container>
      </Section>

      <LocationModal isOpen={showModal} onClose={closeModal} space={selectedSpace} />

      <Footer />
    </>
  );
}

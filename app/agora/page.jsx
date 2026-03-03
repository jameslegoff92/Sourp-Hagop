"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Menu from "../../components/ui/Menu";
import Typography from "../../components/display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Section = styled.section`
  text-align: center;
  padding: 4rem 2rem 5rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 3rem 6rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 4rem 8rem;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
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
  max-width: 1000px;
  margin: 0 auto 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Divider = styled(motion.div)`
  width: 50px;
  height: 2px;
  background: #007dc3;
  margin: 3rem auto;
`;

const MenuWrapper = styled(motion.div)`
  width: 100%;
  margin-top: 2rem;
`;

export default function Agora() {
  return (
    <>
      <Header
        animate={false}
        videoSrc="../videos/video-agora.mp4"
        headerText="AGORA ANNA & MANOUK DJOUKHADJIAN"
        headerTextTop="70%"
      />

      <Section>
        <ContentContainer>
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nutrition
            </SectionSubtitle>
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                Agora Anna et Manouk Djoukhadjian
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
              Bien plus qu'un lieu où l'on sert un repas chaud et nutritif, l'Agora est un espace de rassemblement multifonctionnel moderne et lumineux. Ici se rencontrent à différents moments de la journée camarades et collègues pour partager un repas, discuter, apprendre et se divertir.
            </Typography>
            <Typography as="p" type="h6" color="dark">
              Découvrez le menu de la semaine à l'Agora!
            </Typography>
          </TextContainer>

          <Divider
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          <MenuWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Menu />
          </MenuWrapper>
        </ContentContainer>
      </Section>

      {/* <BackgroundLogo src="../images/logo-big.svg" /> */}
      <Footer />
    </>
  );
}
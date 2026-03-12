"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Menu from "./ui/Menu";
import Typography from "./display/Typography";
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

export default function Agora({ data }) {
  const menuData = {
    primaireWeeks: data?.primaireWeeks || [],
    secondaireWeeks: data?.secondaireWeeks || [],
    dessertNotes: {
      primaire: data?.dessertNotePrimaire || "* Avec chaque repas, un dessert est offert parmi le yogourt, la pomme, le jello, le pudding au chocolat ou la salade de fruits.",
      secondaire: data?.dessertNoteSecondaire || "* Avec chaque repas, un dessert est offert soit un biscuits au brisure du chocolat ou un gâteau.",
    },
  };

  return (
    <>
      <Header
        animate={false}
        videoSrc={data?.headerVideoUrl || "../videos/video-agora.mp4"}
        imageSrc={data?.headerImageUrl}
        headerText={data?.headerText || "AGORA ANNA & MANOUK DJOUKHADJIAN"}
        headerTextTop="70%"
      />

      <Section>
        <ContentContainer>
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nutrition
            </SectionSubtitle>
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                {data?.mainTitle || "Agora Anna et Manouk Djoukhadjian"}
              </Typography>
            </TitleWrapper>
          </SectionHeader>

          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography as="p" type="h6" color="dark">
              {data?.introText || "Bien plus qu'un lieu où l'on sert un repas chaud et nutritif, l'Agora est un espace de rassemblement multifonctionnel moderne et lumineux. Ici se rencontrent à différents moments de la journée camarades et collègues pour partager un repas, discuter, apprendre et se divertir."}
            </Typography>
            <Typography as="p" type="h6" color="dark">
              {data?.menuCallToAction || "Découvrez le menu de la semaine à l'Agora!"}
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
            <Menu data={menuData} />
          </MenuWrapper>
        </ContentContainer>
      </Section>

      <Footer />
    </>
  );
}
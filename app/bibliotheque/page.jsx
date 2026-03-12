"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 200px; /* Matched to Code 1 */
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
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

const ImageGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem; /* Matched to Code 1 */
  margin: 3rem auto;
  width: 100%;
  aspect-ratio: 3 / 2;

  @media (min-width: 768px) {
    gap: 2rem;
    margin: 4rem auto;
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 12px; /* Added from Code 1 */
  object-fit: cover;
`;

export default function Soutien() {
  const images = [
    { src: "../images/bibliotheque/bibliotheque-1.jpg", gridArea: "1 / 1 / 2 / 2" },
    { src: "../images/bibliotheque/bibliotheque-2.jpg", gridArea: "1 / 2 / 3 / 3" },
    { src: "../images/bibliotheque/bibliotheque-3.jpg", gridArea: "1 / 3 / 2 / 4" },
    { src: "../images/bibliotheque/bibliotheque-4.jpg", gridArea: "2 / 1 / 3 / 2" },
    { src: "../images/bibliotheque/bibliotheque-5.jpg", gridArea: "2 / 3 / 3 / 4" },
  ];

  return (
    <>
      <Header 
        animate={false} 
        imageSrc="../images/header/bibliotheque-header.jpg" 
        headerText="Bibliothèque" 
        headerTextTop="70%" 
      />
      <StyledDiv>
        <MotionDiv>
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Espace d'apprentissage
            </SectionSubtitle>
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                Bibliothèque
              </Typography>
            </TitleWrapper>
          </SectionHeader>

          <TextContainer>
            <Typography
              as="p"
              type="h6"
              color="dark"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              La bibliothèque de Sourp Hagop offre un espace calme et accueillant, où élèves et enseignants peuvent lire, étudier et explorer une variété de ressources imprimées et numériques.
            </Typography>
          </TextContainer>

          <ImageGrid>
            {images.map((image, index) => (
              <StyledImage
                key={index}
                src={image.src}
                alt={`bibliotheque image ${index + 1}`}
                style={{ gridArea: image.gridArea }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: 0.5, 
                    delay: index * 0.2, /* Changed to consistent sequential delay */
                    ease: "easeInOut" 
                }}
                viewport={{ once: true, amount: 0.1 }}
              />
            ))}
          </ImageGrid>
        </MotionDiv>
      </StyledDiv>
      <Footer />
    </>
  );
}
"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Typography from "@/components/display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
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

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  justify-items: center;
  align-items: center;
  margin: 50px auto;
  max-width: 1200px;
  padding: 0 20px;

  @media (max-width: 1234px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const BlueRectangle = styled(motion.div)`
  background-color: var(--secondary-color);
  width: 220px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  text-align: center;
  opacity: 0; /* Initially hidden */
  transform: translateY(20px); /* Slightly offset initially */

  @media (max-width: 1234px) {
    width: 70%;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const Paragraph = styled.p`
  padding: 10px 10px;
  color: #333;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const StyledIcon = styled.img`
  width: ${(props) => props.size || '80px'};
  height: ${(props) => props.size || '80px'};
  padding: 10px 0;
`;

const RectangleItem = ({ src, text, size, index }) => (
    <BlueRectangle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
    >
        <StyledIcon src={src} alt="" size={size} />
        <Paragraph>{text}</Paragraph>
    </BlueRectangle>
);

export default function ProjetEducatif() {
    return (
        <>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Header
                animate={false}
                imageSrc="../images/header/projet-educatif-header.jpg"
                headerText="PROJET ÉDUCATIF"
                headerTextTop="70%"
            />

            <StyledDiv>
                <MotionDiv>
                    <Typography
                        as="h1"
                        type="h1"
                        color="primary"
                        initial={{ opacity: 0, y: -25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
                        transition={{ duration: 0.9, ease: "easeIn" }}
                    >
                        Notre Mission
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
                            L'école arménienne Sourp Hagop a pour mission d'éduquer, instruire et socialiser chaque élève,
                            en favorisant sa réussite scolaire et son épanouissement personnel.
                            Nous transmettons la langue, l'histoire et la culture arméniennes,
                            tout en préparant chaque élève à s'engager pleinement dans son parcours professionnel et personnel.
                        </Typography>
                    </TextContainer>
                </MotionDiv>

                <Typography
                    as="h1"
                    type="h1"
                    color="primary"
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "all", margin: "0px 0px -80px 0px", once: true }}
                    transition={{ duration: 0.9, ease: "easeIn" }}
                    style={{ marginTop: '80px' }}
                >
                    Nos engagements
                </Typography>
                <ItemsContainer>
                    <RectangleItem src="../images/icon/plant.svg" text="Développer le potentiel de chaque élève et lui inculquer les valeurs de l’école." index={0} />
                    <RectangleItem src="../images/icon/trophy.svg" text="Contribuer à la réussite de chaque élève." index={1} />
                    <RectangleItem src="../images/icon/handshake.svg" text="Promouvoir la fierté d’appartenir à la communauté scolaire." index={2} />
                    <RectangleItem src="../images/icon/star.svg" text="Servir de modèles positifs." index={3} />
                    <RectangleItem src="../images/icon/rocket.svg" text="Être une équipe dynamique, passionnée et innovatrice qui s’entraide et qui collabore." index={4} />
                    <RectangleItem src="../images/icon/sun.svg" text="Créer un climat de travail positif" index={5} />
                    <RectangleItem src="../images/icon/school.svg" text="Créer et maintenir des liens de collaboration avec des parents pour la réussite de leurs enfants, dans un esprit de respect mutuel." index={6} />
                    <RectangleItem src="../images/icon/confetti.svg" text="Célébrer nos succès" index={7} />
                </ItemsContainer>

                <Typography
                    as="h1"
                    type="h1"
                    color="primary"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "all", margin: "0px 0px -90px 0px", once: true }}
                    transition={{ duration: 1.7, ease: "easeInOut" }}
                    style={{ marginTop: '80px' }}
                >
                    Orientations Générales
                </Typography>
            </StyledDiv>
            <Footer />
        </>
    );
}

"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import styled from "@emotion/styled";
import Typography from "@/components/display/Typography";
import { motion } from "framer-motion";
import BackgroundLogo from "@/components/ui/BackgroundLogo";

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

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  grid-gap: 20px;
  margin-top: 50px;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Historique() {
    const images = [
        { src: "../images/anciens/anciens-2.jpg", gridArea: "1 / 1 / 2 / 2" },
        { src: "../images/anciens/anciens-5.jpg", gridArea: "1 / 3 / 2 / 4" },
        { src: "../images/anciens/anciens-4.jpg", gridArea: "2 / 1 / 3 / 2" },
        { src: "../images/anciens/anciens-1.jpg", gridArea: "1 / 2 / 3 / 3" },
        { src: "../images/anciens/anciens-3.jpg", gridArea: "2 / 3 / 3 / 4" },
    ];

    const randomDelays = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6].sort(() => 0.5 - Math.random());

  return (
    <>
        <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
        <Header imageSrc="../images/header/anciens-header.jpg" headerText="ANCIENS ET ANCIENNES" headerTextTop="60%"/>
        <StyledDiv>
            <MotionDiv>
                <Typography
                    as="h1"
                    type="h1"
                    color="primary"
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                    Que signifie être un ancien de Sourp Hagop ?
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
                        Être un ancien élève de Sourp Hagop signifie faire partie d'une fière lignée d'individus qui ont réussi, fait preuve de leadership et se sont activement engagés dans leurs communautés, que ce soit au Québec ou ailleurs dans le monde. Cela signifie appartenir à une communauté dynamique qui valorise la persévérance, l'excellence et le partage de connaissances et d'expériences avec la prochaine génération d'élèves.
                    </Typography>
                </TextContainer>
                <ImageGrid>
                    {images.map((image, index) => (
                    <StyledImage
                        key={index}
                        src={image.src}
                        alt={`collage image ${index + 1}`}
                        style={{ gridArea: image.gridArea }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: randomDelays[index], ease: "easeInOut" }}
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
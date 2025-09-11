"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
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

const ImageGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8%;
  margin: 50px auto 0 auto; /* Center the grid horizontally */
  width: 70%; /* Shrinks proportionally */
  aspect-ratio: 3 / 2;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
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

    const randomDelays = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => 0.5 - Math.random());

    return (
        <>
            <Header animate={false} imageSrc="../images/header/bibliotheque-header.jpg" headerText="Bibliothèque" headerTextTop="70%" />
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
                        Bibliothèque
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
                                transition={{ duration: 0.5, delay: randomDelays[index], ease: "easeInOut" }}
                                viewport={{ once: true, amount: 0.1 }}
                            />
                        ))}
                    </ImageGrid>
                </MotionDiv>
            </StyledDiv>
            <BackgroundLogo src="../images/logo-big.svg"/>
            <Footer />
        </>
    );
}
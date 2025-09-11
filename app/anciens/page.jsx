"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import styled from "@emotion/styled";
import Typography from "../../components/display/Typography";
import { motion } from "framer-motion";
import BackgroundLogo from "../../components/ui/BackgroundLogo";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 200px;
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

// Styled components for social media icons
const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
  width: 70%;
  margin: 0 auto;
  position: absolute;
  bottom: 50px;
`;

const SocialLink = styled.a`
  margin: 0 5%;
  display: flex;
`;

const SocialIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 50%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function Historique() {
    const images = [
        { src: "../images/anciens/anciens-1.jpg", gridArea: "1 / 1 / 2 / 2" },
        { src: "../images/anciens/anciens-2.jpg", gridArea: "1 / 2 / 3 / 3" },
        { src: "../images/anciens/anciens-3.jpg", gridArea: "1 / 3 / 2 / 4" },
        { src: "../images/anciens/anciens-4.jpg", gridArea: "2 / 1 / 3 / 2" },
        { src: "../images/anciens/anciens-5.jpg", gridArea: "2 / 3 / 3 / 4" },
    ];

    const randomDelays = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => 0.5 - Math.random());

    return (
        <>
            <Header imageSrc="../images/header/anciens-header.jpg" headerText="ANCIENS ET ANCIENNES" headerTextTop="70%" />
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
                    <Typography
                        as="p"
                        type="h4"
                        color="primary"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        La mission des anciens élèves de Sourp Hagop
                    </Typography>
                    <TextContainer>
                        <Typography
                            as="p"
                            type="subtitle"
                            color="dark"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            La mission des anciens élèves de Sourp Hagop est de favoriser l'engagement et de renforcer le sentiment d'appartenance parmi les anciens. À travers des parcours inspirants, des activités philanthropiques et des retrouvailles, leurs contributions demeurent une source de fierté à Sourp Hagop.
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
                    <Typography
                        as="p"
                        type="h4"
                        color="primary"
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        Heureux de votre parcours ? Venez partager votre passion et expérience avec nos jeunes en quête d’avenir.
                    </Typography>
                    <Typography
                        as="p"
                        type="subtitle"
                        color="dark"
                        style={{ textAlign: "center", marginTop: "20px" }}
                    >
                        Restons connectés ! Partagez vos coordonnées via ce <a href="https://docs.google.com/forms/d/e/1FAIpQLSf8M6-kj9gq_R_B5M8OBd0Qo_t1cPbtRRvDMbbAqbTUM81PlQ/viewform" target="_blank" style={{ color: "#006096", fontWeight: "500" }}>FORMULAIRE</a> et suivez-nous sur les réseaux sociaux pour ne rien manquer.
                    </Typography>
                    <SocialMediaContainer>
                        <SocialLink
                        href="https://www.facebook.com/groups/ancienssourphagop/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <SocialIcon src="../images/anciens/ancien-facebook.svg" alt="Facebook" />
                        </SocialLink>
                        <SocialLink
                        href="https://www.instagram.com/sh_alumni/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <SocialIcon src="../images/anciens/ancien-instagram.svg" alt="Instagram" />
                        </SocialLink>
                        <SocialLink
                        href="https://www.linkedin.com/company/ecole-armenienne-sourphagop/"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <SocialIcon src="../images/anciens/ancien-linkedIn.svg" alt="LinkedIn" />
                        </SocialLink>
                    </SocialMediaContainer>
                </MotionDiv>
            </StyledDiv>
            <BackgroundLogo src="../images/anciens/anciens-logo.jpg" />
            <Footer />
        </>
    );
}
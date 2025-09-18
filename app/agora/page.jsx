"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Menu from "../../components/ui/Menu";
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

export default function Soutien() {

    return (
        <>
            <Header animate = {false} videoSrc="../videos/video-agora.mp4" headerText="AGORA ANNA & MANOUK DJOUKHADJIAN" headerTextTop="70%" />

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
                            Agora Anna et Manouk Djoukhadjian
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
Bien plus qu’un lieu où l’on sert un repas chaud et nutritif, l’Agora est un espace de rassemblement multifonctionnel moderne et lumineux. Ici se rencontrent à différents moments de la journée camarades et collègues pour partager un repas, discuter, apprendre et se divertir. 
</Typography>
<br/>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            style = {{}}
                        >
Découvrez le menu de la semaine à l’Agora!
                        </Typography>
                    </TextContainer>
                </MotionDiv>
                <Menu />
            </StyledDiv>
            <BackgroundLogo src="../images/logo-big.svg"/>
            <Footer />
        </>
    );

}
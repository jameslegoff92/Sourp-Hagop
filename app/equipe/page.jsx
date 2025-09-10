"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
import Accordion from "../../components/ui/Accordion";
import CustomButton from "../../components/inputs/Button"
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

export default function Equipe() {

    return (
        <>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Header animate = {false} imageSrc="../images/header/equipe-header.jpg" headerText="NOTRE ÉQUIPE" headerTextTop="70%" />

            <StyledDiv>
                <MotionDiv>

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
                            Nous sommes une équipe dévouée et passionnée, engagée à offrir une expérience éducative exceptionnelle à nos élèves. Chaque membre de notre personnel, qu'il soit enseignant, personnel administratif, ou auxiliaire, joue un rôle essentiel dans la réussite de notre école et le bien-être de nos élèves. Nous valorisons la collaboration, le professionnalisme et l'engagement envers l'excellence dans tout ce que nous faisons. Ensemble, nous créons un environnement d'apprentissage accueillant, stimulant et sécuritaire où chaque élève peut s'épanouir et atteindre son plein potentiel.
                        </Typography>
                    </TextContainer>
                    <Accordion />
                    <TextContainer>
                        <Typography
                            as="p"
                            type="h4"
                            color="seondaryDark"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            Envie de contribuer à une mission éducative et de faire partie d’une équipe passionnée ? Rejoignez-nous dès maintenant !
                        </Typography>
                    </TextContainer>
                </MotionDiv>
                <CustomButton
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    style={{ marginTop: "50px" }}
                >
                    Appliquer Maintenant
                </CustomButton>
            </StyledDiv>
            <Footer />
        </>
    );

}
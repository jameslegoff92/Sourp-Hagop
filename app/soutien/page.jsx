"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Typography from "@/components/display/Typography";
import Accordion from "@/components/ui/AccordionSoutien";
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
    const contentData = {
        "Plan d'intervention": "Le plan d'intervention est élaboré en fonction des forces et des besoins particuliers de certains élèves qui ont besoin d'un coup de pouce additionnel, en collaboration avec l'enseignante titulaire, les parents et la coordonnatrice pédagogique ou en présence de l'élève du secondaire, le cas échéant.",
        "Études surveillées": "Les études surveillées ont lieu après les heures de classe soit entre 16h et 18h, à la bibliothèque de l'école, sous la supervision d'étudiants universitaires et du surveillant général.",
        "Programmes de récupération": "Le programme de récupération est offert aux élèves qui ont besoin de temps ou d'accompagnement supplémentaire en vue d'assurer leur réussite scolaire. Ils sont offerts par les enseignants de Sourp Hagop, durant la journée scolaire.",
        "Programme «Pairs aidants»": "Le programme de tutorat «Pairs aidants» permet à nos élèves de secondaire de fournir un coup de pouce supplémentaire aux élèves du primaire qui ont besoin d'un accompagnement supplémentaire dans leurs devoirs. Cette initiative permet, à la fois, aux jeunes du primaire de progresser dans leurs apprentissages et aux adolescents aidants de développer leurs habiletés.",
        "Service d'orthophonie et d'orthopédagogie ($)": "Un parrainage avec l'organisme Parcours d'enfants permet aux jeunes présentant certaines difficultés d'apprentissage d'être suivis par une orthopédagogue et une orthophoniste lors des heures d'école.",
        "Service de tutorat ($)": "Le service de tutorat est offert aux élèves du secondaire en français et en mathématiques. L'objectif est de fournir un accompagnement individualisé afin de permettre à chaque élève de progresser à son rythme et de renforcer ses compétences. Pour toute information, veuillez contacter le secrétariat.",
    };

    return (
        <>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Header animate = {false} imageSrc="../images/header/soutien-header.jpg" headerText="SOUTIEN AUX ÉLÈVES" headerTextTop="70%" />

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
                            Nos Services
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
                            À l'École arménienne Sourp Hagop, nous proposons une variété de services pédagogiques pour soutenir nos élèves tout au long de leur parcours scolaire. Ces services visent à répondre aux besoins spécifiques de chacun, en offrant un accompagnement personnalisé et des ressources supplémentaires pour favoriser leur épanouissement académique et leur réussite.
                        </Typography>
                    </TextContainer>
                    <Accordion data={contentData} />
                </MotionDiv>
            </StyledDiv>
            <Footer />
        </>
    );

}
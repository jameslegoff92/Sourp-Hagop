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

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: clamp(12rem, 2vw, 12rem);
    height: clamp(15rem, 2vw, 12rem);
    object-fit: cover;
    margin: 20px 0 10px 0;
  }
  h4 {
    margin: 10px 0 5px;
    font-size: 1.1rem;
  }
  p {
    font-size: 0.9rem;
    color: #555;
  }
`;

const ImageItemsContainer = styled.div`
  display: flex;
  padding-top: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ImageItemComponent = ({ src, alt, name, title }) => (
    <ImageItem>
        <img
            src={src}
            alt={alt}
        />
        <Typography
            as="p"
            type="h4"
            color="dark"
            initial={{ opacity: 0, y: 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {name}
        </Typography>
        <Typography
            as="p"
            type="p"
            color="dark"
            initial={{ opacity: 0, y: 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {title}
        </Typography>
    </ImageItem>
);

export default function ConseilAdministration() {
    return (
        <>
            <Header
                animate={false}
                imageSrc="../images/header/conseil-administration-header.jpg"
                headerText="CONSEIL ADMINISTRATION"
                headerTextTop="72%"
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
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                    >
                        Rôle et Responsabilités
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
                            Le Conseil d'Administration de l'École arménienne Sourp Hagop, composé de parents, anciens élèves et professionnels engagés,
                            veille au bon fonctionnement de l'école. Il établit les orientations générales, planifie et approuve le budget,
                            supervise les rénovations majeures, modernise le matériel pédagogique, et s'assure du respect des normes ministérielles.
                            Le Conseil s'occupe également des relations avec la communauté et veille à répondre aux besoins de l'école et de sa clientèle.
                        </Typography>
                    </TextContainer>
                </MotionDiv>
                {/*
                <ImageItemsContainer>
                    <ImageItemComponent
                        src="../images/staff/_default.jpg"
                        alt="Nom Prénom"
                        name="Nom Prénom"
                        title="Description"
                    />
                    <ImageItemComponent
                        src="../images/staff/_default.jpg"
                        alt="Nom Prénom"
                        name="Nom Prénom"
                        title="Description"
                    />
                    <ImageItemComponent
                        src="../images/staff/_default.jpg"
                        alt="Nom Prénom"
                        name="Nom Prénom"
                        title="Description"
                    />
                </ImageItemsContainer>
                */}
            </StyledDiv>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Footer />
        </>
    );
}

"use client";

import Image from "next/image";
import ThreeColumnLayout from "../layout/flexbox/ThreeColumnLayout";
import styled from "@emotion/styled";
import Typography from "../display/Typography";
import { motion } from "framer-motion";
import Container from "./Container";

const StyledDiv = styled.div`
  text-align: center;
  padding: 40px 0 300px;
  position relative;
`;

const ExtendedStyledDiv = styled(StyledDiv)`
  background-color: var(--secondary-color);
`;

const StyledImage = styled(Image)`
  position: absolute;
  opacity: 0.1;
  z-index: -1;
  left: 50%;
  transform: translateX(-40%);
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 100px auto 0;
  width: 50%;
`;

const ExtendedMotionDiv = styled(MotionDiv)`
  flex-direction: row;
  width: 100%;
`;

const TextContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ValueContainer = styled(motion.div)`
  background-color: transparent;
  overflow: hidden;
  height: 600px;
  width: 600px;
`;

const ValueSubContainer = styled(motion.div)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.5), rgba(0, 96, 150, 0.5)),
    // Blue tint overlay// Blue tint overlay
    url("/images/value-img-1.png"); // Replace with your image URL
  background-size: cover; // Ensures the image covers the whole div
  background-position: center; // Centers the image
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 40px;
`;

const ValueSubContainer2 = styled(ValueSubContainer)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.5), rgba(0, 96, 150, 0.5)),
    // Blue tint overlay// Blue tint overlay
    url("/images/value-img-2.png"); // Replace with your image URL
`;

const ValueText = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 4rem 0;
  height: 100%;
  background-color: var(--tertiary-color);
`;

const listVariants = {
  initial: {},
  hover: {},
};

const itemVariants = {
  initial: { height: "100%" },
  hover: {
    height: "25%",
    transition: {
      duration: 0.2,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, color: "#fff" },
  hover: { color: "#000", opacity: 1, transition: { duration: 2 } },
};

const Main = () => {
  return (
    <>
      <StyledDiv>
        <StyledImage src="/images/logo-big.svg" alt="hero image" width={635} height={558} />
        <MotionDiv>
          <Typography
            as="h1"
            type="h1"
            color="primary"
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Pourquoi choisir Sourp Hagop
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h5"
              color="dark"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar, mauris vitae bibendum dictum, tellus
              velit fermentum dolor, rutrum porta est velit varius ligula. Vestibulum at finibus diam. Fusce commodo
              risus nulla, eleifend mattis mi pharetra a. Fusce vitae elit id ipsum mattis vulputate. Aliquam quis dolor
              ligula. Nulla facilisi. In hac habitasse platea dictumst. Cras sed tellus est.
            </Typography>
          </TextContainer>
        </MotionDiv>
      </StyledDiv>

      {/* VALUES SECTION */}

      <ExtendedStyledDiv>
        <Container>
          <Typography as="h1" type="h2" primary="secondary" color="primary">
            Nos Valeurs
          </Typography>
          <ExtendedMotionDiv>
            <ValueContainer inital="initial" whileHover="hover" variants={listVariants}>
              <ValueSubContainer variants={itemVariants}>
                <Typography as="h1" type="h4" color="light" fontFamily="secondary">
                  ACCOMPLISSEMENT DE SOI
                </Typography>
              </ValueSubContainer>

              <ValueText as="p" type="h6" fontFamily="secondary" variants={textVariants}>
                À Sourp Hagop, nous aidons nos élèves à atteindre l'accomplissement de soi en découvrant et développant
                leur plein potentiel pour une vie épanouie.
              </ValueText>
            </ValueContainer>
          </ExtendedMotionDiv>
        </Container>
      </ExtendedStyledDiv>
      <ThreeColumnLayout components={[1, 2, 3]}/>

      
    </>
  );
};

export default Main;

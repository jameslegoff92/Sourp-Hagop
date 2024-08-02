"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import Typography from "../display/Typography";
import { motion } from "framer-motion";

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

const TextContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

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
      <StyledDiv>
        <Typography as="h1" type="h2"  primary="secondary" color="primary" >
          Nos Valeurs
        </Typography>
      </StyledDiv>
    </>
  );
};

export default Main;

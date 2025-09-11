"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
`;

const StyledImage = styled.img`
  display: block;
  margin: 100px auto 2.5rem;
  width: 23.5rem;
  padding-left: 67px;
  height: auto;
`;

const TextContainer = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const MainTitle = styled.h6`
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-family: var(--secondary-ff);
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem); // Responsive font size
`;

const LineContainer = styled(motion.div)`
  height: 1px;
  background-color: white;
  position: relative;
  top: 0.1rem;

  @media (max-width: 1112px) {
    top: 0.1rem;  // Adjust this value to move the line lower on mobile
  }
`;

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "110%",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1,
    },
  },
};

function MainHeading() {
  return (
    <Container>
      <LineContainer
        initial="hidden"
        animate="visible"
        variants={lineVariants}
      />
      <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
        <StyledImage src="images/logo.jpg" alt="logo" />
        <TextContainer>
          <MainTitle>Toujours plus haut, toujours plus loin!</MainTitle>
          <SubTitle>Préscolaire | Primaire | Secondaire</SubTitle>
        </TextContainer>
      </motion.div>
    </Container>
  );
}

export default MainHeading;

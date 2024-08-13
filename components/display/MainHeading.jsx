"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
`;

const StyledImage = styled(Image)`
  display: block;
  margin: 0 auto 2.5rem;
  width: clamp(10rem, 30vw, 35rem);
  padding-left: 100px;
  height: auto;

  @media (max-width: 768px) {
    width: clamp(8rem, 40vw, 30rem);
  }

  @media (max-width: 480px) {
    width: clamp(6rem, 50vw, 20rem);
  }
`;

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1 // 1 second delay added here
    }
  }
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "110%",
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1 // 1 second delay added here
    }
  }
};

function MainHeading() {
  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={lineVariants}
        style={{
          height: "1px",
          backgroundColor: "white",
          position: "relative",
          top: "-1rem",
        }}
      />
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <StyledImage src="images/logo-big.svg" width={353} height={315} alt="logo" />
      <div>
        <h1 className="h1">Toujours plus haut, toujours plus loin !</h1>
        <p className="h3">Préscolaire | Primaire | Secondaire</p>
      </div>
    </motion.div>
    </Container>
  );
}

export default MainHeading;

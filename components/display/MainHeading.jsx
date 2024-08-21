"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Typography from "@/components/display/Typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
`;

const StyledImage = styled(Image)`
  display: block;
  margin: 0 auto 2.5rem;
  width: clamp(10rem, 30vw, 30rem);
  padding-left: 100px;
  height: auto;

  @media (max-width: 768px) {
    width: clamp(8rem, 40vw, 25rem);
    margin-top: 100px;
    padding-left: 0;
    margin-left: 100px;
  }

  @media (max-width: 480px) {
    width: clamp(6rem, 50vw, 20rem);
  }
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
  top: -1rem;

  @media (max-width: 768px) {
    top: 0.5rem;  // Adjust this value to move the line lower on mobile
  }
`;

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1, // 1 second delay added here
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
      delay: 1, // 1 second delay added here
    },
  },
};

const ScrollButton = () => {
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.5,
        repeat: Infinity,
        repeatDelay: 0.5
      }
    }
  };

  const chevronVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 1.5  // Adjust this delay to control how long all three chevrons stay visible
      }
    }
  };


  return (
    <motion.button
      className="scroll-button"
      variants={buttonVariants}
      whileHover="hover"
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'lightblue',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={chevronVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ marginTop: '-5px' }}
          >
            <FaChevronDown 
              style={{ 
                color: 'white', 
                fontSize: '16px'
              }} 
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.button>
  );
};

function MainHeading() {
  return (
    <Container>
      <LineContainer
        initial="hidden"
        animate="visible"
        variants={lineVariants}
        style={{
          height: "1px",
          backgroundColor: "white",
          position: "relative",
          zIndex: -5,
          top: "-1rem",
        }}
      />
      <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
        <StyledImage src="images/logo.svg" width={300} height={265} alt="logo" />
        <TextContainer>
          <MainTitle>Toujours plus haut, toujours plus loin !</MainTitle>
          <SubTitle>Préscolaire | Primaire | Secondaire</SubTitle>
        </TextContainer>
      </motion.div>
    </Container>
  );
}

export default MainHeading;

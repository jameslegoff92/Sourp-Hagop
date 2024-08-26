import { useRef } from "react";


//Third Party Imports
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

//Local Imports
import Typography from "../display/Typography";
import Container from "../layout/Container";

//Data Structure for the Value Component
const valueData = [
  {
    title: "Respect",
    text: "À Sourp Hagop, nous aidons nos élèves à atteindre l'accomplissement de soi en découvrant et développant leur plein potentiel pour une vie épanouie.",
  },
  {
    title: "Responsabilité",
    text: "La responsabilité nous rend autonomes. À Sourp Hagop, nous encourageons les élèves à prendre en charge leurs actions et à s'engager activement dans leur communauté.",
  },
  {
    title: "Accomplissement de Soi",
    text: "Le respect est essentiel. À l'école arménienne Sourp Hagop, nous valorisons le respect envers tous, créant un environnement de confiance et de considération mutuelle.",
  },
];

//CSS Style Variants
const styleVariants = {
  0: {
    background:
      "linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)), url('/images/value-img-1.png')",
    backgroundColor: "var(--tertiary-color)",
  },
  1: {
    background:
      "linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)), url('/images/respect.JPG')",
    backgroundColor: "#006096",
  },
  2: {
    background:
      "linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)), url('/images/responsible.JPG')",
    backgroundColor: "var(--tertiary-color)",
  },
};

//CSS For Values Section
const ValuesContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 40px 0 100px;
  position relative;
  text-align: center;
  `;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-top: var(--spacing-7);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const ValueWrapper = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  padding-top: var(--spacing-2);
  margin: 0 auto 0;
  width: 50%;
  flex-direction: column;
  width: 100%;
  margin-bottom: var(--spacing-4);

  @media (min-width: 768px) {
    width: calc(33.333% - var(--spacing-4));
    margin-bottom: 0;
  }
`;

const ValueContainer = styled(motion.div)`
  overflow: hidden;
  height: 31.25rem;
`;

const ValueSubContainer = styled(motion.div)`
  background: ${(props) => styleVariants[props.index].background};
  background-size: cover; // Ensures the image covers the whole div
  background-position: center; // Centers the image
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 40px;
`;

const TextDiv = styled(motion.div)`
  background-color: ${(props) => styleVariants[props.index].backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 1rem;
  height: 100%;

  @media (min-width: 768px) {
    padding: 6rem 4rem 0;
    height: 100%;
  }
`;

const ValueText = styled(Typography)`
  color: ${(props) => (props.index == 1 ? "#fff" : "var(--black)")};
  font-size: 0.9rem;
  width: 75%;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 1rem;
    width: 100%;
  }
`;

//ValueItem Component
const ValueItem = ({ value, index }) => {
  const parentControls = useAnimation();
  const childControls1 = useAnimation();
  const childControls2 = useAnimation();
  const isOpen = useRef(false);  // Internal flag to track the open/closed state


  const handleHoverStart = async () => {
    await parentControls.start({});
    await childControls1.start({
      height: "25%",
      transition: { duration: 0.3 },
    });
    await childControls2.start({
      scale: 1.2,
      opacity: 1,
      transition: { duration: 0.5 },
    });
  };

  const handleHoverEnd = async () => {
    await parentControls.start({});
    await childControls1.start({
      height: "100%",
      transition: { duration: 0.3 },
    });
    await childControls2.start({
      scale: 1,
      opacity: 0,
      transition: { duration: 0.2 },
    });
  };

  const handleTap = async () => {
    if (isOpen.current) {
      // If the element is in its initial state (scale: 1), expand it
      await childControls1.start({
        height: "100%",
        transition: { duration: 0.3 },
      });
      await childControls2.start({
        scale: 1,
        opacity: 0,
        transition: { duration: 0.2 },
      });
    } else {
      // If the element is expanded, collapse it back to its original size
      await childControls1.start({
        height: "25%",
        transition: { duration: 0.3 },
      });
      await childControls2.start({
        scale: 1.2,
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }

    isOpen.current = !isOpen.current;  // Toggle the flag
  };

  return (
    <ValueWrapper>
      <ValueContainer
        animate={parentControls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onTap={handleTap}
      >
        <ValueSubContainer
          index={index}
          initial={{ height: "100%" }}
          animate={childControls1}
        >
          <Typography as="h1" type="h4" color="light" fontFamily="secondary">
            {value.title}
          </Typography>
        </ValueSubContainer>
        <TextDiv index={index}>
          <ValueText
            index={index}
            as="p"
            type="h6"
            fontFamily="secondary"
            initial={{ opacity: 0 }}
            animate={childControls2}
          >
            {value.text}
          </ValueText>
        </TextDiv>
      </ValueContainer>
    </ValueWrapper>
  );
};

//Values Component: Used to simply map() the ValueItem Component
const Values = () => {
  return (
    <>
      <ValuesContainer>
        <Container>
          <Typography as="h1" type="h2" color="primary">
            Nos Valeurs
          </Typography>
          <CardContainer>
            {valueData.map((value, index) => (
              <ValueItem key={index} value={value} index={index} />
            ))}
          </CardContainer>
        </Container>
      </ValuesContainer>
    </>
  );
};

export default Values;

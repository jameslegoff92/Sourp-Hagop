"use client";
//Third Party Imports
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";

//Local Imports
import Container from "../layout/Container";

//Local Imports
import Typography from "../display/Typography";

//Data Structure for the Strengths Component
const data = [
  {
    title: "Collaboration d'équipe",
    text: "Construire une équipe engagée et positive.",
  },
  {
    title: "Bien-être des élèves",
    text: "Assurer la réussite et le bien-être des élèves.",
  },
  {
    title: "Intégration culturelle",
    text: "Favoriser la culture scolaire et l'héritage arménien.",
  },
  {
    title: "Attentes comportementales",
    text: "Promouvoir la conduite appropriée et le civisme.",
  },
  {
    title: "Intégration technologique",
    text: "Intégrer la technologie dans l'enseignement.",
  },
  {
    title: "Collaboration parentale",
    text: "Partenariat avec les parents pour la réussite des élèves.",
  },
  {
    title: "Intégration sociale",
    text: "Préparer les élèves à la société québécoise.",
  },
  {
    title: "Sensibilisation environnementale",
    text: "Éduquer à la conservation de l'environnement.",
  },
  {
    title: "Vie scolaire stimulante",
    text: "Contribuer à une vie scolaire enrichissante.",
  },
];

//CSS Style Variants
const stylingMap = {
  0: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force9.jpg') no-repeat",
    backgroundColor: "var(--tertiary-color)",
  },
  1: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force2.jpg') no-repeat",
    backgroundColor: "#006096",
  },
  2: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force7.jpg') no-repeat",
    backgroundColor: "#006096",
  },
  3: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force2.jpg') no-repeat",
    backgroundColor: "#006096",
  },
  4: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force5.jpg') no-repeat",
    backgroundColor: "var(--tertiary-color)",
  },
  5: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force6.jpg') no-repeat",
    backgroundColor: "var(--tertiary-color)",
  },
  6: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force7.jpg') no-repeat",
    backgroundColor: "var(--tertiary-color)",
  },
  7: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force6.jpg') no-repeat",
    backgroundColor: "var(--tertiary-color)",
  },
  8: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/force9.jpg') no-repeat",
    backgroundColor: "var(--tertiary-color)",
  },
};

//CSS in JS for Strengths Section
const StyledDiv = styled.div`
  text-align: center;
  padding: 40px 0 40px;
  position relative;
`;

const StyledDiv2 = styled(StyledDiv)`
  padding: 40px 0 100px;
`;

const GridItemWrapper = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'index'
})`
  background: ${(props) => stylingMap[props.index].background};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem 0;
  height: 100%;
  position: relative;
`;

const GridItem = ({ item, index }) => {
  const parentControls = useAnimation();
  const childControls1 = useAnimation();
  const childControls2 = useAnimation();

  const handleHoverStart = async () => {
    parentControls.start({
      backgroundSize: "120% 120%",
      transition: { duration: 0.5, ease: "easeIn" },
    });
    childControls1.start({
      top: "30px",
      transition: { duration: 0.5, ease: "easeIn" },
    });
    childControls2.start({
      display: "block",
      opacity: 1,
      transition: { duration: 0.7, ease: "easeIn" },
    });
  };

  const handleHoverEnd = async () => {
    parentControls.start({
      backgroundSize: "100% 100%",
      transition: { duration: 0.5, ease: "easeOut" },
    });
    childControls1.start({
      bottom: "5px",
      top: "auto",
      transition: { duration: 0.5, ease: "easeOut" },
    });
    childControls2.start({
      display: "none",
      opacity: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    });
  };

  return (
    <GridItemWrapper
      animate={parentControls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      index={index}
      initial={{ backgroundSize: "100% 100%", position: "relative" }}
    >
      <Typography
        animate={childControls1}
        type="h4"
        color="light"
        fontFamily="primary"
        as="h4"
        style={{ width: "350px" }}
        initial={{
          bottom: "30px",
          top: "auto",
          position: "absolute",
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        {item.title}
      </Typography>
      <Typography
        animate={childControls2}
        initial={{ display: "none", opacity: 0 }}
        type="h5"
        color="light"
        fontFamily="primary"
        style={{ width: "350px", margin: "0 auto" }}
      >
        {item.text}
      </Typography>
    </GridItemWrapper>
  );
};

const StyledGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin: 5rem auto 0;
  width: 100%;

  @media (min-width: 664px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Grid = () => {
  return (
    <StyledGrid>
      {data.map((item, index) => (
        <div key={index} style={{ height: "400px" }}>
          <GridItem  index={index} item={item} />
        </div>
      ))}
    </StyledGrid>
  );
};

const Strengths = () => {
  return (
    <>
      <StyledDiv2>
        <Container>
          <Typography
            style={{ textAlign: "center" }}
            as="h1"
            type="h2"
            color="primary"
          >
            Nos Forces
          </Typography>
          <Grid />
        </Container>
      </StyledDiv2>
    </>
  );
};

export default Strengths;

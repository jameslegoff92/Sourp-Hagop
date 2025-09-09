"use client";
import { useRef } from "react";

//Third Party Imports
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";

//Local Imports
import Container from "../layout/Container";

//Local Imports
import Typography from "../display/Typography";

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
  shouldForwardProp: (prop) => prop !== 'index' && prop !== 'imageUrl'
})`
  background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.8)), url('${(props) => props.imageUrl}');
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem 0;
  height: 100%;
  position: relative;
`;

const GridItemText = styled(Typography)`
  bottom: "30px";
  top: "auto";
  position: "absolute";
  transform: "translateX(-50%)";
  left: "50%";
`;

const GridItem = ({ item, index }) => {
  const parentControls = useAnimation();
  const childControls1 = useAnimation();
  const childControls2 = useAnimation();
  let isOpen = useRef(false);

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

  const handleTap = async (e) => {
    e.preventDefault();
    if (!isOpen.current) {
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
    } else {
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
    }

    isOpen.current = !isOpen.current;
  };

  return (
    <GridItemWrapper
      animate={parentControls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onTap={handleTap}
      index={index}
      imageUrl={item.imageUrl}
      initial={{ backgroundSize: "100% 100%", position: "relative" }}
    >
      <GridItemText
        animate={childControls1}
        type="h4"
        color="light"
        fontFamily="primary"
        as="h4"
        style={{ width: "350px" }}
        initial={{
          bottom: "5px",
          top: "auto",
          position: "absolute",
          transform: "translateX(-50%)",
          left: "50%",
        }}
      >
        {item.title}
      </GridItemText>
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

const Grid = ({ strengths }) => {
  return (
    <StyledGrid>
      {strengths.map((item, index) => (
        <div key={item._id || index} style={{ height: "400px" }}>
          <GridItem index={index} item={item} />
        </div>
      ))}
    </StyledGrid>
  );
};

const Strengths = ({ sectionTitle = "Nos Forces", strengths = [] }) => {
  if (!strengths || strengths.length === 0) {
    return null;
  }

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
            {sectionTitle}
          </Typography>
          <Grid strengths={strengths} />
        </Container>
      </StyledDiv2>
    </>
  );
};

export default Strengths;

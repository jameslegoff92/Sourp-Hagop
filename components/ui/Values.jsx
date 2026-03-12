"use client";
import { useState, useRef, useEffect } from "react";

// Third Party Imports
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

// Local Imports
import Typography from "../display/Typography";
import Container from "../layout/Container";

const ValuesContainer = styled.div`
  background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 50%, #0d2137 100%);
  padding: 5rem 0 6rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at 30% 20%,
      rgba(0, 125, 195, 0.15) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #00a5e0;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #00a5e0;
  }
`;

const SectionTitle = styled(Typography)`
  color: #fff;

`;

const CardContainer = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 550px;
  }
`;

const CardBackground = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== "imageUrl",
})`
  position: absolute;
  inset: 0;
  background: url("${(props) => props.imageUrl}");
  background-size: cover;
  background-position: center;
`;

const CardOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
`;

const CardNumber = styled(motion.span)`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-family: var(--secondary-ff), sans-serif;
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  z-index: 2;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  z-index: 2;
`;

const CardLine = styled(motion.div)`
  height: 3px;
  background: #00a5e0;
  margin-bottom: 1rem;
`;

const CardTitle = styled(motion.h3)`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  margin: 0 0 1rem 0;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const CardText = styled(motion.p)`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  overflow: hidden;
`;

const ValueItem = ({ value, index }) => {

  const [tapped, setTapped] = useState(false);

  const bgControls = useAnimation();
  const overlayControls = useAnimation();
  const numberControls = useAnimation();
  const lineControls = useAnimation();
  const titleControls = useAnimation();
  const textControls = useAnimation();
  const iconControls = useAnimation();

  useEffect(() => {
    if (!tapped) return;
    const handler = () => {
      setTapped(false);
      handleHoverEnd();
    };
    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [tapped]);

  const handleHoverStart = () => {
    bgControls.start({ scale: 1.1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } });
    overlayControls.start({
      background: "linear-gradient(180deg, rgba(0, 60, 100, 0.3) 0%, rgba(0, 40, 80, 0.7) 40%, rgba(0, 20, 40, 0.98) 100%)",
      transition: { duration: 0.4 },
    });
    numberControls.start({
      color: "rgba(0, 165, 224, 0.2)",
      y: -10,
      transition: { duration: 0.4 },
    });
    lineControls.start({ width: 60, transition: { duration: 0.4 } });
    titleControls.start({ y: -8, transition: { duration: 0.4 } });
    textControls.start({ maxHeight: 200, opacity: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } });
    iconControls.start({
      borderColor: "#00a5e0",
      backgroundColor: "rgba(0, 165, 224, 0.2)",
      rotate: 45,
      transition: { duration: 0.3 },
    });
  };

  const handleHoverEnd = () => {
    if (tapped) return;
    bgControls.start({ scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } });
    overlayControls.start({
      background: "linear-gradient(180deg, transparent 0%, transparent 30%, rgba(0, 30, 60, 0.8) 70%, rgba(0, 20, 40, 0.95) 100%)",
      transition: { duration: 0.4 },
    });
    numberControls.start({
      color: "rgba(255, 255, 255, 0.08)",
      y: 0,
      transition: { duration: 0.4 },
    });
    lineControls.start({ width: 40, transition: { duration: 0.4 } });
    titleControls.start({ y: 0, transition: { duration: 0.4 } });
    textControls.start({ maxHeight: 0, opacity: 0, transition: { duration: 0.3 } });
    iconControls.start({
      borderColor: "rgba(255, 255, 255, 0.2)",
      backgroundColor: "transparent",
      rotate: 0,
      transition: { duration: 0.3 },
    });
  };

  return (
    <Card
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onTap={(e) => {
        e.stopPropagation();
        if (!tapped) {
          setTapped(true);
          handleHoverStart();
        }
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <CardBackground
        imageUrl={value.imageUrl}
        animate={bgControls}
        initial={{ scale: 1 }}
      />
      <CardOverlay
        animate={overlayControls}
        initial={{
          background: "linear-gradient(180deg, transparent 0%, transparent 30%, rgba(0, 30, 60, 0.8) 70%, rgba(0, 20, 40, 0.95) 100%)",
        }}
      />
      <CardNumber
        animate={numberControls}
        initial={{ color: "rgba(255, 255, 255, 0.08)", y: 0 }}
      >
        {String(index + 1).padStart(2, "0")}
      </CardNumber>
      <CardContent>
        <CardLine
          animate={lineControls}
          initial={{ width: 40 }}
        />
        <CardTitle
          animate={titleControls}
          initial={{ y: 0 }}
        >
          {value.title}
        </CardTitle>
        <CardText
          animate={textControls}
          initial={{ maxHeight: 0, opacity: 0 }}
        >
          {value.text}
        </CardText>
      </CardContent>
    </Card>
  );
};

const Values = ({ sectionTitle = "Nos Valeurs", values = [] }) => {
  if (!values || values.length === 0) {
    return null;
  }

  return (
    <ValuesContainer>
      <Container>
        <HeaderContainer>
          <Eyebrow>Ce qui nous définit</Eyebrow>
          <SectionTitle as="h2" type="h2">
            {sectionTitle}
          </SectionTitle>
        </HeaderContainer>
        <CardContainer>
          {values.map((value, index) => (
            <ValueItem key={value._id || index} value={value} index={index} />
          ))}
        </CardContainer>
      </Container>
    </ValuesContainer>
  );
};

export default Values;
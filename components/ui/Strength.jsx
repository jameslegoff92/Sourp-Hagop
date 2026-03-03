"use client";
import { useRef } from "react";

// Third Party Imports
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";

// Local Imports
import Container from "../layout/Container";
import Typography from "../display/Typography";

const SectionWrapper = styled.section`
  position: relative;
  padding: 4rem 0 5rem;
  background: linear-gradient(180deg, #fafbfc 0%, #ffffff 100%);
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 5rem 0 6rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 0 8rem;
  }

  /* Subtle decorative element */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 125, 195, 0.2) 50%,
      transparent 100%
    );
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    margin-bottom: 3.5rem;
  }

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
  }
`;

const SectionSubtitle = styled.span`
  display: inline-block;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #007dc3;
  margin-bottom: 0.75rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #007dc3;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const SectionTitle = styled(Typography)`
  margin-top: 1.5rem;
  font-size: 1.75rem;
  line-height: 1.2;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.75rem;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const GridItemContainer = styled.div`
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.4s ease, transform 0.4s ease;

  @media (min-width: 768px) {
    height: 380px;
    border-radius: 16px;
  }

  @media (min-width: 1024px) {
    height: 420px;
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 125, 195, 0.15);
    transform: translateY(-4px);
  }
`;

const GridItemWrapper = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== "index" && prop !== "imageUrl",
})`
  background: linear-gradient(
      to top,
      rgba(0, 50, 80, 0.95) 0%,
      rgba(0, 50, 80, 0.6) 40%,
      rgba(0, 50, 80, 0.2) 70%,
      transparent 100%
    ),
    url("${(props) => props.imageUrl}");
  background-size: cover;
  background-position: center;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled(motion.div)`
  position: absolute;
  top: 10rem;
  left: 0;
  right: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const ItemTitle = styled(motion.h4)`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  text-align: center;
  line-height: 1.4;
  margin: 0;
  padding: 0 0.5rem;
  width: 100%;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    font-size: 1.375rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const ItemDescription = styled(motion.p)`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.6;
  margin: 0;
  padding: 0 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 0.95rem;
    padding: 0 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const Divider = styled(motion.div)`
  width: 40px;
  height: 2px;
  background: #007dc3;
  margin: 1rem 0;
  border-radius: 1px;
  flex-shrink: 0;
`;

const NumberBadge = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--secondary-ff), sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const GridItem = ({ item, index }) => {
  const contentControls = useAnimation();
  const dividerControls = useAnimation();
  const descriptionControls = useAnimation();
  let isOpen = useRef(false);

  const openCard = () => {
    contentControls.start({
      y: -50,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    });
    dividerControls.start({
      opacity: 1,
      width: 50,
      transition: { duration: 0.3, delay: 0.1, ease: "easeOut" },
    });
    descriptionControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    });
  };

  const closeCard = () => {
    descriptionControls.start({
      opacity: 0,
      y: 15,
      transition: { duration: 0.25, ease: "easeIn" },
    });
    dividerControls.start({
      opacity: 0,
      width: 30,
      transition: { duration: 0.2, ease: "easeIn" },
    });
    contentControls.start({
      y: 0,
      transition: { duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
    });
  };

  const handleHoverStart = () => openCard();
  const handleHoverEnd = () => closeCard();

  const handleTap = (e) => {
    e.preventDefault();
    if (!isOpen.current) {
      openCard();
    } else {
      closeCard();
    }
    isOpen.current = !isOpen.current;
  };

  return (
    <GridItemContainer>
      <GridItemWrapper
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onTap={handleTap}
        index={index}
        imageUrl={item.imageUrl}
        whileTap={{ scale: 0.99 }}
      >
        <NumberBadge
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
        >
          {String(index + 1).padStart(2, "0")}
        </NumberBadge>

        <ContentContainer
          animate={contentControls}
          initial={{ y: 0 }}
        >
          <ItemTitle>
            {item.title}
          </ItemTitle>

          <Divider
            animate={dividerControls}
            initial={{ opacity: 0, width: 30 }}
          />

          <ItemDescription
            animate={descriptionControls}
            initial={{ opacity: 0, y: 15 }}
          >
            {item.text}
          </ItemDescription>
        </ContentContainer>
      </GridItemWrapper>
    </GridItemContainer>
  );
};

const Grid = ({ strengths }) => {
  return (
    <StyledGrid>
      {strengths.map((item, index) => (
        <GridItem key={item._id || index} index={index} item={item} />
      ))}
    </StyledGrid>
  );
};

const Strengths = ({
  sectionTitle = "Nos Forces",
  sectionSubtitle = "Ce qui nous distingue",
  strengths = [],
}) => {
  if (!strengths || strengths.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <Container>
        <SectionHeader>
          <SectionSubtitle>{sectionSubtitle}</SectionSubtitle>
          <SectionTitle as="h2" type="h2" color="primary">
            {sectionTitle}
          </SectionTitle>
        </SectionHeader>
        <Grid strengths={strengths} />
      </Container>
    </SectionWrapper>
  );
};

export default Strengths;

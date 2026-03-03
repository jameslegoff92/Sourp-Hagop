"use client";

// Third Party Imports
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

// Local Imports
import Typography from "../display/Typography";
import Container from "../layout/Container";
import { getHomePage } from "../../lib/sanity-queries";

const Section = styled.section`
  text-align: center;
  padding: 4rem 0 5rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 0 6rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 0 7rem;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  width: clamp(15rem, 60vw, 35rem);
  max-width: 90%;
  height: auto;
  opacity: 0.07;
  z-index: -1;
  left: 50%;
  transform: translateX(-37%);
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
`;

const Eyebrow = styled(motion.span)`
  display: inline-block;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #007dc3;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #007dc3;
  }
`;

const TitleWrapper = styled(motion.div)`
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const TextContainer = styled(motion.div)`
  max-width: 800px;
`;

const Accent = styled(motion.div)`
  width: 50px;
  height: 2px;
  background: #007dc3;
  margin-top: 3rem;
`;

function Intro() {
  const [homePageData, setHomePageData] = useState(null);

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        const data = await getHomePage();
        setHomePageData(data);
      } catch (error) {
        // Handle error silently
      }
    }
    fetchHomePageData();
  }, []);

  const title = homePageData?.introSection?.title;
  const content = homePageData?.introSection?.content;

  return (
    <Section>
      <StyledImage src="/images/logo-big.svg" alt="" />

      <Container>
        <ContentWrapper>
          <Eyebrow
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Bienvenue
          </Eyebrow>

          <TitleWrapper
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography as="h1" type="h1" color="primary">
              {title}
            </Typography>
          </TitleWrapper>

          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Typography as="p" type="h5" color="dark">
              {content}
            </Typography>
          </TextContainer>

          <Accent
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </ContentWrapper>
      </Container>
    </Section>
  );
}

export default Intro;
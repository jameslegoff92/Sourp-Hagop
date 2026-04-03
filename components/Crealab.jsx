"use client";

import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import styled from "@emotion/styled";
import Typography from "../components/display/Typography";
import { motion } from "framer-motion";
import BackgroundLogo from "../components/ui/BackgroundLogo";
import ImageGrid from "../components/ui/ImageGrid";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 200px;
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SectionSubtitle = styled(motion.span)`
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
  margin-top: 1.5rem;
`;

export default function Crealab({ data }) {
  return (
    <>
      <Header
        videoSrc={data?.heroVideo?.asset?.url}
        headerText={data?.headerText || "CRÉALAB"}
        headerTextTop="70%"
        videoPosition="center top"
      />
      <StyledDiv>
        <MotionDiv>
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Innovation
            </SectionSubtitle>
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                {data?.introTitle}
              </Typography>
            </TitleWrapper>
          </SectionHeader>

          <TextContainer>
            <Typography
              as="p"
              type="h6"
              color="dark"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {data?.introText}
            </Typography>
          </TextContainer>

          <ImageGrid images={data?.images} layoutKey={data?.imageLayout} />

        </MotionDiv>
      </StyledDiv>
      <Footer />
    </>
  );
}
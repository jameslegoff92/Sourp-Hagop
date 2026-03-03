"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import Accordion from "./ui/AccordionSoutien";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Section = styled.section`
  text-align: center;
  padding: 4rem 2rem 5rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 3rem 6rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 4rem 8rem;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
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

const TextContainer = styled(motion.div)`
  width: 100%;
  margin: 0 auto 2rem;
  text-align: center;
`;

const AccordionWrapper = styled(motion.div)`
  width: 100%;
  margin-top: 2rem;
`;

export default function Soutien({ data }) {
  const headerImageUrl = data?.headerImageUrl;
  const headerText = data?.headerText;
  const mainTitle = data?.mainTitle;
  const introText = data?.introText;
  const accordionItems = Array.isArray(data?.accordionItems) ? data.accordionItems : [];

  // Convert array to object format for the Accordion component
  const contentData = accordionItems.reduce((acc, item) => {
    if (item?.title && item?.content) {
      acc[item.title] = item.content;
    }
    return acc;
  }, {});

  return (
    <>
      <Header
        animate={false}
        imageSrc={headerImageUrl || "../images/header/soutien-header.jpg"}
        headerText={headerText || "SOUTIEN AUX ÉLÈVES"}
        headerTextTop="70%"
      />

      <Section>
        <ContentContainer>
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Accompagnement
            </SectionSubtitle>
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                {mainTitle || "Nos Services"}
              </Typography>
            </TitleWrapper>
          </SectionHeader>

          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Typography as="p" type="h6" color="dark">
              {introText || ""}
            </Typography>
          </TextContainer>

          <AccordionWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Accordion data={contentData} />
          </AccordionWrapper>
        </ContentContainer>
      </Section>

      <Footer />
    </>
  );
}
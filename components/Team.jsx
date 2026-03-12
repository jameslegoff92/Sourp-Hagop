"use client";

import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import Typography from "../components/display/Typography";
import Container from "../components/layout/Container";
import Accordion from "../components/ui/Accordion";
import CustomButton from "../components/inputs/Button";
import Link from "next/link";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

const Section = styled.section`
  padding: 4rem 0 5rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 0 6rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 0 8rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const IntroText = styled(motion.div)`
  text-align: center;
  max-width: 1000px;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const AccordionWrapper = styled(motion.div)`
  width: 100%;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    margin-bottom: 5rem;
  }
`;

const MessageSection = styled(motion.div)`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto 2rem;
`;

const JoinUsSection = styled(motion.div)`
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Divider = styled(motion.div)`
  width: 50px;
  height: 2px;
  background: #007dc3;
  margin: 2.5rem auto;
`;

const ButtonWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export default function Team({ teamData }) {
  return (
    <>
      <Header
        animate={false}
        imageSrc={
          teamData.headerImage?.asset?.url ||
          "../images/header/equipe-header.jpg"
        }
        headerText={teamData.headerText || "NOTRE ÉQUIPE"}
        headerTextTop="70%"
      />

      <Section>
        <Container>
          <ContentWrapper>
            <Eyebrow
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Notre équipe
            </Eyebrow>

            <IntroText
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="p" type="h6" color="dark">
                {teamData.introText}
              </Typography>
            </IntroText>

            {teamData.categories && (
              <AccordionWrapper
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Accordion categories={teamData.categories} />
              </AccordionWrapper>
            )}

            <Divider
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            <MessageSection
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typography as="div" type="h5" color="secondaryDark">
                <PortableText value={teamData.messageText} />
              </Typography>
            </MessageSection>

            <JoinUsSection
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography as="div" type="h4" color="secondaryDark">
                <PortableText value={teamData.joinUsText} />
              </Typography>
            </JoinUsSection>

            <ButtonWrapper
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/carrieres">
                <CustomButton>Découvrez nos offres</CustomButton>
              </Link>
            </ButtonWrapper>
          </ContentWrapper>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
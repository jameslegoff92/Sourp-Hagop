"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import CustomButton from "./inputs/Button";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 4rem 0 8rem;
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const TextBlockContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: var(--spacing-4);
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }
`;

const TextBlockStyled = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 50px;
  background-color: var(--secondary-color);
  flex: 1;
  text-align: center;
  position: relative;
  border-radius: 12px; /* Slight rounding to soften the edges */

  @media (max-width: 992px) {
    width: 90%;
    padding: 40px 30px;
  }

  @media (max-width: 576px) {
    width: 95%;
    padding: 30px 20px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* This ensures the button is pushed to the bottom */
`;

const TitleWrapper = styled.div`
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    min-height: 70px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(CustomButton)`
  width: 250px;
  white-space: nowrap;

  @media (max-width: 576px) {
    width: 200px;
  }
`;

const ButtonLink = styled.a`
  text-decoration: none;
  display: block;
  width: 100%;
  color: inherit;
`;

const TextBlock = ({ title, subtitle, text, buttonText, link }) => (
  <TextBlockStyled
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <TextContent>
      <Typography as="h6" type="h6" color="dark">{subtitle}</Typography>
      <TitleWrapper>
        <Typography as="h3" type="h3" color="primary" style={{ fontWeight: "600" }}>{title}</Typography>
      </TitleWrapper>
      <Typography as="p" type="h6" color="dark" style={{ lineHeight: 1.6 }}>{text}</Typography>
    </TextContent>

    <ButtonWrapper>
      <StyledButton>
        <ButtonLink href={link} target="_blank" rel="noopener noreferrer">
          {buttonText || "Commencer"}
        </ButtonLink>
      </StyledButton>
    </ButtonWrapper>
  </TextBlockStyled>
);

export default function Admissions({ data }) {
  const blocks = [data?.prescolairePrimaire, data?.secondaire].filter(Boolean);

  return (
    <>
      <Header 
        animate={false} 
        imageSrc={data?.headerImageUrl} 
        headerText={data?.headerText || "ADMISSIONS"} 
        headerTextTop="70%" 
      />

      <StyledDiv>
        <SectionHeader>
          <SectionSubtitle
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Inscriptions
          </SectionSubtitle>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Typography as="h1" type="h1" color="primary" style={{ marginTop: "1.5rem" }}>
              Processus d'admission
            </Typography>
          </motion.div>
        </SectionHeader>

        <TextBlockContainer>
          {blocks.map((item, index) => (
            <div key={index} style={{ display: "contents" }}>
              <TextBlock 
                title={item.title} 
                subtitle={item.subtitle} 
                text={item.text}
                buttonText={item.buttonText}
                link={item.link}
              />
            </div>
          ))}
        </TextBlockContainer>
      </StyledDiv>
      <Footer />
    </>
  );
}
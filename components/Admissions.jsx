"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import CustomButton from "./inputs/Button";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const TextBlockContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: var(--spacing-4);
  margin: 50px auto;
  width: 80%;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const TextBlockStyled = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 50px;
  background-color: var(--secondary-color);
  flex: 1;
  text-align: center;
  width: 400px;
  min-height: 400px;
  position: relative;

  @media (max-width: 992px) {
    width: 80%;
    padding: 40px 30px;
    min-height: auto;
  }

  @media (max-width: 576px) {
    width: 90%;
    padding: 30px 20px;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const VerticalLine = styled.div`
  width: 3px;
  background-color: black;
  height: 80%;
  align-self: center;

  @media (max-width: 992px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  padding-top: 30px;
  display: flex;
  justify-content: center;

  @media (max-width: 576px) {
    margin-top: 30px;
  }
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
`;

const TextBlock = ({ title, subtitle, text, buttonText, link }) => (
  <TextBlockStyled
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeIn" }}
  >
    <TextContent>
      <Typography as="h6" type="h6" color="dark">{subtitle}</Typography>
      <TitleWrapper>
        <Typography as="h3" type="h3" color="primary" style={{ fontWeight: "400" }}>{title}</Typography>
      </TitleWrapper>
      <Typography as="p" type="h6" color="dark">{text}</Typography>
    </TextContent>

    <ButtonWrapper>
      <StyledButton
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
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
        headerText={data?.headerText} 
        headerTextTop="70%" 
      />

      <StyledDiv>
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
              {index < blocks.length - 1 && <VerticalLine />}
            </div>
          ))}
        </TextBlockContainer>
      </StyledDiv>
      <Footer />
    </>
  );
}
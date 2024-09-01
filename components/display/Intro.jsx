"use client";

//Third Party Imports
import { motion } from "framer-motion";
import styled from "@emotion/styled";

//Local Imports
import Typography from "../display/Typography";

//CSS For Section1
const Section1 = styled.section`
  text-align: center;
  padding: 2.5rem 0 2.5rem;
  position relative;
  
  @media (min-width: 650px) {
    height: 37.5rem;
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

const ContentWrapper = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  padding-top: var(--spacing-2);
  margin: 0 auto 0;
  width: 90%;
  max-width: 1000px;

  @media (min-width: 1024px) {
    padding-top: var(--spacing-8);
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

function Intro() {
  return (
    <>
      <Section1>
        <StyledImage
          src="/images/logo-big.svg"
          alt="transparent logo image"
        />
        <ContentWrapper>
          <Typography
            as="h1"
            type="h1"
            color="primary"
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              amount: "all",
              margin: "0px 0px -100px 0px",
              once: true,
            }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          >
            Pourquoi choisir Sourp Hagop ?
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h5"
              color="dark"
              initial={{ opacity: 0, y: 400 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              pulvinar, mauris vitae bibendum dictum, tellus velit fermentum
              dolor, rutrum porta est velit varius ligula. Vestibulum at finibus
              diam. Fusce commodo risus nulla, eleifend mattis mi pharetra a.
              Fusce vitae elit id ipsum mattis vulputate. Aliquam quis dolor
              ligula. Nulla facilisi. In hac habitasse platea dictumst. Cras sed
              tellus est.
            </Typography>
          </TextContainer>
        </ContentWrapper>
      </Section1>
    </>
  );
}

export default Intro;
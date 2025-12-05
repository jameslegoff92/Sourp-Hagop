"use client";

//Third Party Imports
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

//Local Imports
import Typography from "../display/Typography";
import { getHomePage } from "../../lib/sanity-queries";
import { urlFor } from "../../lib/sanity";

//CSS For Section1
const Section1 = styled.section`
  text-align: center;
  padding: 2.5rem 0 2.5rem;
  position: relative;
  
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
  const [homePageData, setHomePageData] = useState(null);

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        const data = await getHomePage();
        setHomePageData(data);
      } catch (error) {
        //console.error('Error fetching home page data:', error);
      }
    }

    fetchHomePageData();
  }, []);

  // Fallback content if Sanity data isn't available
  const title = homePageData?.introSection?.title;
  const content = homePageData?.introSection?.content;

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
            {title}
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h5"
              color="dark"
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              {content}
            </Typography>
          </TextContainer>
        </ContentWrapper>
      </Section1>
    </>
  );
}

export default Intro;
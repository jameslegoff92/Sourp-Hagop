"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import Accordion from "./ui/AccordionSoutien";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
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

      <StyledDiv>
        <MotionDiv>
          <Typography
            as="h1"
            type="h1"
            color="primary"
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {mainTitle || "Nos Services"}
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h6"
              color="dark"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {introText || ""}
            </Typography>
          </TextContainer>
          <Accordion data={contentData} />
        </MotionDiv>
      </StyledDiv>
      <Footer />
    </>
  );
}
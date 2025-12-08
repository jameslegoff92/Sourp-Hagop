"use client"

import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import Typography from "../components/display/Typography";
import Accordion from "../components/ui/Accordion";
import CustomButton from "../components/inputs/Button";
import Link from "next/link";
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

      <StyledDiv>
        <MotionDiv>
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
              {teamData.introText}
            </Typography>
          </TextContainer>

          {teamData.categories && (
            <Accordion categories={teamData.categories} />
          )}

          <TextContainer>
            <Typography
              as="p"
              type="h4"
              color="seondaryDark"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              Venez faire une différence avec nous dès maintenant
            </Typography>
          </TextContainer>
        </MotionDiv>

        <Link href="/carrieres">
          <CustomButton
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            style={{ marginTop: "50px" }}
          >
            Postuler maintenant
          </CustomButton>
        </Link>
      </StyledDiv>

      <Footer />
    </>
  );
}
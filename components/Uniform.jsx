"use client";

import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer"
import BackgroundLogo from "../components/ui/BackgroundLogo"
import Typography from "../components/display/Typography"
import styled from "@emotion/styled"
import { motion } from "framer-motion"

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
`

const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ContactInfo = styled.div`
  text-align: left;
`

const Logo = styled.img`
  width: clamp(10rem, 4vw, 10rem);
  height: auto;
  object-fit: contain;
  margin-left: 10px;
`

export default function Uniforme({ data }) {

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImage?.asset?.url}
        headerText={data?.headerText || "UNIFORME SCOLAIRE"}
        headerTextTop="70%"
      />

      <StyledDiv>
        <MotionDiv>
          <Typography as="h1" type="h1" color="primary">
            {data?.title || "Service Uniforme"}
          </Typography>
          <TextContainer>
            <Typography as="p" type="h6" color="dark">
              {data?.introText}
            </Typography>
          </TextContainer>
        </MotionDiv>

        {data?.partner && (
          <ContactContainer>
            {data.partner.logoUrl && (
              <Logo src={data.partner.logoUrl} alt={`${data.partner.name} Logo`} />
            )}
            <ContactInfo>
              <Typography as="h5" type="h5" style={{ color: "#007DC3", fontWeight: "bold" }}>
                {data.partner.name}
              </Typography>
              {data.partner.website && (
                <Typography as="p" type="label" color="dark">
                  <a href={`https://${data.partner.website}`} target="_blank" rel="noopener noreferrer">
                    {data.partner.website}
                  </a>
                </Typography>
              )}
              {data.partner.phone && (
                <Typography as="p" type="label" color="dark">
                  {data.partner.phone}
                </Typography>
              )}
              {data.partner.email && (
                <Typography as="p" type="label" color="dark">
                  <a href={`mailto:${data.partner.email}`}>{data.partner.email}</a>
                </Typography>
              )}
            </ContactInfo>
          </ContactContainer>
        )}
      </StyledDiv>
      {/* <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }} /> */}
      <Footer />
    </>
  )
}

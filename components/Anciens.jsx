// components/Anciens.jsx
"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import styled from "@emotion/styled";
import Typography from "./display/Typography";
import { motion } from "framer-motion";
import BackgroundLogo from "./ui/BackgroundLogo";

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

const ImageGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8%;
  margin: 50px auto 0 auto;
  width: 70%;
  aspect-ratio: 3 / 2;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
  width: 70%;
  margin: 0 auto;
  position: absolute;
  bottom: 50px;
`;

const SocialLink = styled.a`
  margin: 0 5%;
  display: flex;
`;

const SocialIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 50%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CallToActionContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const StyledLink = styled.a`
  color: #006096;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Anciens({ data }) {
  const headerImageUrl = data?.headerImageUrl;
  const headerText = data?.headerText;
  const mainTitle = data?.mainTitle;
  const mainContent = data?.mainContent;
  const missionTitle = data?.missionTitle;
  const missionContent = data?.missionContent;
  const galleryImages = Array.isArray(data?.galleryImages) ? data.galleryImages : [];
  const callToActionTitle = data?.callToActionTitle;
  const callToActionTextPart1 = data?.callToActionTextPart1;
  const formLinkText = data?.formLinkText;
  const formLink = data?.formLink;
  const callToActionTextPart2 = data?.callToActionTextPart2;
  const socialMedia = data?.socialMedia;
  const backgroundLogoUrl = data?.backgroundLogoUrl;

  const gridAreas = [
    "1 / 1 / 2 / 2",
    "1 / 2 / 3 / 3",
    "1 / 3 / 2 / 4",
    "2 / 1 / 3 / 2",
    "2 / 3 / 3 / 4",
  ];

  const randomDelays = [0.1, 0.2, 0.3, 0.4, 0.5].sort(() => 0.5 - Math.random());

  return (
    <>
      <Header
        imageSrc={headerImageUrl || "../images/header/anciens-header.jpg"}
        headerText={headerText || "ANCIENS ET ANCIENNES"}
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
            {mainTitle || "Que signifie être un ancien de Sourp Hagop ?"}
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
              {mainContent || ""}
            </Typography>
          </TextContainer>
          <Typography
            as="p"
            type="h4"
            color="primary"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {missionTitle || "La mission des anciens élèves de Sourp Hagop"}
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="subtitle"
              color="dark"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {missionContent || ""}
            </Typography>
          </TextContainer>
          <ImageGrid>
            {galleryImages.slice(0, 5).map((image, index) => (
              image?.url ? (
                <StyledImage
                  key={index}
                  src={image.url}
                  alt={`collage image ${index + 1}`}
                  style={{ gridArea: gridAreas[index] }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: randomDelays[index], ease: "easeInOut" }}
                  viewport={{ once: true, amount: 0.1 }}
                />
              ) : null
            ))}
          </ImageGrid>
          <Typography
            as="p"
            type="h4"
            color="primary"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {callToActionTitle || ""}
          </Typography>
          <CallToActionContainer>
            <Typography
              as="span"
              type="subtitle"
              color="dark"
            >
              {callToActionTextPart1 || ""}{" "}
            </Typography>
            <StyledLink
              href={formLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formLinkText || "FORMULAIRE"}
            </StyledLink>
            <Typography
              as="span"
              type="subtitle"
              color="dark"
            >
              {" "}{callToActionTextPart2 || ""}
            </Typography>
          </CallToActionContainer>
          <SocialMediaContainer>
            {socialMedia?.facebook && (
              <SocialLink
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon src="../images/anciens/ancien-facebook.svg" alt="Facebook" />
              </SocialLink>
            )}
            {socialMedia?.instagram && (
              <SocialLink
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon src="../images/anciens/ancien-instagram.svg" alt="Instagram" />
              </SocialLink>
            )}
            {socialMedia?.linkedin && (
              <SocialLink
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon src="../images/anciens/ancien-linkedIn.svg" alt="LinkedIn" />
              </SocialLink>
            )}
          </SocialMediaContainer>
        </MotionDiv>
      </StyledDiv>
      <BackgroundLogo src={backgroundLogoUrl || "../images/anciens/anciens-logo.jpg"} />
      <Footer />
    </>
  );
}
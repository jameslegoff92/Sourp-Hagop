"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import styled from "@emotion/styled";
import Typography from "./display/Typography";
import { motion } from "framer-motion";
import BackgroundLogo from "./ui/BackgroundLogo";

const Section = styled.section`
  text-align: center;
  padding: 4rem 2rem 12rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 3rem 14rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 4rem 16rem;
  }
`;

const SectionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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

const TitleWrapper = styled(motion.div)`
  margin-top: 1.5rem;
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  margin: 0 auto 3rem;
  text-align: center;
`;

const SubsectionTitle = styled(motion.div)`
  margin: 4rem 0 1.5rem;

  @media (min-width: 768px) {
    margin: 5rem 0 2rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 3rem auto;
  width: 100%;
  aspect-ratio: 3 / 2;

  @media (min-width: 768px) {
    gap: 2rem;
    margin: 4rem auto;
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 96, 150, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 96, 150, 0.15);
  }
`;

const CallToActionContainer = styled(motion.div)`
  text-align: center;
  margin: 2rem 0 3rem;
`;

const StyledLink = styled.a`
  color: #006096;
  font-weight: 600;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #006096;
    transition: transform 0.3s ease;
    transform-origin: right;
  }

  &:hover::after {
    transform: scaleX(0);
    transform-origin: left;
  }
`;

const SocialMediaContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    gap: 3rem;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(0, 96, 150, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 96, 150, 0.15);
    border-color: rgba(0, 96, 150, 0.2);
  }
`;

const SocialIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const Divider = styled(motion.div)`
  width: 50px;
  height: 2px;
  background: #007dc3;
  margin: 3rem auto;
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

      <Section>
        <SectionContainer>
          {/* Main Section */}
          <SectionHeader>
            <Eyebrow
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Notre communauté
            </Eyebrow>
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                {mainTitle || "Que signifie être un ancien de Sourp Hagop ?"}
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
              {mainContent || ""}
            </Typography>
          </TextContainer>

          {/* Mission Section */}
          <Divider
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          <SubsectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography as="h2" type="h4" color="primary">
              {missionTitle || "La mission des anciens élèves de Sourp Hagop"}
            </Typography>
          </SubsectionTitle>

          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Typography as="p" type="subtitle" color="dark">
              {missionContent || ""}
            </Typography>
          </TextContainer>

          {/* Image Gallery */}
          {galleryImages.length > 0 && (
            <ImageGrid>
              {galleryImages.slice(0, 5).map((image, index) =>
                image?.url ? (
                  <StyledImage
                    key={index}
                    src={image.url}
                    alt={`collage image ${index + 1}`}
                    style={{ gridArea: gridAreas[index] }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: randomDelays[index], ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}
                  />
                ) : null
              )}
            </ImageGrid>
          )}

          {/* Call to Action */}
          {callToActionTitle && (
            <>
              <Divider
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />

              <SubsectionTitle
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography as="h2" type="h4" color="primary">
                  {callToActionTitle}
                </Typography>
              </SubsectionTitle>

              <CallToActionContainer
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Typography as="span" type="subtitle" color="dark">
                  {callToActionTextPart1 || ""}{" "}
                </Typography>
                <StyledLink
                  href={formLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formLinkText || "FORMULAIRE"}
                </StyledLink>
                <Typography as="span" type="subtitle" color="dark">
                  {" "}{callToActionTextPart2 || ""}
                </Typography>
              </CallToActionContainer>
            </>
          )}

          {/* Social Media */}
          {(socialMedia?.facebook || socialMedia?.instagram || socialMedia?.linkedin) && (
            <SocialMediaContainer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
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
          )}
        </SectionContainer>
      </Section>

      <BackgroundLogo src={backgroundLogoUrl || "../images/anciens/anciens-logo.jpg"} />
      <Footer />
    </>
  );
}
"use client";

import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import BackgroundLogo from "../components/ui/BackgroundLogo";
import Typography from "../components/display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

// --- STYLED COMPONENTS ---

const Section = styled.section`
  text-align: center;
  padding: 4rem 2rem 5rem;
  position: relative;

  @media (min-width: 768px) { padding: 5rem 3rem 6rem; }
  @media (min-width: 1024px) { padding: 6rem 4rem 8rem; }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
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

const TitleWrapper = styled(motion.div)`
  margin-top: 1.5rem;
`;

const TextContainer = styled(motion.div)`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactCard = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 125, 195, 0.08);
  max-width: 800px;
  margin: 3rem auto 0;
  gap: 3rem;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 125, 195, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2.5rem 2rem;
    gap: 2rem;
    text-align: center;
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 180px;
  height: auto;
  object-fit: contain;
`;

const Divider = styled.div`
  width: 2px;
  height: 100px;
  background: rgba(0, 125, 195, 0.1);
  
  @media (max-width: 768px) {
    width: 60%;
    height: 2px;
  }
`;

const ContactInfo = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }

  /* Inherit blue for links and add a hover state */
  a {
    color: #007dc3;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      text-decoration: underline;
      color: var(--secondary-darkcolor, #005a8c);
    }
  }
`;

// --- MAIN COMPONENT ---

export default function Uniforme({ data }) {
  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImage?.asset?.url}
        headerText={data?.headerText || "UNIFORME SCOLAIRE"}
        headerTextTop="70%"
      />

      <Section>
        <ContentContainer>
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Code vestimentaire
            </SectionSubtitle>
            
            <TitleWrapper
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Typography as="h1" type="h1" color="primary">
                {data?.title || "Service Uniforme"}
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
              {data?.introText}
            </Typography>
          </TextContainer>

          {data?.partner && (
            <ContactCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {data.partner.logoUrl && (
                <Logo src={data.partner.logoUrl} alt={`${data.partner.name} Logo`} />
              )}
              
              {/* Vertical divider on desktop, horizontal on mobile */}
              <Divider />
              
              <ContactInfo>
                <Typography as="h4" type="h4" style={{ color: "#007DC3", fontWeight: "bold", marginBottom: "0.25rem" }}>
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
            </ContactCard>
          )}
        </ContentContainer>
      </Section>

      <Footer />
    </>
  );
}
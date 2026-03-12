"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 4rem 2rem 5rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 3rem 6rem;
  }

  @media (min-width: 1024px) {
    padding: 6rem 4rem 8rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
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
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const TextContainer = styled(motion.div)`
  text-align: center;
  width: 100%;
  max-width: 1000px;
`;

const Divider = styled(motion.div)`
  width: 50px;
  height: 2px;
  background: #007dc3;
  margin: 3rem auto 4rem;

  @media (min-width: 768px) {
    margin: 4rem auto 5rem;
  }
`;

const MembersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1000px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 4rem;
  }
`;

const MemberCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MemberImage = styled.img`
  width: 180px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 96, 150, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 96, 150, 0.15);
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 250px;
  }
`;

const MemberName = styled.h4`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--black);
  margin: 0 0 0.5rem 0;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MemberTitle = styled.p`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const MemberCardComponent = ({ src, alt, name, title, index }) => (
  <MemberCard
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardVariants}
  >
    <MemberImage src={src} alt={alt || name || ""} />
    <MemberName>{name}</MemberName>
    <MemberTitle>{title}</MemberTitle>
  </MemberCard>
);

export default function Administration({ data }) {
  const headerImageUrl = data?.pageHeader?.headerImageUrl;
  const headerText = data?.pageHeader?.headerText;
  const headerTextTop = data?.pageHeader?.headerTextTop;

  const roleTitle = data?.roleSection?.title;
  const roleContent = data?.roleSection?.content;

  const members = Array.isArray(data?.members) ? data.members : [];

  return (
    <>
      <Header
        animate={false}
        imageSrc={headerImageUrl}
        headerText={headerText || "CONSEIL ADMINISTRATION"}
        headerTextTop={headerTextTop || "72%"}
      />

      <Section>
        <ContentWrapper>
          <Eyebrow
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
{roleTitle || "Rôle et Responsabilités"}          
</Eyebrow>

          <TextContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography as="p" type="h6" color="dark">
              {roleContent}
            </Typography>
          </TextContainer>

          {members.length > 0 && (
            <>
              <Divider
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              <MembersGrid>
                {members.map((m, idx) => (
                  <MemberCardComponent
                    key={`${m?.name || "member"}-${idx}`}
                    src={m?.imageUrl || "../images/staff/_default.jpg"}
                    alt={m?.alt || m?.name || "Membre"}
                    name={m?.name || ""}
                    title={m?.title || ""}
                    index={idx}
                  />
                ))}
              </MembersGrid>
            </>
          )}
        </ContentWrapper>
      </Section>

      <Footer />
    </>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "../components/display/Typography";

const StyledDiv = styled.div`
  text-align: center;
  padding: 60px 0 150px;
  position: relative;
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

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 90%;
  max-width: 1300px;
  margin: 40px auto 0;
`;

const SectionCard = styled(motion.div)`
  display: flex;
  align-items: stretch;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(0, 125, 195, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 125, 195, 0.15);
    box-shadow: 0 12px 30px rgba(0, 125, 195, 0.08);
  }

  &:hover .section-image {
    transform: scale(1.05);
  }

  @media (max-width: 900px) {
    flex-direction: column !important;
  }
`;

const ImageWrapper = styled.div`
  width: 45%;
  min-height: 350px;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 250px;
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  transition: transform 0.5s ease;
`;

const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  flex: 1;
  text-align: left;
  gap: 1.5rem;

  @media (max-width: 900px) {
    padding: 2rem;
  }
`;

const PriceCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #007dc3;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-weight: 700;
  margin-right: 1rem;
  flex-shrink: 0;
  font-size: 0.85rem;
`;

export default function ServiceDeGarde({ data }) {
  const sectionRefs = useRef([]);
  const sections = Array.isArray(data?.sections) ? data.sections : [];
  
  const sectionControls = useRef(
    Array.from({ length: sections.length }, () => useAnimation())
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1 && sectionControls.current[index]) {
              sectionControls.current[index].start({ opacity: 1, y: 0 });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImageUrl}
        headerText={data?.headerText || "SERVICE DE GARDE"}
        headerTextTop="70%"
      />

      <StyledDiv>
        <SectionSubtitle
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Au-delà des cours
        </SectionSubtitle>

        <SectionsContainer>
          {sections.map((section, index) => {
            const isImageLeft = section.imagePosition === "left";

            return (
              <SectionCard
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                initial={{ opacity: 0, y: 40 }}
                animate={sectionControls.current[index]}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ flexDirection: isImageLeft ? "row" : "row-reverse" }}
              >
                {section.imageUrl && (
                  <ImageWrapper>
                    <Image
                      className="section-image"
                      src={section.imageUrl}
                      alt={section.title || ""}
                    />
                  </ImageWrapper>
                )}

                <TextBlock>
                  <Typography as="h2" type="h2" color="primary">
                    {section.title}
                  </Typography>
                  
                  <Typography as="p" type="h6" color="dark">
                    {section.content}
                  </Typography>

                  {/* Pricing logic */}
                  {section.sectionType === "pricing" && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {section.pricingItems?.map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                          <PriceCircle>{item.price} $</PriceCircle>
                          <Typography as="span" type="p" color="dark">{item.description}</Typography>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contact Info logic */}
                  {section.sectionType === "importantInfo" && section.contactInfo && (
                    <div style={{ paddingLeft: "1.25rem", borderLeft: "4px solid #007dc3" }}>
                      <Typography as="p" type="p" color="primary"><strong>Contact</strong></Typography>
                      <Typography as="p" type="p" color="dark">{section.contactInfo.email}</Typography>
                      <Typography as="p" type="p" color="dark">{section.contactInfo.phone}</Typography>
                    </div>
                  )}

                  {/* Process logic */}
                  {(section.sectionType === "studentProcess" || section.sectionType === "parentProcess") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {section.processSteps?.map((step, i) => (
                        <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                          <span style={{ color: "#007dc3", fontWeight: 800, minWidth: "20px" }}>{step.stepNumber}.</span>
                          <Typography as="span" type="p" color="dark">{step.stepContent}</Typography>
                        </div>
                      ))}
                    </div>
                  )}
                </TextBlock>
              </SectionCard>
            );
          })}
        </SectionsContainer>
      </StyledDiv>

      <Footer />
    </>
  );
}
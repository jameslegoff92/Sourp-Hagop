"use client";

import { useEffect, useRef } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 60px 0 150px;
  position: relative;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 90%;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 2.5rem;
    width: 95%;
  }
`;

const SectionCard = styled(motion.div)`
  display: flex;
  align-items: stretch;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(0, 125, 195, 0.08);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 125, 195, 0.15);
  }

  &:hover .section-image {
    transform: scale(1.05);
  }

  &:hover .section-text::before {
    opacity: 1;
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
  position: relative;
  text-align: left;

  &::before {
    content: "";
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    width: 4px;
    background: linear-gradient(180deg, var(--primary-color), var(--tertiary-color));
    border-radius: 4px;
    left: ${(props) => (props.position === "right" ? "0" : "auto")};
    right: ${(props) => (props.position === "left" ? "0" : "auto")};
    opacity: 0;
    transition: opacity 0.4s ease;

    @media (max-width: 900px) {
      left: 0;
      right: auto;
    }
  }

  @media (max-width: 900px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const SectionContent = styled.p`
  font-size: 1.05rem;
  color: #444;
  line-height: 1.8;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.7;
  }
`;

const PageIntro = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto 60px;
  padding: 0 20px;
`;

export default function ComiteParents({ data }) {
  const sectionRefs = useRef([]);
  
  const sectionsCount = data?.sections?.length || 0;
  const sectionControls = useRef(
    Array.from({ length: sectionsCount }, () => useAnimation())
  );

  useEffect(() => {
    if (!data?.sections) return;
    
    const newCount = data.sections.length;
    const currentCount = sectionControls.current.length;
    
    if (newCount !== currentCount) {
      sectionControls.current = Array.from({ length: newCount }, () => useAnimation());
    }
  }, [data?.sections?.length]);

  useEffect(() => {
    if (!data?.sections) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target);
          if (index !== -1 && sectionControls.current[index]) {
            sectionControls.current[index].start({ opacity: 1, y: 0 });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.2 });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [data]);

  const headerImageUrl = data?.headerImageUrl;
  const headerText = data?.headerText;
  const introText = data?.introText;
  const sections = Array.isArray(data?.sections) ? data.sections : [];

  return (
    <>
      <Header
        animate={false}
        imageSrc={headerImageUrl || "../images/header/parent-header.jpg"}
        headerText={headerText || "COMITÉ DE PARENTS"}
        headerTextTop="70%"
      />

      <StyledDiv>
        {introText && (
          <PageIntro
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography as="p" type="h6" color="dark" style={{ textAlign: "center" }}>
              {introText}
            </Typography>
          </PageIntro>
        )}

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
                <TextBlock 
                  className="section-text" 
                  position={isImageLeft ? "right" : "left"}
                >
                  <SectionTitle>{section.title}</SectionTitle>
                  <SectionContent>{section.content}</SectionContent>
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
"use client";

import { useEffect, useRef } from "react";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import BackgroundLogo from "./ui/BackgroundLogo";
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

const StyledDiv = styled.div`
  text-align: left;
  padding: 10px 0 150px;
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  text-align: left;

  @media (max-width: 1110px) {
    text-align: left;
  }
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: var(--spacing-4);
  height: auto;

  @media (max-width: 1110px) {
    flex-direction: column;
    align-items: center;
    text-align: left;
  }
`;

const OrderContainer = styled.div`
  @media (max-width: 1110px) {
    order: 1;
  }
`;

const Image = styled(motion.img)`
  width: 50%;
  height: auto;
  object-fit: cover;

  @media (max-width: 1110px) {
    width: 100%;
    align-items: stretch;
  }
`;

const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 100px;
  background-color: var(--secondary-color);
  align-items: flex-start;
  flex: 1;
  overflow: hidden;

  @media (max-width: 1200px) {
    align-items: left;
    padding: 50px 30px 50px 45px;
  }
    
  @media (max-width: 768px) {
    align-items: left;
    padding: 50px 20px 50px 35px;
  }
`;

export default function ComiteParents({ data }) {
  const sectionRefs = useRef([]);
  
  // Initialize controls based on sections length
  const sectionsCount = data?.sections?.length || 0;
  const sectionControls = useRef(
    Array.from({ length: sectionsCount }, () => useAnimation())
  );

  // Update controls when sections change
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
            sectionControls.current[index].start({ x: 0, opacity: 1 });
          }
        }
      });
    };

    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

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
        {sections.map((section, index) => (
          <MotionDiv key={index}>
            <ContentContainer
              ref={(el) => (sectionRefs.current[index] = el)}
            >
              {section.imagePosition === "left" ? (
                <>
                  {section.imageUrl ? (
                    <Image
                      src={section.imageUrl}
                      alt={section.title || ""}
                    />
                  ) : null}
                  <TextBlock
                    initial={{ x: "100%", opacity: 0 }}
                    animate={sectionControls.current[index]}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Typography as="h3" type="h3" color="primary">
                      {section.title}
                    </Typography>
                    <TextContainer>
                      <Typography as="p" type="h6" color="dark">
                        {section.content}
                      </Typography>
                    </TextContainer>
                  </TextBlock>
                </>
              ) : (
                <>
                  <OrderContainer>
                    <TextBlock
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={sectionControls.current[index]}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <Typography as="h3" type="h3" color="primary">
                        {section.title}
                      </Typography>
                      <TextContainer>
                        <Typography as="p" type="h6" color="dark">
                          {section.content}
                        </Typography>
                      </TextContainer>
                    </TextBlock>
                  </OrderContainer>
                  {section.imageUrl ? (
                    <Image
                      src={section.imageUrl}
                      alt={section.title || ""}
                    />
                  ) : null}
                </>
              )}
            </ContentContainer>
          </MotionDiv>
        ))}
      </StyledDiv>

      <Footer />
    </>
  );
}
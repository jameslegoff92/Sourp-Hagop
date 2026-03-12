"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import BackgroundLogo from "./ui/BackgroundLogo";
import Button from '@mui/material/Button';
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

// --- POPUP STYLES ---
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const PopupContent = styled.div`
  background: white;
  padding: 50px 40px 40px;
  width: 90%;
  max-width: 600px;
  position: relative;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  transition: color 0.2s ease;
  &:hover { color: #333; }
`;

const StyledButton = styled(Button)`
  background-color: ${({ className }) => className.includes("primary") ? "#007dc3" : "transparent"} !important;
  border: 2px solid #007dc3 !important;
  color: ${({ className }) => className.includes("primary") ? "#fff" : "#007dc3"} !important;
  padding: 12px 30px !important;
  border-radius: 50px !important;
  font-size: 1rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  cursor: pointer;
  transition: all 0.3s ease !important;
  display: inline-block;
  flex: 1;

  span {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: ${({ className }) => className.includes("primary") ? "#006096" : "rgba(0, 125, 195, 0.05)"} !important;
    border-color: #006096 !important;
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const CustomButton = ({ children, variant, ...props }) => (
  <StyledButton className={variant} {...props}>
    <span>{children}</span>
  </StyledButton>
);

// --- MAIN PAGE STYLES ---

const StyledDiv = styled.div`
  text-align: center;
  padding: 4rem 0 8rem;
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
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

const PageIntro = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto 4rem;
  padding: 0 20px;
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
    box-shadow: 0 12px 30px rgba(0, 125, 195, 0.08);
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
    background: linear-gradient(180deg, var(--primary-color), var(--tertiary-color, #86c1e1));
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

  @media (max-width: 900px) { padding: 2.5rem 2rem; }
`;

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (max-width: 768px) { font-size: 1.4rem; }
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

const FooterTextContainer = styled(motion.div)`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0 20px;
`;

const FooterLink = styled.a`
  font-family: var(--primary-ff), sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #007dc3;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  padding-bottom: 4px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #007dc3;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }

  &:hover {
    color: #006096;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
    background-color: #006096;
  }
`;

export default function PourquoiSourpHagop({ data }) {
  const [showPopup, setShowPopup] = useState(data?.popupEnabled);

  const handleReserveClick = () => {
    if (data?.popupButtonLink) window.open(data.popupButtonLink, "_blank");
  };

  const sectionsCount = data?.sections?.length || 0;
  const sectionRefs = useRef([]);
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target);
          if (index !== -1 && sectionControls.current[index]) {
            sectionControls.current[index].start({ opacity: 1, y: 0 });
          }
        }
      });
    }, { threshold: 0.2 });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [data]);

  return (
    <>
      {/* POPUP */}
      {showPopup && (
        <PopupOverlay onClick={() => setShowPopup(false)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowPopup(false)}>✕</CloseButton>
            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "1rem" }}>
              {data?.popupTitle}
            </Typography>
            <Typography as="p" type="h6" color="dark">
              {data?.popupText}<br /><br/>
              <span style={{ fontWeight: "700", color: "#007dc3" }}>
                {data?.popupDateStart}
              </span>{" "}
              {data?.popupDateEnd && "au"}{" "}
              <span style={{ fontWeight: "700", color: "#007dc3" }}>
                {data?.popupDateEnd}
              </span>
            </Typography>
            <ButtonContainer>
              <CustomButton variant="secondary" onClick={() => setShowPopup(false)}>
                Non, merci
              </CustomButton>
              <CustomButton variant="primary" onClick={handleReserveClick}>
                Réserver
              </CustomButton>
            </ButtonContainer>
          </PopupContent>
        </PopupOverlay>
      )}

      <div className={showPopup ? "disable-interaction" : ""}>
        <Header
          animate={false}
          imageSrc={data?.headerImageUrl}
          headerText={data?.headerText || "POURQUOI SOURP HAGOP"}
          headerTextTop="70%"
        />

        <StyledDiv>
          {/* INTRO HEADER */}
          <SectionHeader>
            <SectionSubtitle
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              L'expérience Sourp Hagop
            </SectionSubtitle>
          </SectionHeader>

          {data?.introText && (
            <PageIntro
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography as="p" type="h6" color="dark">
                {data.introText}
              </Typography>
            </PageIntro>
          )}

          {/* DYNAMIC SECTIONS */}
          <SectionsContainer>
            {data?.sections?.map((section, index) => {
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
                    <SectionContent>{section.description}</SectionContent>
                  </TextBlock>
                </SectionCard>
              );
            })}
          </SectionsContainer>

          {/* CLEAN FOOTER TEXT */}
          {(data?.footerText || data?.footerLink) && (
            <FooterTextContainer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography as="p" type="h5" color="dark" style={{ fontWeight: 400, maxWidth: "1150px", lineHeight: 1.6 }}>
                {data.footerText}{" "}
                {data.footerDateStart && (
                  <span style={{ fontWeight: "700", color: "#007dc3" }}>{data.footerDateStart}</span>
                )}
                {" "}
                {data.footerDateEnd && "au"}{" "}
                {data.footerDateEnd && (
                  <span style={{ fontWeight: "700", color: "#007dc3" }}>{data.footerDateEnd}</span>
                )}
              </Typography>

              {data.footerLink && (
                <FooterLink href={data.footerLink} target="_blank" rel="noopener noreferrer">
                  {data.footerLinkText || "En savoir plus"}
                </FooterLink>
              )}
            </FooterTextContainer>
          )}

        </StyledDiv>

        {/* <BackgroundLogo src="../images/logo-big.svg" /> */}
        <Footer />
      </div>
    </>
  );
}
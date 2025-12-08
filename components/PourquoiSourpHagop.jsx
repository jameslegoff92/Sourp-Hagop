"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import BackgroundLogo from "./ui/BackgroundLogo";
import Button from '@mui/material/Button';
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

const StyledDiv = styled.div`
  text-align: left;
  padding: 10px 0 150px;
  position: relative;
`;

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
`;

const PopupContent = styled.div`
  background: white;
  padding: 50px 30px 30px;
  width: 80%;
  max-width: 700px;
  position: relative;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

const StyledButton = styled(Button)`
  background-color: ${({ className }) => className === "primary" ? "#006096" : "transparent"} !important;
  border: 2px solid #006096;
  color: ${({ className }) => className === "primary" ? "#fff" : "#006096"};
  padding: 15px 25px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  flex: 1;
  width: auto;

  span {
    display: inline-block;
    transition: transform 0.3s ease;
    transform-origin: center;
    will-change: transform;
  }

  &:hover span {
    transform: scale(1.08);
  }

  @media (max-width: 576px) {
    font-size: 16px;
    padding: 10px 20px;
  }

  @media (max-width: 320px) {
    font-size: 14px;
    padding: 8px 15px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 20px 10px ;
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
  margin: 20px 0;

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
  width: 40%;
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
    
  @media (max-width: 768px) {
    align-items: left;
    padding: 50px 20px 50px 35px;
  }
`;

const CustomButton = ({ children, variant, ...props }) => (
    <StyledButton className={variant} {...props}>
        <span>{children}</span>
    </StyledButton>
);

export default function PourquoiSourpHagop({ data }) {

    const [showPopup, setShowPopup] = useState(data.popupEnabled);

    const handleReserveClick = () => {
        if (data.popupButtonLink)
            window.open(data.popupButtonLink, "_blank");
    };

    // 5 animation controllers + refs (works with your existing logic)
    const controls = [
        useAnimation(), useAnimation(),
        useAnimation(), useAnimation(),
        useAnimation()
    ];

    const refs = [
        useRef(null), useRef(null),
        useRef(null), useRef(null),
        useRef(null)
    ];

    // Intersection observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = refs.findIndex(r => r.current === entry.target);
                    if (index !== -1) controls[index].start({ x: 0, opacity: 1 });
                }
            });
        }, { threshold: 0.4 });

        refs.forEach(ref => ref.current && observer.observe(ref.current));

        return () => refs.forEach(ref => ref.current && observer.unobserve(ref.current));
    }, []);

    return (
        <>
            {/* POPUP */}
            {showPopup && (
                <PopupOverlay onClick={() => setShowPopup(false)}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setShowPopup(false)}>✕</CloseButton>

                        <Typography as="h3" type="h3" color="primary">
                            {data.popupTitle}
                        </Typography>

                        <Typography as="p" type="h6" color="dark" style={{ paddingTop: "10px" }}>
                            {data.popupText}<br />
                            <span style={{ fontWeight: "700", color: "var(--primary-color)" }}>
                                {data.popupDateStart}
                            </span>{" "}
                            au{" "}
                            <span style={{ fontWeight: "700", color: "var(--primary-color)" }}>
                                {data.popupDateEnd}
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
                {/* HEADER */}
                <Header
                    animate={false}
                    imageSrc={data.headerImageUrl}
                    headerText={data.headerText}
                    headerTextTop="70%"
                />

                <StyledDiv>

                    {/* INTRO */}
                    <MotionDiv>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            style={{ textAlign: "center", paddingBottom: "10px" }}
                        >
                            {data.introText}
                        </Typography>
                    </MotionDiv>

                    {/* SECTIONS FROM SANITY */}
                    {data.sections?.map((section, i) => (
                        <MotionDiv key={i}>
                            <ContentContainer ref={refs[i]}>

                                {section.imagePosition === "left" && (
                                    <Image
                                        src={section.imageUrl}
                                        alt={section.title}
                                        initial={{ x: -40, opacity: 0 }}
                                        animate={controls[i]}
                                    />
                                )}

                                <TextBlock
                                    initial={{ x: section.imagePosition === "left" ? 40 : -40, opacity: 0 }}
                                    animate={controls[i]}
                                >
                                    <Typography as="h3" type="h3" color="primary">
                                        {section.title}
                                    </Typography>

                                    <TextContainer>
                                        <Typography as="p" type="h6" color="dark">
                                            {section.description}
                                        </Typography>
                                    </TextContainer>
                                </TextBlock>

                                {section.imagePosition === "right" && (
                                    <Image
                                        src={section.imageUrl}
                                        alt={section.title}
                                        initial={{ x: 40, opacity: 0 }}
                                        animate={controls[i]}
                                    />
                                )}

                            </ContentContainer>
                        </MotionDiv>
                    ))}

                    {/* FOOTER TEXT */}
                    <MotionDiv>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            style={{ paddingTop: "10px", textAlign: "center", fontWeight: 400 }}
                        >
                            {data.footerText}
                            {" "}
                            <span style={{ fontWeight: "700", color: "var(--primary-color)" }}>
                                {data.footerDateStart}
                            </span>{" "}
                            au{" "}
                            <span style={{ fontWeight: "700", color: "var(--primary-color)" }}>
                                {data.footerDateEnd}
                            </span>
                        </Typography>

                        <Typography
                            as="p"
                            type="label"
                            color="dark"
                            style={{ textAlign: "center" }}
                        >
                            <a
                                href={data.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontWeight: "700", color: "var(--primary-color)" }}
                            >
                                {data.footerLinkText}
                            </a>
                        </Typography>
                    </MotionDiv>

                </StyledDiv>

                <BackgroundLogo src="../images/logo-big.svg" />
                <Footer />
            </div>
        </>
    );
}

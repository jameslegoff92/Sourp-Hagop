"use client"

import Header from "./ui/Header"
import Footer from "./ui/Footer"
import Typography from "./display/Typography"
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

const VisionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  margin: 80px auto 0;
  width: 90%;
  max-width: 1300px;

  @media (max-width: 768px) {
    width: 95%;
  }
`

const VisionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const VisionCard = styled(motion.div)`
  position: relative;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 220px;
  }

  &:hover .card-image {
    transform: scale(1.1);
  }

  &:hover .card-overlay {
    opacity: 1;
  }

  &:hover .card-label {
    opacity: 0;
    transform: translateY(10px);
  }

  &:hover .card-content {
    transform: translateY(0);
    opacity: 1;
  }
`

const CardImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 82, 147, 0.9) 0%,
    rgba(0, 82, 147, 0.4) 50%,
    rgba(0, 82, 147, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
`

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 2;
`

const CardText = styled.p`
  color: white;
  font-size: 1rem;
  line-height: 1.6;
  text-align: left;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const CardLabel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: white;
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  z-index: 2;
`

/* Nos Engagements Styles */
const EngagementsContainer = styled.div`
  margin: 80px auto 0;
  width: 90%;
  max-width: 1300px;
`

const EngagementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 50px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const EngagementCard = styled(motion.div)`
  position: relative;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(0, 125, 195, 0.1);
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), #00a8e8);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(0, 125, 195, 0.3);
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover .engagement-icon {
    transform: scale(1.15) rotate(5deg);
  }

  &:hover .engagement-title {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    min-height: 240px;
    padding: 1.5rem 1rem;
  }
`

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: var(--secondary-color);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;
    border-radius: 16px;
  }
`

const IconMask = styled.div`
  width: ${(props) => props.size || "45px"};
  height: ${(props) => props.size || "45px"};
  background-color: ${(props) => props.color || "var(--primary-color)"};
  -webkit-mask-image: url(${(props) => props.src});
  mask-image: url(${(props) => props.src});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`

const EngagementTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const EngagementText = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const EngagementItem = ({ src, title, text, size, index }) => (
    <EngagementCard
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        <IconWrapper className="engagement-icon">
            <IconMask src={src} size={size} color="var(--primary-color)" />
        </IconWrapper>
        {title && (
            <EngagementTitle className="engagement-title">{title}</EngagementTitle>
        )}
        <EngagementText>{text}</EngagementText>
    </EngagementCard>
)

/* Orientations Générales Styles */
const OrientationsContainer = styled.div`
  margin: 100px auto 0;
  width: 90%;
  max-width: 1200px;
`

const OrientationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 50px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const OrientationCard = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  border: 1px solid rgba(0, 125, 195, 0.08);
  overflow: hidden;
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-color), #00a8e8);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 125, 195, 0.15);
  }

  &:hover::before {
    transform: scaleY(1);
  }

  &:hover .orientation-number {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
    gap: 1rem;
  }
`

const OrientationNumber = styled.div`
  min-width: 60px;
  height: 60px;
  background: var(--secondary-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    min-width: 45px;
    height: 45px;
    font-size: 1.1rem;
    border-radius: 12px;
  }
`

const OrientationContent = styled.div`
  flex: 1;
`

const OrientationText = styled.p`
  font-size: 1.05rem;
  color: #444;
  line-height: 1.8;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.7;
  }
`

/* Slogan Styles */
const SloganSection = styled(motion.div)`
  margin: 120px 0 0;
  width: 100%;
  position: relative;
  padding: 100px 20px;
  background: linear-gradient(90deg, #001f3f 0%, var(--primary-color) 50%, #003d5c 100%);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
    margin: 80px 0 0;
  }
`

const SloganBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/images/logo-big.svg");
  background-repeat: no-repeat;
  background-position: 55% center;
  background-size: contain;
  opacity: 0.08;
  pointer-events: none;
  padding: 30px 0;
  background-origin: content-box;
`

const SloganContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`

const SloganTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`

const SloganLabel = styled(motion.span)`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    letter-spacing: 3px;
  }
`

const SloganLine = styled(motion.div)`
  font-size: 3.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.2;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`

export default function ProjetEducatif({ data }) {
    const headerImageUrl = data?.pageHeader?.headerImageUrl
    const headerText = data?.pageHeader?.headerText

    const missionTitle = data?.missionSection?.title
    const missionText = data?.missionSection?.text

    const visionTitle = data?.visionSection?.title
    const visionIntroText = data?.visionSection?.introText
    const visionItems = Array.isArray(data?.visionSection?.items) ? data.visionSection.items : []

    const engagementsTitle = data?.engagementsSection?.title
    const engagementItems = Array.isArray(data?.engagementsSection?.items) ? data.engagementsSection.items : []

    const orientationsTitle = data?.orientationsSection?.title
    const orientationsIntroText = data?.orientationsSection?.introText
    const orientationItems = Array.isArray(data?.orientationsSection?.items) ? data.orientationsSection.items : []

    const sloganLabel = data?.sloganSection?.label
    const sloganLine1 = data?.sloganSection?.line1
    const sloganLine2 = data?.sloganSection?.line2

    return (
        <>
            <Header
                animate={false}
                imageSrc={headerImageUrl || "../images/header/projet-educatif-header.jpg"}
                headerText={headerText || "PROJET ÉDUCATIF"}
                headerTextTop={"70%"}
            />

            <StyledDiv>
                {/* Section Notre Mission */}
                <MotionDiv>
                    <Typography
                        as="h1"
                        type="h1"
                        color="primary"
                        initial={{ opacity: 0, y: -25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
                        transition={{ duration: 0.9, ease: "easeIn" }}
                    >
                        {missionTitle || "Notre Mission"}
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
                            {missionText || ""}
                        </Typography>
                    </TextContainer>
                </MotionDiv>

                {/* Section Notre Vision */}
                {visionItems.length > 0 && (
                    <VisionContainer>
                        <Typography
                            as="h1"
                            type="h1"
                            color="primary"
                            initial={{ opacity: 0, y: -25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: "all", margin: "0px 0px -100px 0px", once: true }}
                            transition={{ duration: 0.9, ease: "easeIn" }}
                            style={{ textAlign: "center" }}
                        >
                            {visionTitle || "Notre vision"}
                        </Typography>

                        {visionIntroText && (
                            <Typography
                                as="p"
                                type="h6"
                                color="dark"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                style={{ marginTop: "30px", textAlign: "center" }}
                            >
                                {visionIntroText}
                            </Typography>
                        )}

                        <VisionGrid>
                            {visionItems.map((item, index) => (
                                <VisionCard
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <CardImage className="card-image" src={item.imageUrl} />
                                    <CardOverlay className="card-overlay" />
                                    <CardLabel className="card-label">{item.label}</CardLabel>
                                    <CardContent className="card-content">
                                        <CardText>{item.text}</CardText>
                                    </CardContent>
                                </VisionCard>
                            ))}
                        </VisionGrid>
                    </VisionContainer>
                )}

                {/* Section Nos Engagements */}
                {engagementItems.length > 0 && (
                    <EngagementsContainer>
                        <Typography
                            as="h1"
                            type="h1"
                            color="primary"
                            initial={{ opacity: 0, y: -25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ amount: "all", margin: "0px 0px -80px 0px", once: true }}
                            transition={{ duration: 0.9, ease: "easeIn" }}
                        >
                            {engagementsTitle || "Nos engagements"}
                        </Typography>

                        <EngagementsGrid>
                            {engagementItems.map((item, index) => (
                                <EngagementItem
                                    key={`${item?.title || item?.text || "engagement"}-${index}`}
                                    src={item?.iconUrl || ""}
                                    title={item?.title || ""}
                                    text={item?.text || ""}
                                    size={item?.iconSize || "45px"}
                                    index={index}
                                />
                            ))}
                        </EngagementsGrid>
                    </EngagementsContainer>
                )}

                {/* Section Orientations Générales */}
                {orientationItems.length > 0 && (
                <OrientationsContainer>
                    <Typography
                    as="h1"
                    type="h1"
                    color="primary"
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "all", margin: "0px 0px -80px 0px", once: true }}
                    transition={{ duration: 0.9, ease: "easeIn" }}
                    >
                    {orientationsTitle || "Orientations générales"}
                    </Typography>

                    {orientationsIntroText && (
                    <Typography
                        as="p"
                        type="h6"
                        color="dark"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ marginTop: "30px", textAlign: "center" }}
                    >
                        {orientationsIntroText}
                    </Typography>
                    )}

                    <OrientationsGrid>
                    {orientationItems.map((item, index) => (
                        <OrientationCard
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                        <OrientationNumber className="orientation-number">
                            {index + 1}
                        </OrientationNumber>
                        <OrientationContent>
                            <OrientationText>{item.text}</OrientationText>
                        </OrientationContent>
                        </OrientationCard>
                    ))}
                    </OrientationsGrid>
                </OrientationsContainer>
                )}

                {/* Section Notre Slogan */}
                {(sloganLine1 || sloganLine2) && (
                <SloganSection
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <SloganBackground />

                    <SloganContent>
                    <SloganTextWrapper>
                        <SloganLabel
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        >
                        {sloganLabel || "Notre slogan"}
                        </SloganLabel>
                        {sloganLine1 && (
                        <SloganLine
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {sloganLine1}
                        </SloganLine>
                        )}
                        {sloganLine2 && (
                        <SloganLine
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {sloganLine2}
                        </SloganLine>
                        )}
                    </SloganTextWrapper>
                    </SloganContent>
                </SloganSection>
                )}
            </StyledDiv>

            <Footer />
        </>
    )
}
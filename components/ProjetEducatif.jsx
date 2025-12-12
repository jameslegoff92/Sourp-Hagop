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

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  justify-items: center;
  align-items: center;
  margin: 50px auto;
  max-width: 1200px;
  padding: 0 20px;

  @media (max-width: 1234px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const BlueRectangle = styled(motion.div)`
  background-color: var(--secondary-color);
  width: 220px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);

  @media (max-width: 1234px) {
    width: 70%;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`

const Paragraph = styled.p`
  padding: 10px 10px;
  color: #333;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`

const StyledIcon = styled.img`
  width: ${(props) => props.size || "80px"};
  height: ${(props) => props.size || "80px"};
  padding: 10px 0;
`

const IconMask = styled.div`
  width: ${(props) => props.size || "80px"};
  height: ${(props) => props.size || "80px"};
  background-color: ${(props) => props.color || "var(--secondary-color)"};
  -webkit-mask-image: url(${(props) => props.src});
  mask-image: url(${(props) => props.src});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
`

const RectangleItem = ({ src, title, text, size, index, color = "rgba(0, 125, 195, 1)" }) => (
    <BlueRectangle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
    >
        <IconMask src={src} size={size} color={color} />
        {title ? (
            <Typography as="p" type="h6" color="dark">
                {title}
            </Typography>
        ) : null}
        <Paragraph>{text}</Paragraph>
    </BlueRectangle>
)

export default function ProjetEducatif({ data }) {
    const headerImageUrl = data?.pageHeader?.headerImageUrl
    const headerText = data?.pageHeader?.headerText

    const missionTitle = data?.missionSection?.title
    const missionText = data?.missionSection?.text

    const engagementsTitle = data?.engagementsSection?.title
    const engagementItems = Array.isArray(data?.engagementsSection?.items) ? data.engagementsSection.items : []

    return (
        <>
            <Header
                animate={false}
                imageSrc={headerImageUrl || "../images/header/projet-educatif-header.jpg"}
                headerText={headerText || "PROJET ÉDUCATIF"}
                headerTextTop={"70%"}
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

                <Typography
                    as="h1"
                    type="h1"
                    color="primary"
                    initial={{ opacity: 0, y: -25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "all", margin: "0px 0px -80px 0px", once: true }}
                    transition={{ duration: 0.9, ease: "easeIn" }}
                    style={{ marginTop: "80px" }}
                >
                    {engagementsTitle || "Nos engagements"}
                </Typography>

                    <ItemsContainer>
                        {engagementItems.map((item, index) => (
                            <RectangleItem
                                key={`${item?.title || item?.text || "engagement"}-${index}`}
                                src={item?.iconUrl || ""}
                                title={item?.title || ""}
                                text={item?.text || ""}
                                size={item?.iconSize || "80px"}
                                color="rgba(0, 125, 195, 1)"
                                index={index}
                            />
                        ))}
                    </ItemsContainer>
            </StyledDiv>

            <Footer />
        </>
    )
}

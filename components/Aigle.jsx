"use client"

import Header from "../components/ui/Header"
import Footer from "../components/ui/Footer"
import styled from "@emotion/styled"
import Typography from "../components/display/Typography"
import { motion } from "framer-motion"
import BackgroundLogo from "../components/ui/BackgroundLogo"

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 200px;
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

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
`

const TitleWrapper = styled(motion.div)`
  margin-top: 1.5rem;
`

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
  border-radius: 12px;
  object-fit: cover;
`

export default function Aigle({ data }) {
    return (
        <>
            <Header
                imageSrc={data?.headerImageUrl}
                headerText={data?.headerText || "ÉQUIPE DES AIGLES"}
                headerTextTop="70%"
            />
            <StyledDiv>
                <MotionDiv>
                    <SectionHeader>
                        <SectionSubtitle
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Sports et activités
                        </SectionSubtitle>
                        <TitleWrapper
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            <Typography as="h1" type="h1" color="primary">
                                {data?.introTitle}
                            </Typography>
                        </TitleWrapper>
                    </SectionHeader>

                    <TextContainer>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {data?.introText}
                        </Typography>
                    </TextContainer>

                    <ImageGrid>
                        {data?.images?.map((img, index) => {
                            const gridAreas = [
                                "1 / 1 / 2 / 2",
                                "1 / 2 / 3 / 3",
                                "1 / 3 / 2 / 4",
                                "2 / 1 / 3 / 2",
                                "2 / 3 / 3 / 4"
                            ]
                            return (
                                <StyledImage
                                    key={index}
                                    src={img.url}
                                    alt={`Équipe des Aigles image ${index + 1}`}
                                    style={{ gridArea: gridAreas[index] }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.2,
                                        ease: "easeInOut"
                                    }}
                                    viewport={{ once: true, amount: 0.1 }}
                                />
                            )
                        })}
                    </ImageGrid>
                </MotionDiv>
            </StyledDiv>
            <BackgroundLogo src="../images/aigle-logo.svg" />
            <Footer />
        </>
    )
}
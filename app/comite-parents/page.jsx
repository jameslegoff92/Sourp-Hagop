"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Typography from "@/components/display/Typography";
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
    
  @media (max-width: 768px) {
    align-items: left;
    padding: 50px 20px 50px 35px;
  }
`;

export default function ComiteParents() {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();

    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const containerRef3 = useRef(null);

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target) {
                        case containerRef1.current:
                            controls1.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef2.current:
                            controls2.start({ x: 0, opacity: 1 });
                            break;
                        case containerRef3.current:
                            controls3.start({ x: 0, opacity: 1 });
                            break;
                        default:
                            break;
                    }
                }
            });
        };

        const observerOptions = {
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (containerRef1.current) observer.observe(containerRef1.current);
        if (containerRef2.current) observer.observe(containerRef2.current);
        if (containerRef3.current) observer.observe(containerRef3.current);

        return () => {
            if (containerRef1.current) observer.unobserve(containerRef1.current);
            if (containerRef2.current) observer.unobserve(containerRef2.current);
            if (containerRef3.current) observer.unobserve(containerRef3.current);
        };
    }, [controls1, controls2, controls3]);

    return (
        <>
            <BackgroundLogo src="../images/comite-parents.jpg" style={{
                marginLeft: '0',
            }} />
            <Header
                animate={false}
                imageSrc="../images/header/parent-header.jpg"
                headerText="COMITÉ DE PARENTS"
                headerTextTop="60%"
            />

            <StyledDiv>
                <MotionDiv>
                    <ContentContainer ref={containerRef1}>
                        <Image src="../images/parent-role.jpg" alt="Parent Image" />

                        <TextBlock
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls1}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary">
                                Rôle
                            </Typography>

                            <TextContainer>
                                <Typography as="p" type="h6" color="dark">
                                    Le comité de parents représente les intérêts des parents en
                                    tant que conseiller auprès de la direction. Il fait des
                                    recommandations pour améliorer la vie scolaire et contribue
                                    bénévolement aux activités sociales, culturelles et aux
                                    collectes de fonds.
                                </Typography>
                            </TextContainer>
                        </TextBlock>
                    </ContentContainer>
                </MotionDiv>

                <MotionDiv>
                    <ContentContainer ref={containerRef2}>
                        <OrderContainer>
                            <TextBlock
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={controls2}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Typography as="h3" type="h3" color="primary">
                                    Formation
                                </Typography>

                                <TextContainer>
                                    <Typography as="p" type="h6" color="dark">
                                        Le comité comprend un représentant par niveau, élu lors d'une
                                        réunion des parents pour un mandat d'un an, renouvelable deux
                                        fois. Après trois mandats consécutifs, un représentant doit
                                        attendre un an avant de se représenter.
                                    </Typography>
                                </TextContainer>
                            </TextBlock>
                        </OrderContainer>
                        <Image src="../images/parent-formation.jpg" alt="Parent Image" />
                    </ContentContainer>
                </MotionDiv>

                <MotionDiv>
                    <ContentContainer ref={containerRef3}>
                        <Image src="../images/parent-reunion.jpg" alt="Parent Image" />

                        <TextBlock
                            initial={{ x: "100%", opacity: 0 }}
                            animate={controls3}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Typography as="h3" type="h3" color="primary">
                                Réunions
                            </Typography>

                            <TextContainer>
                                <Typography as="p" type="h6" color="dark">
                                    Les réunions mensuelles incluent les représentants élus, un
                                    enseignant, la directrice, un membre du conseil
                                    d'administration, et d'autres parents avec l'accord du
                                    président du comité. Le conseil exécutif est formé après un
                                    vote et comprend un président, vice-président, secrétaire,
                                    vice-secrétaire et trésorier.
                                </Typography>
                            </TextContainer>
                        </TextBlock>
                    </ContentContainer>
                </MotionDiv>
            </StyledDiv>

            <Footer />
        </>
    );
}

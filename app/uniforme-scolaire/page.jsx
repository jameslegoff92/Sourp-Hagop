"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Typography from "@/components/display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;
`;

const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactInfo = styled.div`
  text-align: left;
`;

const Logo = styled.img`
  width: clamp(10rem, 4vw, 10rem);
  height: auto;
  object-fit: contain;
  margin-left: 10px;
`;

export default function UniformeScolaire() {
    return (
        <>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Header
                animate={false}
                imageSrc="../images/header/uniforme-header.jpg"
                headerText="UNIFORME SCOLAIRE blablabla"
                headerTextTop="60%"
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
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                    >
                        Service Uniforme
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
                            Les uniformes jouent un rôle essentiel dans la création d'un environnement scolaire concentré et cohésif. 
                            Notre partenaire, TOP MARKS, propose des uniformes fiables et confortables pour tous les élèves. 
                            Vous trouverez leurs coordonnées pour toute information concernant les commandes.
                        </Typography>
                    </TextContainer>
                </MotionDiv>

                <ContactContainer>
                    <Logo src="../images/topmarks-logo.jpg" alt="Top Marks Logo" />
                    <ContactInfo>
                        <Typography as="h5" type="h5" style={{ color: "#007DC3", fontWeight: "bold" }}>
                            TOP MARKS
                        </Typography>
                        <Typography as="p" type="label" color="dark">
                            <a href="https://www.topmarks.com">www.topmarks.com</a>
                        </Typography>
                        <Typography as="p" type="label" color="dark">
                            (514) 555-1234
                        </Typography>
                        <Typography as="p" type="label" color="dark">
                            <a href="mailto:info@topmarks.com">info@topmarks.com</a>
                        </Typography>
                    </ContactInfo>
                </ContactContainer>

            </StyledDiv>
            <Footer />
        </>
    );
}

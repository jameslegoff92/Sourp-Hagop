"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackgroundLogo from "@/components/ui/BackgroundLogo";
import Typography from "@/components/display/Typography";
import CustomButton from "@/components/inputs/Button";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const TextBlockContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: var(--spacing-4);
  margin: 50px auto;
  width: 80%;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const TextBlockStyled = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  background-color: var(--secondary-color);
  flex: 1;
  text-align: center;
  width: 400px;
  height: 400px;
  position: relative;

  @media (max-width: 992px) {
    width: 80%;
  }
`;

const VerticalLine = styled.div`
  width: 3px;
  background-color: black;
  height: 80%;
  align-self: center;

  @media (max-width: 992px) {
    display: none;
  }
`;

const TextBlock = ({ title, subtitle, text, link }) => (
  <TextBlockStyled
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeIn" }}
  >
    <Typography as="h6" type="h6" color="dark">{title}</Typography>
    <Typography as="h3" type="h3" color="primary" style={{ fontWeight: "400", marginBottom: "20px" }}>{subtitle}</Typography>
    <Typography as="p" type="h6" color="dark">{text}</Typography>

    <CustomButton
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        style={{ marginTop: "50px", width: "250px", alignSelf: "center" }}
    >
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        Commencer
        </a>
    </CustomButton>
  </TextBlockStyled>
  
);

const textBlocksData = [

  {
    title: "Admission",
    subtitle: "PRÉSCOLAIRE ET PRIMAIRE",
    text: "Il fait des recommandations pour améliorer la vie scolaire et contribue bénévolement aux activités sociales.",
    link: "https://ecolesourphagop.coba.ca/pednet/index.coba?GKfUxinLdjbyZyQchPB0v4V9GR35tzWo5/I9GE9a9ygh6KSIjqnbHGe+B+JZouAn+hBecAbjy2JATPP0qeW1CbSOhXihrvsucAF0M2vrSJtBT5Xv99d+kKFAxHje7pDsqT+A16cDRb4ggHhMuAUSdRgWXQM"
  },
  {
    title: "Admission",
    subtitle: "SECONDAIRE",
    text: "Les parents aident aussi aux collectes de fonds pour soutenir divers projets éducatifs et culturels.",
    link: "https://ecolesourphagop.coba.ca/pednet/index.coba?GKfUxnn1H6Xx6ReQTC/4nQV5MpoT41K9GBU7qVqxJ4L8ygA3wrh9nY2pl8woOHqQV19WcV64lDYajr128MSDf+ENaLQNZHxUvCKisvQIn4hHlmcVDs+8ntLCZteesLh9jbQFo7kHSYvFu4TwI+04UCNfNe0" 
  }
];

export default function Admissions() {
  return (
    <>
      <BackgroundLogo src="../images/logo-big.svg"/>
      <Header animate={false} imageSrc="../images/header/admissions-header.jpg" headerText="ADMISSIONS" headerTextTop="70%" />

      <StyledDiv>
      <TextBlockContainer>
        {textBlocksData.map((item, index) => (
            <div key={index} style={{ display: "contents" }}>  
            <TextBlock title={item.title} subtitle={item.subtitle} text={item.text} />
            {index < textBlocksData.length - 1 && <VerticalLine />}
            </div>
        ))}
      </TextBlockContainer>
      </StyledDiv>
      
      <Footer />
    </>
  );
}

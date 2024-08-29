"use client";
import Image from "next/image";

//Third Party Imports
import { motion } from "framer-motion";
import styled from "@emotion/styled";

//Local Imports
import MiniCalendar from "../display/Calendar";
import Container from "./Container";
import Footer from "../ui/Footer";
import Typography from "../display/Typography";
import Strengths from "../ui/Strength";
import Values from "../ui/Values";

//CSS For Section1
const Section1 = styled.section`
  text-align: center;
  padding: 2.5rem 0 2.5rem;
  position relative;
  
  @media (min-width: 650px) {
    height: 37.5rem;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  width: clamp(15rem, 60vw, 35rem);
  max-width: 90%;
  height: auto;
  opacity: 0.07;
  z-index: -1;
  left: 50%;
  transform: translateX(-37%);
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  padding-top: var(--spacing-2);
  margin: 0 auto 0;
  width: 90%;
  max-width: 1000px;

  @media (min-width: 1024px) {
    padding-top: var(--spacing-8);
  }
`;



//CSS For the following Section
const StyledDiv = styled.div`
  text-align: center;
  padding: 40px 0 40px;
  position relative;
`;

const StyledDiv2 = styled(StyledDiv)`
  padding: 40px 0 100px;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  padding-top: var(--spacing-2);
  margin: 0 auto 0;
  width: 50%;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  height: auto;
  background-color: var(--tertiary-color);

  @media (min-width: 768px) {
    padding: 3rem 4rem 0;
    height: 100%;
  }
`;

const TextDiv2 = styled(TextDiv)`
  background-color: #006096;
`;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-top: var(--spacing-7);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;


const NewsItem = ({ imageSrc, title, description, isLast }) => (
  <div className={`flex flex-col ${!isLast ? "pr-4 md:pr-8" : ""}`}>
    <div className="relative w-full h-48 md:h-[350px] mb-4">
      <Image src={imageSrc} alt={title} style={{ objectFit: "cover" }} fill />
    </div>
    <h3 className="font-normal text-left mb-2">{title}</h3>
    <div className="flex-grow" />
    <button className="text-[#007DC3] border border-[#007DC3] px-4 py-2 rounded text-sm self-start hover:bg-[#007DC3] hover:text-white transition-colors mt-4">
      EN SAVOIR PLUS
    </button>
  </div>
);

const LatestNews = () => {
  const newsItems = [
    {
      imageSrc: "/images/blogimg1.jpg",
      title:
        "Nous souhaitons bonne session d'examens à tous nos élèves qui sont en période d'évaluations !!!",
      description:
        "Nous souhaitons bonne session d'examens à tous nos élèves qui sont en période d'évaluations !!!",
    },
    {
      imageSrc: "/images/blogimg2.jpg",
      title:
        "Les élèves de 4e secondaire préparent leurs projets « stop motion » au Créalab, dans le cadre de leur cours d'ÉCR.",
      description:
        "Les élèves de 4e secondaire préparent leurs projets « stop motion » au Créalab, dans le cadre de leur cours d'ÉCR.",
    },
    {
      imageSrc: "/images/blogimg3.jpg",
      title:
        "Les élèves du secondaire ont eu une journée agréable avec plein d'activités et de divertissement.",
      description:
        "Les élèves du secondaire ont eu une journée agréable avec plein d'activités et de divertissement.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography as="h1" type="h2" color="primary">
        DERNIÈRES NOUVELLES
      </Typography>
      <div className="flex flex-col md:flex-row md:space-x-8 mt-[60px]">
        {newsItems.map((item, index) => (
          <div key={index} className="flex-1 mb-8 md:mb-0">
            <NewsItem {...item} isLast={index === newsItems.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <>
      <Section1>
        <StyledImage
          src="/images/logo-big.svg"
          alt="transparent logo image"
        />
        <ContentWrapper>
          <Typography
            as="h1"
            type="h1"
            color="primary"
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              amount: "all",
              margin: "0px 0px -100px 0px",
              once: true,
            }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          >
            Pourquoi choisir Sourp Hagop ?
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h5"
              color="dark"
              initial={{ opacity: 0, y: 400 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              pulvinar, mauris vitae bibendum dictum, tellus velit fermentum
              dolor, rutrum porta est velit varius ligula. Vestibulum at finibus
              diam. Fusce commodo risus nulla, eleifend mattis mi pharetra a.
              Fusce vitae elit id ipsum mattis vulputate. Aliquam quis dolor
              ligula. Nulla facilisi. In hac habitasse platea dictumst. Cras sed
              tellus est.
            </Typography>
          </TextContainer>
        </ContentWrapper>
      </Section1>

      <Values/>

      <StyledDiv2>
        <Container>
          <Strengths />
        </Container>
      </StyledDiv2>
      <MiniCalendar />
      <StyledDiv2>
        <LatestNews />
      </StyledDiv2>
      <Footer />
    </>
  );
};

export default Main;

"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import Typography from "../display/Typography";
import Values from "../ui/Values";
import { motion } from "framer-motion";
import Container from "./Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../ui/Footer";

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



const images = [
  { src: "/images/force1.jpg", alt: "Image 1" },
  { src: "/images/force2.jpg", alt: "Image 2" },
  { src: "/images/force3.png", alt: "Image 3" },
  { src: "/images/force4.jpg", alt: "Image 4" },
  { src: "/images/force5.jpg", alt: "Image 5" },
  { src: "/images/force6.jpg", alt: "Image 6" },
  { src: "/images/force7.jpg", alt: "Image 7" },
  { src: "/images/force8.jpg", alt: "Image 8" },
  { src: "/images/force9.jpg", alt: "Image 9" },
];

const ImageGrid = ({ images }) => {
  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.slice(0, 9).map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.3 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CalendarDay = ({ day, month, event, isActive }) => (
  <div className={`flex flex-col items-center ${isActive ? "relative" : ""}`}>
    <span className="text-xs uppercase mb-1">{month}</span>
    <span className="text-4xl font-bold mb-1">{day}</span>
    {event && (
      <span className="text-[10px] text-center max-w-[100px] leading-tight">
        {event}
      </span>
    )}
    {isActive && (
      <div className="absolute top-[-16px] left-[70px] w-2 h-2 bg-white rounded-full" />
    )}
  </div>
);

const Calendar = () => {
  return (
    <div className="bg-[#006096] text-white py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center py-4">
        <Typography as="h1" type="h2" color="light">
          CALENDRIER
        </Typography>
        <div className="flex justify-between items-center mt-[60px] mb-8">
          <ChevronLeft className="w-8 h-8 cursor-pointer" />
          <div className="flex justify-between w-full max-w-3xl">
            <div className="flex-1 px-1">
              <CalendarDay day="27" month="Juin" />
            </div>
            <div className="flex-1 px-1">
              <CalendarDay day="28" month="Juin" event="Journée Pédagogique" />
            </div>
            <div className="flex-1 px-1">
              <CalendarDay day="29" month="Juin" isActive={true} />
            </div>
            <div className="flex-1 px-1">
              <CalendarDay day="30" month="Juin" />
            </div>
            <div className="flex-1 px-1">
              <CalendarDay day="01" month="Juil" event="Canada Day" />
            </div>
          </div>
          <ChevronRight className="w-8 h-8 cursor-pointer" />
        </div>
        <div className="relative flex flex-col items-center">
          <div className="flex justify-center space-x-3 mb-8">
            <div className="w-3 h-3 bg-white opacity-50 rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white opacity-50 rounded-full"></div>
          </div>
          <div className="absolute top-0 right-0 h-full flex items-center">
            <button className="text-sm uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity">
              Visualiser le calendrier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              amount: "all",
              margin: "0px 0px -300px 0px",
              once: true,
            }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
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



      {/* Nos Forces */}
      <StyledDiv2>
        <Container>
          <Typography
            style={{ textAlign: "center" }}
            as="h1"
            type="h2"
            color="primary"
          >
            Nos Forces
          </Typography>
          <ImageGrid images={images} />
        </Container>
      </StyledDiv2>
      <Calendar />
      <StyledDiv2>
        <LatestNews />
      </StyledDiv2>
      <Footer />
    </>
  );
};

export default Main;

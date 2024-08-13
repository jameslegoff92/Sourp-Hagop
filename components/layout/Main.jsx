"use client";

import Image from "next/image";
import styled from "@emotion/styled";
import Typography from "../display/Typography";
import { easeIn, motion } from "framer-motion";
import Container from "./Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../ui/Footer";

const StyledDiv = styled.div`
  text-align: center;
  padding: 40px 0 300px;
  position relative;
`;

const ExtendedStyledDiv = styled(StyledDiv)`
  background-color: var(--secondary-color);
  padding: 40px 0 100px;
`;

const StyledDiv2 = styled(StyledDiv)`
  padding: 40px 0 100px;
`;

const StyledImage = styled(Image)`
  position: absolute;
  opacity: 0.1;
  z-index: -1;
  left: 50%;
  transform: translateX(-40%);
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  padding-top: var(--spacing-8);
  margin: 0 auto 0;
  width: 50%;
`;

const ExtendedMotionDiv = styled(MotionDiv)`
  flex-direction: row;
  width: 100%;
`;

const TextContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ValueContainer = styled(motion.div)`
  overflow: hidden;
  height: 31.25rem;
`;

const ValueSubContainer = styled(motion.div)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)),
    // Blue tint overlay// Blue tint overlay
    url("/images/value-img-1.png"); // Replace with your image URL
  background-size: cover; // Ensures the image covers the whole div
  background-position: center; // Centers the image
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 40px;
`;

const ValueSubContainer2 = styled(ValueSubContainer)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)),
    // Blue tint overlay// Blue tint overlay
    url("/images/respect.JPG"); // Replace with your image URL
`;

const ValueSubContainer3 = styled(ValueSubContainer)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)),
    // Blue tint overlay// Blue tint overlay
    url("/images/responsible.JPG"); // Replace with your image URL
`;

const ValueText = styled(Typography)``;
const ValueText2 = styled(ValueText)`
  color: #fff;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 4rem 0;
  height: 100%;
  background-color: var(--tertiary-color);
`;

const TextDiv2 = styled(TextDiv)`
  background-color: #006096;
`;

const CardContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-4);
  margin-top: var(--spacing-7);
`;

const listVariants = {
  initial: {},
  hover: {},
};

const itemVariants = {
  initial: { height: "100%" },
  hover: {
    height: "25%",
    transition: {
      duration: 0.2,
    },
  },
};

const textVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 2 } },
};

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
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
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
    {event && <span className="text-[10px] text-center max-w-[100px] leading-tight">{event}</span>}
    {isActive && <div className="absolute top-[-16px] left-[70px] w-2 h-2 bg-white rounded-full" />}
  </div>
);

const Calendar = () => {
  return (
    <div className="bg-[#006096] text-white py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center py-4">
        <Typography as="h1" type="h2" primary="secondary" color="light">
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
  <div className={`flex flex-col ${!isLast ? "border-r border-blue-300 pr-4 md:pr-8" : ""}`}>
    <div className="relative w-full h-48 md:h-[350px] mb-4">
      <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
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
      title: "Nous souhaitons bonne session d'examens à tous nos élèves qui sont en période d'évaluations !!!",
      description: "Nous souhaitons bonne session d'examens à tous nos élèves qui sont en période d'évaluations !!!",
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
      title: "Les élèves du secondaire ont eu une journée agréable avec plein d'activités et de divertissement.",
      description: "Les élèves du secondaire ont eu une journée agréable avec plein d'activités et de divertissement.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography as="h1" type="h2" primary="secondary" color="primary">
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
      <StyledDiv>
        <StyledImage src="/images/logo-big.svg" alt="hero image" width={635} height={558} />
        <MotionDiv>
          <Typography
            as="h1"
            type="h1"
            color="primary"
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: "all", margin: "0px 0px -300px 0px", once: true }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
          >
            Pourquoi choisir Sourp Hagop
          </Typography>
          <TextContainer>
            <Typography
              as="p"
              type="h5"
              color="dark"
              initial={{ opacity: 0, x: -400 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
              viewport={{ once: true }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar, mauris vitae bibendum dictum, tellus
              velit fermentum dolor, rutrum porta est velit varius ligula. Vestibulum at finibus diam. Fusce commodo
              risus nulla, eleifend mattis mi pharetra a. Fusce vitae elit id ipsum mattis vulputate. Aliquam quis dolor
              ligula. Nulla facilisi. In hac habitasse platea dictumst. Cras sed tellus est.
            </Typography>
          </TextContainer>
        </MotionDiv>
      </StyledDiv>

      {/* VALUES SECTION */}

      <ExtendedStyledDiv>
        <Container>
          <Typography as="h1" type="h2" primary="secondary" color="primary">
            Nos Valeurs
          </Typography>
          <CardContainer>
            <ExtendedMotionDiv>
              <ValueContainer inital="initial" whileHover="hover" variants={listVariants}>
                <ValueSubContainer2 variants={itemVariants}>
                  <Typography as="h1" type="h4" color="light" fontFamily="secondary">
                    RESPECT
                  </Typography>
                </ValueSubContainer2>
                <TextDiv>
                  <ValueText
                    initial="initial"
                    whileHover="hover"
                    as="p"
                    type="h6"
                    fontFamily="secondary"
                    variants={textVariants}
                  >
                    À Sourp Hagop, nous aidons nos élèves à atteindre l'accomplissement de soi en découvrant et
                    développant leur plein potentiel pour une vie épanouie.
                  </ValueText>
                </TextDiv>
              </ValueContainer>
            </ExtendedMotionDiv>
            <ExtendedMotionDiv>
              <ValueContainer inital="initial" whileHover="hover" variants={listVariants}>
                <ValueSubContainer3 variants={itemVariants}>
                  <Typography as="h1" type="h4" color="light" fontFamily="secondary">
                    RESPONSABILITÉ
                  </Typography>
                </ValueSubContainer3>
                <TextDiv2>
                  <ValueText2
                    initial="initial"
                    whileHover="hover"
                    as="p"
                    type="h6"
                    fontFamily="secondary"
                    variants={textVariants}
                  >
                    La responsabilité nous rend autonomes. À Sourp Hagop, nous encourageons les élèves à prendre en
                    charge leurs actions et à s'engager activement dans leur communauté.
                  </ValueText2>
                </TextDiv2>
              </ValueContainer>
            </ExtendedMotionDiv>
            <ExtendedMotionDiv>
              <ValueContainer inital="initial" whileHover="hover" variants={listVariants}>
                <ValueSubContainer variants={itemVariants}>
                  <Typography as="h1" type="h4" color="light" fontFamily="secondary">
                    ACOMPLISSEMENT DE SOI
                  </Typography>
                </ValueSubContainer>
                <TextDiv>
                  <ValueText
                    initial="initial"
                    whileHover="hover"
                    as="p"
                    type="h6"
                    fontFamily="secondary"
                    variants={textVariants}
                  >
                    Le respect est essentiel. À l'école arménienne Sourp Hagop, nous valorisons le respect envers tous,
                    créant un environnement de confiance et de considération mutuelle
                  </ValueText>
                </TextDiv>
              </ValueContainer>
            </ExtendedMotionDiv>
          </CardContainer>
        </Container>
      </ExtendedStyledDiv>

      {/* Nos Forces */}
      <StyledDiv2>
        <Container>
          <Typography style={{ textAlign: "center" }} as="h1" type="h2" primary="secondary" color="primary">
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

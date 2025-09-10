"use client";

import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import styled from "@emotion/styled";
import Typography from "../components/display/Typography";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import BackgroundLogo from "../components/ui/BackgroundLogo";

// const Title = style.h1`
//   color: var(--black);
//   font-family: var(--secondary-ff) sans-serif;
//   margin-bottom: 0.5rem;
//   font-size: 2.6875rem;
//   font-style: normal;
//   font-weight: 300;
//   line-height: 150%; /* 64.5px */
//   letter-spacing: 0.05rem;
// `;

const Text = styled.p`
  color: var(--black);
  font-family: var(--primary-ff) sans-serif;
  margin-bottom: 1rem;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%; /* 64.5px */
  letter-spacing: 0.05rem;
`;

const Img = styled.img`
  display: block;
  max-width: 100%;
  max-height: 300px; /* Adjust to your preferred max height */
  width: auto;
  height: 30vh;
  margin: 12px 0 20px 0;
  object-fit: cover; /* Ensures the image covers the area without stretching */
`;

const ProgressBarContainer = ({ children, style }) => (
  <motion.div
    className="left-[25%] transform -translate-x-1/2 w-[10px] h-[calc(430vh-80px)] bg-black/10 rounded-md overflow-hidden"
    style={style}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ style }) => (
  <motion.div
    className="w-full h-full bg-[#007DC3] rounded-md origin-top"
    style={style}
  />
);

const CircleContainer = ({ children, style }) => (
  <div
    className="left-[25%] transform -translate-x-1/2 h-[calc(430vh-20px)] w-[50%] flex flex-col justify-between items-center pointer-events-none z-[2]"
    style={style}
  >
    {children}
  </div>
);

const CircleWrapper = ({ children, scale, opacity, date, title, text, img }) => (
  <motion.div
    className="w-full flex items-center justify-center relative mb-100"
    style={{ transform: "scale(1)" }}
  >
    <motion.div
      className="absolute right-[calc(50%+4rem)] text-right whitespace-nowrap text-[#007DC3] font-bold"
      style={{ opacity, scale }}
    >
      {date}
    </motion.div>
    <div className="w-6 h-6 flex justify-center items-center relative">
      <div className="absolute w-12 h-12 bg-white rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <motion.div className="relative z-10" style={{ opacity }}>
        {children}
      </motion.div>
    </div>
    <motion.div
      className="absolute top-[-20px] left-[55%] font-bold max-w-[650px] w-full"
      style={{ opacity }}
    >
      <Typography
        as="h3"
        type="h3"
        color="primary"
        style={{ width: "120%", marginTop: "0.5rem", marginBottom: "1rem" }}
      >
        {title}
      </Typography>
      <Text>{text}</Text>
      {img && (
        <div>
          <Img src={img} alt="timeline img"/>
        </div>
      )}
    </motion.div>
  </motion.div>
);

export default function Historique({ historyData }) {

  const timelineEvents = historyData?.timelineEvents || [];
  const pageHeader = historyData?.pageHeader || {};
  const timelineSettings = historyData?.timelineSettings || {};

  // Fallback if no data
  if (!timelineEvents.length) {
    return (
      <>
        <Header imageSrc="../images/school.svg" headerText="NOTRE HISTOIRE" headerTextTop="3%"/>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <Typography as="h2" type="h2" color="primary">
            No timeline data available
          </Typography>
        </div>
        <Footer />
      </>
    );
  }

  const { scrollY, scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 80,
    restDelta: 0.001,
  });

  const ref = useRef(null);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      if (ref.current) {
        console.log("Value of ref.current: ", ref.current);
        console.log("Value of ref.current.offsetTop: ", ref.current.offsetTop);
        setElementTop(745);
      }
    };

    updateLayout();
  }, []);

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, 1], {
    clamp: false,
  });

  const scaledProgress = useTransform(scaleY, (value) => value * 1.2);

  const circleCount = timelineEvents.length;
  const circleScales = [...Array(circleCount)].map((_, index) => {
    return useTransform(
      scaledProgress,
      [index / circleCount, (index + 1) / circleCount],
      [1, 1.5]
    );
  });

  const circleOpacities = [...Array(circleCount)].map((_, index) => {
    return useTransform(
      scaledProgress,
      [
        (index - 0.3) / circleCount,
        index / circleCount,
        (index + 0.3) / circleCount,
      ],
      [0.3, 0.2, 1]
    );
  });

  const containerStyle = {
    position: y.get() > 1 ? "absolute" : "absolute",
    top: y.get() > 1 ? "auto" : "auto",
  };

  return (
    <>
      <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
      <Header 
        imageSrc={pageHeader.headerImageUrl || "../images/school.svg"} 
        headerText={pageHeader.headerText || "NOTRE HISTOIRE"} 
        headerTextTop="3%"
      />
      <div style={{ position: "relative", marginBottom: "20rem" }}>
        <div className="h-20" ref={ref} />
        <ProgressBarContainer style={containerStyle}>
          <ProgressBar style={{ scaleY: scaledProgress }} />
        </ProgressBarContainer>
        <CircleContainer style={containerStyle}>
        {circleScales.map((scale, index) => (
          <CircleWrapper
            key={timelineEvents[index]._id || index}
            opacity={circleOpacities[index]}
            date={timelineEvents[index].date}
            title={timelineEvents[index].title}
            text={timelineEvents[index].description}
            img={timelineEvents[index].imageUrl}
          >
            <Brightness1Icon style={{ color: "#007DC3", fontSize: 24 }} />
            </CircleWrapper>
          ))}
        </CircleContainer>
        <div className="h-[450vh]">
          <p>{/* Your content here */}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

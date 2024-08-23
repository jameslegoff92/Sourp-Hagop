"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import BackgroundLogo from "@/components/ui/BackgroundLogo";

const ProgressBarContainer = ({ children, style }) => (
  <motion.div
    className="left-[25%] transform -translate-x-1/2 w-[10px] h-[calc(350vh-80px)] bg-black/10 rounded-md overflow-hidden"
    style={style}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ style }) => (
  <motion.div className="w-full h-full bg-[#007bff] rounded-md origin-top" style={style} />
);

const CircleContainer = ({ children, style }) => (
  <div
    className="left-[25%] transform -translate-x-1/2 h-[calc(350vh-80px)] w-[50%] flex flex-col justify-between items-center pointer-events-none z-[2]"
    style={style}
  >
    {children}
  </div>
);

const CircleWrapper = ({ children, scale, opacity, date, text }) => (
  <motion.div className="w-full flex items-center justify-center relative" style={{ scale }}>
    <motion.div
      className="absolute right-[calc(50%+4rem)] text-right whitespace-nowrap text-[#007bff] font-bold"
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
      className="absolute left-[calc(50%+7rem)] whitespace-nowrap text-[#007bff] font-bold"
      style={{ opacity, scale }}
    >
      {text}
    </motion.div>
  </motion.div>
);

const timelineData = [
  { date: "1950", text: "Foundation of the school" },
  { date: "1975", text: "First major expansion" },
  { date: "1990", text: "Introduction of new curriculum" },
  { date: "2000", text: "Technology integration initiative" },
  { date: "2010", text: "International partnerships established" },
  { date: "2020", text: "Launch of online learning platform" },
  { date: "2024", text: "Celebrating 75 years of excellence" },
];

export default function History() {
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

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, 1], { clamp: false });

  const scaledProgress = useTransform(scaleY, (value) => value * 1.0);

  const circleCount = timelineData.length;
  const circleScales = [...Array(circleCount)].map((_, index) => {
    return useTransform(scaledProgress, [index / circleCount, (index + 1) / circleCount], [1, 1.5]);
  });

  const circleOpacities = [...Array(circleCount)].map((_, index) => {
    return useTransform(
      scaledProgress,
      [(index - 0.3) / circleCount, index / circleCount, (index + 0.3) / circleCount],
      [0.3, 0.2, 1]
    );
  });

  const containerStyle = {
    position: y.get() > 1 ? "absolute" : "absolute",
    top: y.get() > 1 ? "auto" : "auto",
  };

  return (
    <>
      <BackgroundLogo />
      <Header imageSrc="../images/school.svg" headerText="NOTRE HISTOIRE" />
      <div style={{ position: "relative"}}>
        <div className="h-20" ref={ref} />
        <ProgressBarContainer style={containerStyle}>
          <ProgressBar style={{ scaleY: scaledProgress }} />
        </ProgressBarContainer>
        <CircleContainer style={containerStyle}>
          {circleScales.map((scale, index) => (
            <CircleWrapper
              key={index}
              scale={scale}
              opacity={circleOpacities[index]}
              date={timelineData[index].date}
              text={timelineData[index].text}
            >
              <Brightness1Icon style={{ color: "#007bff", fontSize: 24 }} />
            </CircleWrapper>
          ))}
        </CircleContainer>
        <div className="h-[400vh]">
          <p>{/* Your content here */}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

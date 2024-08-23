"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import style from "@emotion/styled";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import BackgroundLogo from "@/components/ui/BackgroundLogo";

const Title = style.h1`
  color: var(--black);
  font-family: var(--secondary-ff) sans-serif;
  margin-bottom: 0.5rem;
  font-size: 2.6875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 150%; /* 64.5px */
  letter-spacing: 0.05rem;
`;

const Text = style.p`
  color: var(--black);
  font-family: var(--primary-ff) sans-serif;
  margin-bottom: 1rem;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%; /* 64.5px */
  letter-spacing: 0.05rem;
`;

const Img = style.img`
  display: inline-block;
  width: 500px;
`;

const ProgressBarContainer = ({ children, style }) => (
  <motion.div
    className="left-[25%] transform -translate-x-1/2 w-[10px] h-[calc(400vh-80px)] bg-black/10 rounded-md overflow-hidden"
    style={style}
  >
    {children}
  </motion.div>
);

const ProgressBar = ({ style }) => (
  <motion.div
    className="w-full h-full bg-[#007bff] rounded-md origin-top"
    style={style}
  />
);

const CircleContainer = ({ children, style }) => (
  <div
    className="left-[25%] transform -translate-x-1/2 h-[calc(400vh-80px)] w-[50%] flex flex-col justify-between items-center pointer-events-none z-[2]"
    style={style}
  >
    {children}
  </div>
);

const CircleWrapper = ({
  children,
  scale,
  opacity,
  date,
  title,
  text,
  img,
}) => (
  <motion.div
    className="w-full flex items-center justify-center relative"
    style={{ transform: "scale(1)" }}
  >
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
      className="absolute top-[-20px] h-[500px] w-[650px] left-[55%] font-bold"
      style={{ opacity, scale }}
    >
      <Title>{title}</Title>
      <Text>{text}</Text>
      {img && (
        <div>
          <Img src={img} alt="timeline img" />
        </div>
      )}
    </motion.div>
  </motion.div>
);

const timelineData = [
  {
    date: "1950",
    title: "Foundation of the school",
    text: "At Sourp Hagop High School Foundation, we believe that a strong educational foundation is the key to unlocking the potential of every student. Our mission is to support and enhance the educational experience at [Your School Name] High School by providing resources, opportunities, and initiatives that empower our students to excel academically, socially, and personally.",
    img: "/images/timeline1.jpg",
  },
  {
    date: "1975",
    title: "First major expansion",
    text: "At [Your School Name] High School Foundation, we believe that a strong educational foundation is the key to unlocking the potential of every student. Our mission is to support and enhance the educational experience at [Your School Name] High School by providing resources, opportunities, and initiatives that empower our students to excel academically, socially, and personally.",
    img: "/images/timeline1.jpg",
  },
  {
    date: "1990",
    title: "Introduction of new curriculum",
    text: "At [Your School Name] High School Foundation, we believe that a strong educational foundation is the key to unlocking the potential of every student. Our mission is to support and enhance the educational experience at [Your School Name] High School by providing resources, opportunities, and initiatives that empower our students to excel academically, socially, and personally.",
    img: "/images/timeline3.jpg",
  },
  {
    date: "2000",
    title: "Technology integration initiative",
    text: "At [Your School Name] High School Foundation, we believe that a strong educational foundation is the key to unlocking the potential of every student. Our mission is to support and enhance the educational experience at [Your School Name] High School by providing resources, opportunities, and initiatives that empower our students to excel academically, socially, and personally.",
    img: "/images/timeline3.jpg",
  },
  {
    date: "2010",
    title: "International partnerships established",
    text: "slfkjlsfjlskfj",
    img: "/images/timeline3.jpg",
  },
  {
    date: "2020",
    title: "Launch of online learning platform",
    text: "slfkjlsfjlskfj",
    img: "/images/timeline3.jpg",
  },
  {
    date: "2024",
    title: "Celebrating 75 years of excellence",
    text: "slfkjlsfjlskfj",
    img: "",
  },
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

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, 1], {
    clamp: false,
  });

  const scaledProgress = useTransform(scaleY, (value) => value * 1.0);

  const circleCount = timelineData.length;
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
      <BackgroundLogo />
      <Header imageSrc="../images/school.svg" headerText="NOTRE HISTOIRE" />
      <div style={{ position: "relative" }}>
        <div className="h-20" ref={ref} />
        <ProgressBarContainer style={containerStyle}>
          <ProgressBar style={{ scaleY: scaledProgress }} />
        </ProgressBarContainer>
        <CircleContainer style={containerStyle}>
          {circleScales.map((scale, index) => (
            <CircleWrapper
              key={index}
              // scale={scale}
              opacity={circleOpacities[index]}
              date={timelineData[index].date}
              title={timelineData[index].title}
              text={timelineData[index].text}
              img={timelineData[index].img}
            >
              <Brightness1Icon style={{ color: "#007bff", fontSize: 24 }} />
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

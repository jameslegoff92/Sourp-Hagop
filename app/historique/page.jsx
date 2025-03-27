"use client";

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import styled from "@emotion/styled";
import Typography from "@/components/display/Typography";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import BackgroundLogo from "@/components/ui/BackgroundLogo";

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
    className="left-[25%] transform -translate-x-1/2 h-[calc(430vh-80px)] w-[50%] flex flex-col justify-between items-center pointer-events-none z-[2]"
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

const timelineData = [
  {
    date: "1974",
    title: "Inauguration de l'École arménienne Sourp-Hagop",
    text: "En 1974, l'École arménienne Sourp-Hagop a été inaugurée sur la rue Parthenais, accueillant quotidiennement 37 élèves, de la maternelle à la première année.",
    img: "/images/history/1974.jpg",
  },  
  {
    date: "1975",
    title: "Déménagement sur la Rue Victor-Doré",
    text: "L'aménagement qui se trouvait sur la rue Parthenais, ne dura qu’un an. L'école s'agrandit et nécessita de nouvelles installations sur la rue Victor Doré.",
    img: "/images/history/1975.jpg",
    
  },
  {
    date: "1980",
    title: "Premiers diplômés du primaire",
    text: "En juin 1980, l'École arménienne Sourp-Hagop a fièrement remis les diplômes à ses 17 premiers finissants du primaire.",
    img: "/images/history/1980.jpg",
  },
  {
    date: "1983",
    title: "Première cohorte du secondaire",
    text: "En septembre 1983, l'École arménienne Sourp-Hagop a accueilli sa première cohorte d'élèves du secondaire, marquant un nouveau chapitre dans son histoire avec un groupe de 8 élèves",
    img: "/images/timeline3.jpg",
  },
  {
    date: "1987",
    title: "Troisième déménagament sur la Rue Nadon",
    text: "L'École arménienne Sourp-Hagop n'a cessé de grandir, ce qui a conduit, en 1987, à son installation sur la rue Nadon, dans les locaux du Malcolm Campbell High School, où elle se trouve encore aujourd'hui.",
    img: "/images/history/1987.jpg",
  },
  {
    date: "1989",
    title: "Premiers diplômés du secondaire",
    text: "En juin 1989, l'École arménienne Sourp-Hagop a célébré la remise des diplômes de ses 8 premiers diplômés du secondaire.",
    img: "/images/history/1989.jpg",
  },
  {
    date: "1993",
    title: "Pavillon primaire Sarafian",
    text: "En vue d'honorer nos bienfaiteurs principaux, le conseil d'administration de l'École arménienne Sourp Hagop a dédié le pavillon primaire à M. et Mme Vartkes et Asdghig Sarafian en 1993.",
    img: "/images/history/1993.jpg",
  },  
  {
    date: "2003",
    title: "Pavillon secondaire Pastermadjian",
    text: "De même, en 2003, le conseil d'administration a dédié le pavillon secondaire aux frères Hagop, Hrant et Yervant Pastermadjian pour les honorer de manière équivalente. Cette même année, le bâtiment a été acheté et est devenu la propriété de l'école.",
    img: "/images/history/2003.jpg",
  },
  {
    date: "2024",
    title: "Célébration de 50 ans d'excellence",
    text: "À l'occasion de nos 50 ans d'excellence, nous célébrons un demi-siècle de réussite et de dévouement. Aujourd'hui, près de 800 élèves fréquentent l'École Sourp Hagop, de la maternelle à la 5e secondaire, où ils bénéficient d'une éducation de haute qualité en français, en arménien et en anglais.",
    img: "/images/history/50th.png",
  },
];

export default function Historique() {
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
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Header imageSrc="../images/school.svg" headerText="NOTRE HISTOIRE" headerTextTop="3%"/>
      <div style={{ position: "relative", marginBottom: "20rem" }}>
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

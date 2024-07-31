"use client";

import Header from "@/components/ui/Header";
import styled from "@emotion/styled";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const BackgroundImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  padding-top: 2000px;
`;

const BackgroundImage = styled.img`
  width: 45%;
  height: auto;
  object-fit: cover;
  opacity: 0.1;
  padding-left: 100px;
`;

const ProgressBarContainer = styled(motion.div)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: calc(150vh - 80px);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #007bff;
  border-radius: 5px;
  transform-origin: top;
`;

export default function History() {
    const { scrollY, scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
      stiffness: 500,
      damping: 80,
      restDelta: 0.001
    });

    const ref = useRef(null);
    const [elementTop, setElementTop] = useState(0);

    useEffect(() => {
      if (ref.current) {
        setElementTop(ref.current.offsetTop);
      }
    }, []);

    const y = useTransform(
      scrollY,
      [elementTop, elementTop + 1],
      [0, 1],
      { clamp: false }
    );

    const scaledProgress = useTransform(scaleY, value => value * 1.5); // Adjust this factor to cover a larger distance

    return (
      <>
        <Header imageSrc="../images/school.svg" headerText="NOTRE HISTOIRE" />
        <div style={{ height: "80px" }} /> {/* Spacer to position progress bar below header */}
        <ProgressBarContainer
          ref={ref}
          style={{
            position: y.get() > 1 ? "fixed" : "absolute",
            top: y.get() > 1 ? "0px" : "auto"
          }}
        >
        <ProgressBar style={{ scaleY: scaledProgress }} /> {/* Scale the progress bar by a factor */}
        </ProgressBarContainer>
        <BackgroundImageContainer>
          <BackgroundImage src="../images/logo-big.svg" />
        </BackgroundImageContainer>
      <div style={{ height: "300vh" }}>
        <p>
          Here are the key changes and explanations:
          Replaced LineContainer and FillLine with ProgressBarContainer and ProgressBar.
          Positioned the progress bar in the center of the screen using top: 50%, left: 50%, and transform: translate(-50%, -50%).
          Set the height of the progress bar to 50vh (half of the viewport height) to make it more visible.
          Used transformOrigin: "bottom" to make the progress bar grow from bottom to top.
          Applied border-radius to both the container and the progress bar for a smoother look.
          Added a placeholder div with height: "300vh" to make the page scrollable. Replace this with your actual content.
          This implementation creates a vertical progress bar in the middle of the screen that grows from bottom to top as you scroll down the page. The progress bar uses Framer Motion's useScroll and useSpring hooks for smooth animation.
          Remember to replace the placeholder content with your actual scrollable content to see the progress bar in action.
        </p>
      </div>
    </>
  );
}

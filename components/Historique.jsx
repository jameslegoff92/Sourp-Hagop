"use client";

import { useRef } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import styled from "@emotion/styled";
import Typography from "../components/display/Typography";
import { motion, useScroll, useSpring } from "framer-motion";
import Brightness1Icon from "@mui/icons-material/Brightness1";

// --- Styled Components ---

const Text = styled.p`
  color: var(--black);
  font-family: var(--primary-ff), sans-serif;
  font-size: 1.1rem; /* Slightly larger for better readability */
  font-weight: 300;
  line-height: 1.7;
`;

const MediaRow = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 3rem; /* Increased gap for Japandi breathing room */
  margin-top: 2rem;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row; 
    align-items: flex-start;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 100%;
  @media (min-width: 1024px) {
    max-width: 45%; 
  }
`;

const DescriptionContainer = styled.div`
  flex: 1.5;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
`;

export default function Historique({ historyData }) {
  const timelineEvents = historyData?.timelineEvents || [];
  const pageHeader = historyData?.pageHeader || {};
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (!timelineEvents.length) return null;

  return (
    <>
      <Header 
        imageSrc={pageHeader.headerImageUrl || "../images/school.svg"} 
        headerText={pageHeader.headerText || "NOTRE HISTOIRE"} 
      />

      {/* Increased max-width and horizontal padding (px-12 to px-24 on desktop) */}
      <div ref={containerRef} className="relative max-w-[1400px] mx-auto px-8 md:px-24 py-32">
        
        {/* Sticky Progress Line - Adjusted to match padding */}
        <div className="absolute left-8 md:left-24 top-32 bottom-32 w-[4px] bg-black/5 rounded-full" />
        
        <div className="absolute left-8 md:left-24 top-32 bottom-32 w-[4px] z-0">
          <motion.div 
            className="w-full bg-[#007DC3] origin-top rounded-full" 
            style={{ scaleY, height: '100%' }} 
          />
        </div>

        {/* Events List */}
        <div className="relative z-2 space-y-48"> {/* More vertical space between events */}
          {timelineEvents.map((event, index) => (
            <div key={event._id || index} className="relative flex items-start">
              
              {/* The Dot */}
              <div className="absolute left-0 transform -translate-x-1/2 z-2 top-0">
                <div className="w-14 h-14 bg-white rounded-full border-4 border-[#007DC3] flex items-center justify-center shadow-xl">
                  <Brightness1Icon style={{ color: "#007DC3", fontSize: 24 }} />
                </div>
              </div>

              {/* Increased left padding to push content away from the line */}
              <div className="pl-16 md:pl-28 w-full">
                
                <span className="text-[#007DC3] font-bold text-3xl block mb-3">
                  {event.date}
                </span>

                <Typography as="h3" type="h3" color="primary">
                  {event.title}
                </Typography>

                <MediaRow>
                  {event.imageUrl && (
                    <ImageContainer>
                      <Img src={event.imageUrl} alt={event.title} />
                    </ImageContainer>
                  )}
                  <DescriptionContainer>
                    <Text>{event.description}</Text>
                  </DescriptionContainer>
                </MediaRow>

              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
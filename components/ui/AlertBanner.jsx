"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSnowflake, FaExclamationTriangle, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

const SnowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"><path strokeLinecap="round" d="m21 14.25l-.831-.659c-.946-.75-1.419-1.125-1.419-1.591s.473-.841 1.419-1.591L21 9.75m-18 0l.831.659c.946.75 1.419 1.125 1.419 1.591s-.473.841-1.419 1.591L3 14.25M14.572 21l.156-1.059c.178-1.205.267-1.807.674-2.042c.407-.236.972-.011 2.104.437l.994.394M9.428 3l-.156 1.059c-.178 1.205-.267 1.807-.674 2.042c-.407.236-.972.011-2.104-.437L5.5 5.27M5 18.732l1.07-.395c1.218-.448 1.827-.672 2.265-.438s.533.838.724 2.042L9.227 21M19 5.268l-1.07.394c-1.218.45-1.828.673-2.265.439s-.533-.838-.724-2.042L14.773 3"/><path d="M19 12H5m10.5 6l-7-12m7 0l-7 12"/></g></svg>
);

const EmergencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 19H4v2h16zM13 6V3h-2v3zm6 5v2h3v-2zM5 13v-2H2v2zm12.66-5.24l1.06-1.06l1.06-1.06l-.71-.71l-.71-.71l-1.06 1.06l-1.06 1.06l.71.71zm-11.32 0l.71-.71l.71-.71L6.7 5.28L5.64 4.22l-.71.71l-.71.71L5.28 6.7zM7 18h10v-5c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/></svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>
);

const EventIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.725 17.275Q12 16.55 12 15.5t.725-1.775T14.5 13t1.775.725T17 15.5t-.725 1.775T14.5 18t-1.775-.725M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"/></svg>
);

const bannerStyles = {
  snow: {
    background: "linear-gradient(#f87171 100%)",
    icon: SnowIcon,
  },
  emergency: {
    background: "linear-gradient(#f87171 100%)",
    icon: EmergencyIcon,
  },
  info: {
    background: "linear-gradient(#f87171 100%)",
    icon: InfoIcon,
  },
  event: {
    background: "linear-gradient(#f87171 100%)",
    icon: EventIcon,
  },
};

const BannerWrapper = styled(motion.div)`
  width: 100%;
  background: ${({ type }) => bannerStyles[type]?.background || bannerStyles.info.background};
  color: white;
  position: relative;
  z-index: 1000;
`;

const BannerContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.875rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  animation: ${({ type }) => type === 'snow' ? 'pulse 2s ease-in-out infinite' : 'none'};

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
  }
`;

const TextContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Message = styled.span`
  font-size: 0.9rem;
  opacity: 0.95;
`;

const BannerLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    right: 0.5rem;
  }
`;

const AlertBanner = ({ data }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

useEffect(() => {
    if (!data) {
      console.log("No data");
      return;
    }

    const dismissed = sessionStorage.getItem('alertBannerDismissed');
    console.log("dismissed:", dismissed, "| data.title:", data.title);

    const now = new Date();
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;
    console.log("now:", now, "| startDate:", startDate, "| endDate:", endDate);

    if (startDate && now < startDate) { console.log("blocked by startDate"); return; }
    if (endDate && now > endDate) { console.log("blocked by endDate"); return; }

    setShouldShow(true);
}, [data]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('alertBannerDismissed', data.title);
  };

  if (!data || !shouldShow || !isVisible) return null;

  const IconComponent = bannerStyles[data.type]?.icon || FaInfoCircle;

  return (
    <AnimatePresence>
      <BannerWrapper
        type={data.type}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <BannerContent>
          <IconWrapper type={data.type}>
            <IconComponent />
          </IconWrapper>

          <TextContent>
            <Title>{data.title}</Title>
            {data.message && <Message>{data.message}</Message>}
            {data.link?.url && (
              <BannerLink href={data.link.url} target="_blank" rel="noopener noreferrer">
                {data.link.text || "En savoir plus"} →
              </BannerLink>
            )}
          </TextContent>

          <CloseButton onClick={handleClose}>
            <FaTimes size={12} />
          </CloseButton>
        </BannerContent>
      </BannerWrapper>
    </AnimatePresence>
  );
};

export default AlertBanner;
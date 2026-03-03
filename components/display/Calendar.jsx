"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Third Party Imports
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

// Local Imports
import Typography from "./Typography";
import Container from "../layout/Container";

// Utility Imports
import { generateDateArrays, toISO8601, getDay } from "../../js/date";

const Section = styled.section`
  background-color: var(--secondary-color);
  padding: 4rem 0 5rem;
  position: relative;

  @media (min-width: 768px) {
    padding: 5rem 0 6rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const SectionSubtitle = styled.span`
  display: inline-block;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #007dc3;
  margin-bottom: 0.75rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: #007dc3;
  }
`;

const SectionTitle = styled(Typography)`
  margin-top: 1.5rem;
`;

const CalendarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid rgba(0, 96, 150, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #006096;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background: #006096;
    color: #fff;
    border-color: #006096;
  }

  @media (min-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

const CalendarGrid = styled(motion.div)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 1.25rem;
  }
`;

const DayCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem 0.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(0, 96, 150, 0.08);
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 96, 150, 0.12);
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 1.5rem 1rem 1.75rem;
  }
`;

const TodayIndicator = styled.div`
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 3px;
  background: #007dc3;
  border-radius: 0 0 3px 3px;
`;

const DayName = styled.span`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0, 96, 150, 0.5);
  margin-bottom: 0.5rem;
`;

const DayNumber = styled.span`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #006096;
  line-height: 1;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const DayMonth = styled.span`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.75rem;
  color: #007dc3;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  width: 30px;
  height: 1px;
  background: rgba(0, 96, 150, 0.15);
  margin-bottom: 1rem;
`;

const EventTitle = styled(Link)`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.8rem;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;

  &:hover {
    color: #007dc3;
  }
`;

const NoEvent = styled.span`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.8rem;
  color: #aaa;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: ${(props) => (props.active ? "#007dc3" : "rgba(0, 96, 150, 0.2)")};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#007dc3" : "rgba(0, 96, 150, 0.4)")};
  }
`;

const FooterArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const ViewAllLink = styled(Link)`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #006096;
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: #006096;
    transition: transform 0.3s ease;
    transform-origin: right;
  }

  &:hover::after {
    transform: scaleX(0);
    transform-origin: left;
  }
`;

// French data
const FRENCH_MONTHS = {
  jan: "janvier",
  feb: "février",
  mar: "mars",
  apr: "avril",
  may: "mai",
  jun: "juin",
  jul: "juillet",
  aug: "août",
  sep: "septembre",
  oct: "octobre",
  nov: "novembre",
  dec: "décembre",
};

const FRENCH_DAYS = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

const getFrenchMonth = (englishMonth) => {
  const monthKey = englishMonth?.toLowerCase().slice(0, 3);
  return FRENCH_MONTHS[monthKey] || englishMonth;
};

const getFrenchDay = (day, month, year) => {
  const date = new Date(`${month} ${day}, ${year}`);
  return FRENCH_DAYS[date.getDay()];
};

const isToday = (day, month, year) => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleDateString("en-US", { month: "short" }).toLowerCase();
  const currentYear = today.getFullYear();

  return (
    day === currentDay &&
    month?.toLowerCase().slice(0, 3) === currentMonth.slice(0, 3) &&
    year === currentYear
  );
};

// Animation
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const MiniCalendar = () => {
  const [dateArrays, setDateArrays] = useState([[]]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [googleEvents, setGoogleEvents] = useState([]);

  const { data, status } = useSession();

  const handlePrev = () => setCurrentWeek((prev) => (prev === 0 ? 2 : prev - 1));
  const handleNext = () => setCurrentWeek((prev) => (prev === 2 ? 0 : prev + 1));

  useEffect(() => {
    setDateArrays(generateDateArrays());
  }, []);

  useEffect(() => {
    if (data) setAuthToken(data.accessToken);
  }, [data]);

  useEffect(() => {
    const fetchGoogleData = async (authToken) => {
      const timeMin = encodeURIComponent(toISO8601(dateArrays[0][0]));
      const timeMax = encodeURIComponent(toISO8601(dateArrays[2][4]));
      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMax=${timeMax}&timeMin=${timeMin}`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        });
        if (!response.ok) throw new Error();
        const data = await response.json();

        const events = data.items
          .map((event) => ({
            title: event.description || "",
            start: event.start.dateTime || event.start.date,
          }))
          .sort((a, b) => new Date(a.start) - new Date(b.start));

        setGoogleEvents(events);
      } catch (error) {
        return [];
      }
    };

    if (status === "authenticated" && authToken) {
      fetchGoogleData(authToken);
    }
  }, [authToken, dateArrays, status]);

  useEffect(() => {
    setDateArrays((prev) =>
      prev.map((week) =>
        week.map((date) => {
          const event = googleEvents.find((e) => date.day == getDay(e.start));
          return event ? { ...date, title: event.title } : date;
        })
      )
    );
  }, [googleEvents]);

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionSubtitle>Événements à venir</SectionSubtitle>
          <SectionTitle as="h2" type="h2" color="primary">
            CALENDRIER
          </SectionTitle>
        </SectionHeader>

        <CalendarWrapper>
          <NavButton onClick={handlePrev}>
            <ChevronLeft size={20} />
          </NavButton>

          <AnimatePresence mode="wait">
            <CalendarGrid
              key={currentWeek}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {dateArrays[currentWeek]?.map((date, index) => {
                const isTodayDate = isToday(date.day, date.month, date.year);
                return (
                  <DayCard key={`${currentWeek}-${index}`} variants={cardVariants}>
                    {isTodayDate && <TodayIndicator />}
                    <DayName>{getFrenchDay(date.day, date.month, date.year)}</DayName>
                    <DayNumber>{date.day}</DayNumber>
                    <DayMonth>{getFrenchMonth(date.month)}</DayMonth>
                    <Divider />
                    {date.title ? (
                      <EventTitle href="/calendrier">{date.title}</EventTitle>
                    ) : (
                      <NoEvent>—</NoEvent>
                    )}
                  </DayCard>
                );
              })}
            </CalendarGrid>
          </AnimatePresence>

          <NavButton onClick={handleNext}>
            <ChevronRight size={20} />
          </NavButton>
        </CalendarWrapper>

        <DotsContainer>
          {[0, 1, 2].map((i) => (
            <Dot key={i} active={currentWeek === i} onClick={() => setCurrentWeek(i)} />
          ))}
        </DotsContainer>

        <FooterArea>
          <ViewAllLink href="/calendrier">Voir le calendrier complet</ViewAllLink>
        </FooterArea>
      </Container>
    </Section>
  );
};

export default MiniCalendar;
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

//Third Party Imports
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

//Local Imports
import Typography from "./Typography";

//Utiliy Imports
import { generateDateArrays, toISO8601, getDay } from "../../js/date";

//CSSinJS
//Day Component CSS
const EventTitle = styled(Link)`
  display: -webkit-box;
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

//Mini Calendar Component CSS
const CSSChevronLeft = styled(ChevronLeft)`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

const CSSChevronRight = styled(ChevronRight)`
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

const Section = styled.section`
  background-color: var(--secondary-color);
  color: #006096;
  padding: 3rem 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  max-width: 1300px;
  width: 100%;
  text-align: center;
  padding: 0 1.5rem;
`;

const SubContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const CSSCalendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;

  @media (min-width: 999px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;

const DateWrapper = styled(motion.div)`
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  justify-content: center;
  width: 100px;

  :nth-of-type(3) {
    margin-top: 50px;
  }

  @media (min-width: 999px) {
    width: 150px;
    border-bottom: none;
    margin-top: 0;
    margin-bottom: 0;

    :nth-of-type(3) {
      margin-top: 0;
    }
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const OpenCalendar = styled(Link)``;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  position: none;
  

  @media (min-width: 600px) {
    margin-top: 0;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

// French month names (full names)
const FRENCH_MONTHS = {
  'jan': 'janvier',
  'feb': 'février', 
  'mar': 'mars',
  'apr': 'avril',
  'may': 'mai',
  'jun': 'juin',
  'jul': 'juillet',
  'aug': 'août',
  'sep': 'septembre',
  'oct': 'octobre',
  'nov': 'novembre',
  'dec': 'décembre'
};

// Helper function to convert month to French
const getFrenchMonth = (englishMonth) => {
  const monthKey = englishMonth?.toLowerCase().slice(0, 3);
  return FRENCH_MONTHS[monthKey] || englishMonth;
};

// Helper function to check if a date is today
const isToday = (day, month, year) => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleDateString('en-US', { month: 'short' }).toLowerCase();
  const currentYear = today.getFullYear();
  
  return (
    day === currentDay && 
    month?.toLowerCase().slice(0, 3) === currentMonth.slice(0, 3) &&
    year === currentYear
  );
};

//Day Component
const Day = ({ day, month, year, title, isActive }) => {
  const isTodayDate = isToday(day, month, year);
  
  return (
    <DayWrapper className={`${isActive ? "relative" : ""}`}>
      <span className="text-md uppercase mb-1">{getFrenchMonth(month)}</span>
      <span className="text-4xl font-bold mb-1">{day}</span>
      <EventTitle href="/calendrier" className="text-center">
        {title}
      </EventTitle>

      {isTodayDate && (
        <div className="absolute top-[-16px] w-2 h-2 bg-white rounded-full" />
      )}
    </DayWrapper>
  );
};

//Mini Calendar Component
const MiniCalendar = () => {
  const [dateArrays, setDateArrays] = useState([[]]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [googleEvents, setGoogleEvents] = useState([]);

  //How to acquire the session object. This is an asynchronous operation.
  const { data, status } = useSession();

  const handleChevronLeft = () => {
    setCurrentWeek((prev) => {
      if (prev === 0) return 2;
      return prev - 1;
    });
  };

  const handleChevronRight = () => {
    setCurrentWeek((prev) => {
      if (prev === 2) return 0;
      return prev + 1;
    });
  };

  useEffect(() => {
    // Generate the date arrays
    const dateArrays = generateDateArrays();
    setDateArrays(dateArrays);
  }, []);

  useEffect(() => {
    if (data) {
      const token = data.accessToken;
      setAuthToken(token);
    }
  }, [data]);

  useEffect(() => {
  })
  
  useEffect(() => {
    console.log("The calendar component useEffect is running: ")
    const fetchGoogleData = async (authToken) => {
      const timeMin = encodeURIComponent(toISO8601(dateArrays[0][0]));
      const timeMax = encodeURIComponent(toISO8601(dateArrays[2][4]));
      console.log("timeMin & timeMax: ", timeMin, timeMax);
      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMax=${timeMax}&timeMin=${timeMin}`;
      const headers = {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      };

      try {
        // Make the fetch request
        const response = await fetch(url, {
          headers,
        });

        // Check if the response is not OK (status code outside 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data
        const data = await response.json();
        console.log("Data: ", data.items);

        // Map through the events to create a new array with desired fields
        const events = data.items
          .map((event) => {
            return {
              title: event.description || "",
              location: event.location || "",
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
              details: event.summary || "",
            }; //Sorts the new array by start date
          })
          .sort((a, b) => {
            return new Date(a.start) - new Date(b.start);
          });

        return setGoogleEvents(events);
      } catch (error) {
        // Handle errors
        console.error("Failed to fetch events:", error.message);
        return []; // Return an empty array or handle as needed
      }
    };

    if (
      status === "unauthenticated" ||
      status === undefined ||
      status === "loading"
    )
      return;

    if (!authToken) return;

    if (authToken) {
      fetchGoogleData(authToken);
    }
  }, [authToken]);

  useEffect(() => {
    setDateArrays((prevState) => {
      return prevState.map((week) => {
        return week.map((date) => {
          for (let i = 0; i < googleEvents.length; i++) {
            console.log("google events: ,", getDay(googleEvents[i].start));
            if (date.day == getDay(googleEvents[i].start)) {
              console.log("Matched");
              return {
                ...date,
                title: googleEvents[i].title,
              };
            }
          }
          return date;
        });
      });
    });
  }, [googleEvents]);

  return (
    <Section>
      <Container>
        <Typography as="h1" type="h2" style={{ color: '#006096' }}>
          CALENDRIER
        </Typography>
        <SubContainer>
          <CSSChevronLeft onClick={handleChevronLeft} />
          <CSSCalendar>
            {dateArrays.length > 0 ? (
              dateArrays[currentWeek].map((date, index) => (
                <DateWrapper
                  key={`${currentWeek} - ${index}}`}
                  initial={{ x: "-100vw" }} // Start off-screen to the left
                  animate={{ x: 0 }} // Slide to the final position
                  transition={{ duration: 0.5, ease: "easeInOut" }} // Stagger the animations
                >
                  <Day
                    day={date.day}
                    month={date.month}
                    year={date.year}
                    title={date.title}
                    isActive={index}
                  />
                </DateWrapper>
              ))
            ) : (
              <h1> loading </h1>
            )}
          </CSSCalendar>
          <CSSChevronRight onClick={handleChevronRight} />
        </SubContainer>
        <div className="flex flex-col items-center relative">
          <Icons>
            <div
              className={`w-3 h-3 ${currentWeek == 0 ? "" : "opacity-30"} rounded-full`}
              style={{ backgroundColor: '#006096' }}>
            </div>
            <div
              className={`w-3 h-3 ${currentWeek == 1 ? "" : "opacity-30"} rounded-full`}
              style={{ backgroundColor: '#006096' }}>
            </div>
            <div
              className={`w-3 h-3 ${currentWeek == 2 ? "" : "opacity-30"} rounded-full`}
              style={{ backgroundColor: '#006096' }}>
            </div>
          </Icons>
          <ButtonWrapper className="h-full flex items-center">
            <OpenCalendar
              href="/calendrier"
              className="text-sm uppercase border-b border-[#006096] pb-1 hover:opacity-80 transition-opacity"
            >
              Visualiser le calendrier
            </OpenCalendar>
          </ButtonWrapper>
        </div>
      </Container>
    </Section>
  );
};

export default MiniCalendar;
"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";

//Third Party Imports
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

//Local Imports
import Typography from "./Typography";

//Utiliy Imports
import { generateDateArrays, toISO8601, getDay } from "@/utils/date";

//CSSinJS
const Section = styled.section`
  background-color: #006096;
  color: white;
  padding: 3rem 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  text-align: center;
  padding: 0 1.5rem;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CSSCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const ButtonWrapper = styled.div``;

//Date Component
const Day = ({ day, month, title, isActive }) => (
  <div className={`flex flex-col items-center ${isActive ? "relative" : ""}`}>
    <span className="text-xs uppercase mb-1">{month}</span>
    <span className="text-4xl font-bold mb-1">{day}</span>
    {event && (
      <span className="text-[10px] text-center max-w-[100px] leading-tight">
        {title}
      </span>
    )}
    {isActive && (
      <div className="absolute top-[-16px] left-[70px] w-2 h-2 bg-white rounded-full" />
    )}
  </div>
);

//Mini Calendar Component
const MiniCalendar = () => {
  const [dateArrays, setDateArrays] = useState([[]]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [authToken, setAuthToken] = useState("");
  const [googleEvents, setGoogleEvents] = useState([]);
  console.log("dateArrays: ", dateArrays);  

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
              title: event.description || "No title posted",
              location: event.location || "No location posted",
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
              details: event.summary || "No details posted",
            }; //Sorts the new array by start date
          })
          .sort((a, b) => {
            return new Date(a.start) - new Date(b.start);
          });

        console.log("Events: ", events);
        console.log("Date Arrays: ", dateArrays);

        console.log("Updated Date Arrays: ", dateArrays);

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
            if(date.day == getDay(googleEvents[i].start)) {
              console.log("Matched");
              return {
                ...date,
                title: googleEvents[i].title
              }
            }
          }
          return date
        })
      })
    });
;
  }, [googleEvents]);

  return (
    <Section>
      <Container>
        <Typography as="h1" type="h2" color="light">
          CALENDRIER
        </Typography>
        <SubContainer>
          <ChevronLeft
            onClick={handleChevronLeft}
            className="w-8 h-8 cursor-pointer"
          />
          <CSSCalendar>
            {dateArrays.length > 0 ? (
              dateArrays[currentWeek].map((date, index) => (
                <DateWrapper
                  key={`${currentWeek} - ${index}}`}
                  initial={{ x: "-100vw" }} // Start off-screen to the left
                  animate={{ x: 0 }} // Slide to the final position
                  transition={{ duration: 0.5, ease: "easeInOut" }} // Stagger the animations
                >
                  <Day day={date.day} month={date.month} title={date.title} />
                </DateWrapper>
              ))
            ) : (
              <h1> loading </h1>
            )}
          </CSSCalendar>
          <ChevronRight
            onClick={handleChevronRight}
            className="w-8 h-8 cursor-pointer"
          />
        </SubContainer>
        <div className="flex flex-col items-center relative">
          <Icons>
            <div
              className={`w-3 h-3 bg-white ${currentWeek == 0 ? "" : "opacity-50"} rounded-full`}
            ></div>
            <div
              className={`w-3 h-3 bg-white ${currentWeek == 1 ? "" : "opacity-50"} rounded-full`}
            ></div>
            <div
              className={`w-3 h-3 bg-white ${currentWeek == 2 ? "" : "opacity-50"} rounded-full`}
            ></div>
          </Icons>
          <ButtonWrapper className="absolute top-0 right-0 h-full flex items-center">
            <Link
              href="/calendrier"
              className="text-sm uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity"
            >
              Visualiser le calendrier
            </Link>
          </ButtonWrapper>
        </div>
      </Container>
    </Section>
  );
};

export default MiniCalendar;

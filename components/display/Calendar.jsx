"use client";
import { useState, useEffect} from "react";

//Third Party Imports
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "@emotion/styled";

//Local Imports
import Typography from "./Typography";

//CSS for the Mini Calendar Component
const Section = styled.section`
  background-color: #006096;
  color: white;
  padding: 3rem 1.5rem;
`;

const Container = styled.div`
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
  margin-top: 3.75rem;
  margin-bottom: 0.5rem;
`;

const CSSCalendar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateWrapper = styled.div`
  display: flex;
`;

//Date Component
const Day = ({ day, month, event, isActive }) => (
  <div className={`flex flex-col items-center ${isActive ? "relative" : ""}`}>
    <span className="text-xs uppercase mb-1">{month}</span>
    <span className="text-4xl font-bold mb-1">{day}</span>
    {event && (
      <span className="text-[10px] text-center max-w-[100px] leading-tight">
        {event}
      </span>
    )}
    {isActive && (
      <div className="absolute top-[-16px] left-[70px] w-2 h-2 bg-white rounded-full" />
    )}
  </div>
);

//Mini Calendar Component
const MiniCalendar = () => {
  const [dateArrays, setDateArrays] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);


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
    //Helper Functions
    function generateDateArrays() {
      const today = new Date();
      const dates = [[], [], []]; // Step 1: Initialize the array with 3 nested arrays

      // Define an array of month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Function to add days to the date and store in the appropriate nested array
      function addDateToNestedArray(index, offset) {
        const adjustedDate = new Date(today);
        adjustedDate.setDate(today.getDate() + offset);

        const day = adjustedDate.getDate();
        const monthName = monthNames[adjustedDate.getMonth()];
        const year = adjustedDate.getFullYear();

        dates[index].push({ day, month: monthName, year });
      }

      // Fill the first 5 days
      for (let i = 0; i < 5; i++) {
        addDateToNestedArray(0, i);
      }

      // Fill the next 5 days
      for (let i = 0; i < 5; i++) {
        addDateToNestedArray(1, 5 + i);
      }

      // Fill the last 5 days
      for (let i = 0; i < 5; i++) {
        addDateToNestedArray(2, 10 + i);
      }

      return dates;
    }

    // Generate the date arrays
    const dateArrays = generateDateArrays();
    setDateArrays(dateArrays);
  }, []);

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
                <DateWrapper key={index}>
                  <Day day={date.day} month={date.month} />
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
        <div className="relative flex flex-col items-center">
          <div className="flex justify-center space-x-3 mb-8">
            <div
              className={`w-3 h-3 bg-white ${currentWeek == 0 ? "" : 'opacity-50'} rounded-full`}
            ></div>
            <div
              className={`w-3 h-3 bg-white ${currentWeek == 1 ? "" : 'opacity-50'} rounded-full`}
            ></div>
            <div
              className={`w-3 h-3 bg-white ${currentWeek == 2 ? "" : 'opacity-50'} rounded-full`}
            ></div>
          </div>
          <div className="absolute top-0 right-0 h-full flex items-center">
            <button className="text-sm uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity">
              Visualiser le calendrier
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default MiniCalendar;

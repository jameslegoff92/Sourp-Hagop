import { useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Typography from "@/components/display/Typography";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Data Structure for the Weeks
const titles = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const weeks = [
    {
        id: 1,
        circles: [
            { description: "Description for Circle 1" },
            { description: "Description for Circle 2" },
            { description: "Description for Circle 3" },
            { description: "Description for Circle 4" },
            { description: "Description for Circle 5" },
        ],
    },
    {
        id: 2,
        circles: [
            { description: "Description for Circle A" },
            { description: "Description for Circle B" },
            { description: "Description for Circle C" },
            { description: "Description for Circle D" },
            { description: "Description for Circle E" },
        ],
    },
    {
        id: 3,
        circles: [
            { description: "Description for Circle X" },
            { description: "Description for Circle Y" },
            { description: "Description for Circle Z" },
            { description: "Description for Circle W" },
            { description: "Description for Circle V" },
        ],
    },
    {
        id: 4,
        circles: [
            { description: "Description for Circle L" },
            { description: "Description for Circle M" },
            { description: "Description for Circle N" },
            { description: "Description for Circle O" },
            { description: "Description for Circle P" },
        ],
    },
];

// CSS for the Main Background Container
const BackgroundContainer = styled.div`
  background-color: var(--secondary-color); /* Pale blue background */
  padding: 40px 40px 100px;
  margin-top: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// CSS for the Week List Container
const WeekListContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// CSS for Each Week Item
const WeekItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  font-size: clamp(1rem, 4.3vw, 2rem);
  color: var(--primary-color);
  font-weight: 500;
  color: black;
  padding: 10px;
  border-radius: 5px;
  margin: 0 10px;
`;

// CSS for the Chevron Buttons
const ChevronButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  cursor: pointer;
`;

// CSS for Circles
const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 7%;
`;

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
`;

const CircleItem = styled(motion.div)`
  background-color: var(--primary-color);
  color: white;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Needed for image positioning */

  @media (max-width: 768px) {
    width: 20vw;
    height: 20vw;
  }

  @media (max-width: 480px) {
    width: 30vw;
    height: 30vw;
  }
`;

const CircleImage = styled.img`
  width: 80%;
  height: 80%;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  object-position: 55% 90%;
`;

const CircleDescription = styled(Typography)`
  font-size: 0.7rem;
  text-align: center;
  margin-top: 10px;
`;

const DaysContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  gap: 23%;
`;

const DayItem = styled(Typography)`
  width: 10vw; // Same as CircleItem for consistency
  text-align: center;
  font-size: calc(1vw + 0.5rem); // Responsive font size
  font-weight: 500;
  display: flex; // Make it flex to align content similarly to CircleItem
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 20vw; // Adjust for tablets
  }

  @media (max-width: 480px) {
    width: 30vw; // Adjust for mobile
  }
`;

const CirclesAndDaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 150 : -150,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction > 0 ? -150 : 150,
        opacity: 0,
    }),
};

const Menu = () => {
    const [currentWeek, setCurrentWeek] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setCurrentWeek((prev) => (prev === weeks.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentWeek((prev) => (prev === 0 ? weeks.length - 1 : prev - 1));
    };

    return (
        <BackgroundContainer>
            <Typography as="h4" type="h4" color="primary">
                Semaine
            </Typography>

            <WeekListContainer>
                <ChevronButton onClick={handlePrev}>
                    <FaChevronLeft />
                </ChevronButton>

                <WeekItem
                    key={weeks[currentWeek].id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    {weeks[currentWeek].id}
                </WeekItem>

                <ChevronButton onClick={handleNext}>
                    <FaChevronRight />
                </ChevronButton>
            </WeekListContainer>

            {/* Static Days of the Week */}
            <CirclesAndDaysContainer>
                <DaysContainer>
                    {titles.map((day) => (
                        <DayItem key={day} as="p">
                            {day}
                        </DayItem>
                    ))}
                </DaysContainer>

                {/* Circle Container */}
                <CircleContainer key={currentWeek}>
                    {weeks[currentWeek].circles.map((circle, index) => (
                        <CircleWrapper key={index}>
                            <CircleItem
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <CircleImage src="../images/menu/fish-menu.jpg" alt="fish" />
                            </CircleItem>
                            <CircleDescription as="p">{circle.description}</CircleDescription>
                        </CircleWrapper>
                    ))}
                </CircleContainer>
            </CirclesAndDaysContainer>
        </BackgroundContainer >
    );
};

export default Menu;

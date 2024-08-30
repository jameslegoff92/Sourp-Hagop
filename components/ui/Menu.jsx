import { useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Typography from "@/components/display/Typography";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Data Structure for the Weeks
const titles = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const primaireWeeks = [
  {
    id: 1,
    circles: [
      { description: "Lentilles au blé concassé avec salade" },
      { description: "Filet de sole sauce poivron rouge, légumes variés et riz." },
      { description: "Penne sauce tomate avec salade verte" },
      { description: "Souvlaki au poulet avec tzatziki, riz et légumes" },
      { description: "Soupe aux lentilles avec pain au fromage" },
    ],
  },
  {
    id: 2,
    circles: [
      { description: "Pain de viande macaroni avec salade" },
      { description: "Spaghetti bolognaise avec légumes" },
      { description: "Haricots blanc et riz avec salade" },
      { description: "Macaroni et fromage avec salade" },
      { description: "Hamburger avec salade de choux" },
    ],
  },
  {
    id: 3,
    circles: [
      { description: "Poulet pilaf au blé concassé avec salade" },
      { description: "Haricots verts avec viande hachée et riz" },
      { description: "Rotini sauce à la viande avec salade" },
      { description: "Saumon avec sauce aux herbes avec riz et légumes" },
      { description: "Boulettes de viande et patate purée avec légumes" },
    ],
  },
  {
    id: 4,
    circles: [
      { description: "poulet et riz mexicain avec légumes" },
      { description: "Macaroni sauce rosée avec salade" },
      { description: "Pâté chinois avec salade" },
      { description: "Macédoine carotte et pois verts avec riz" },
      { description: "Burger de poitrine de poulet avec salade" },
    ],
  },
];

const weeks = [
  {
    id: 1,
    circles: [
      { description: "Lentilles au blé concassé avec salade" },
      { description: "Filet de sole sauce poivron rouge, légumes variés et riz." },
      { description: "Penne sauce tomate avec salade verte" },
      { description: "Souvlaki au poulet avec tzatziki, riz et légumes" },
      { description: "Sous-marin avec salade de choux" },
    ],
  },
  {
    id: 2,
    circles: [
      { description: "Pain de viande macaroni avec salade" },
      { description: "Sandwich au jambon et fromage avec soupe" },
      { description: "Haricots blanc et riz avec salade" },
      { description: "Manicotti avec salade" },
      { description: "Hamburger avec salade de choux" },
    ],
  },
  {
    id: 3,
    circles: [
      { description: "Poulet pilaf au blé concassé avec salade" },
      { description: "Salade césar au poulet avec pain au fromage" },
      { description: "Rotini sauce à la viande avec salade" },
      { description: "Saumon avec sauce aux herbes avec riz et légumes" },
      { description: "Boulettes de viande et patate purée avec légumes" },
    ],
  },
  {
    id: 4,
    circles: [
      { description: "Fajita et riz mexicain avec légumes" },
      { description: "Tortellini sauce rosée avec salade" },
      { description: "Pâté chinois avec salade" },
      { description: "Crevette et légumes sauce teriyaki avec riz et salade" },
      { description: "Burger de poitrine de poulet avec salade" },
    ],
  },
];

// CSS for the Main Background Container
const BackgroundContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 40px 100px 0;
  margin-top: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:
  height: 100vh;
`;

// CSS for the Toggle Container
const ToggleContainer = styled.div`
  display: flex;
  border: 2px solid #006096;
  border-radius: 50px;
  overflow: hidden;
  width: 300px;
  margin-bottom: 60px;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  outline: none;
  background-color: ${({ active }) => (active ? "#006096" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "#006096")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

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
  color: var(--secondary-darkcolor);
  font-size: 1.5rem;
  cursor: pointer;
`;

// CSS for Circles
const CircleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10vw;


  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 35px;
    flex-direction: column;
  }
`;

const CircleItem = styled(motion.div)`
  background-color: var(--secondary-darkcolor);
  color: white;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: 50vw;
    height: 50vw;
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
  text-align: center;
  margin-top: 10px;
  width: 150%;

  @media (max-width: 1525px) {
    font-size: clamp(0.6rem, 0.9vw, 1rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 2.5vw, 2rem);
  }
`;


const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;

    @media (max-width: 768px) {
    display: none;
  }
`;

const DayItem = styled(Typography)`
  width: 10vw;
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;


  @media (max-width: 768px) {
    width: 20vw;
  }

  @media (max-width: 480px) {
    width: 30vw;
  }
`;

const DayItemMobile = styled(Typography)`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: center;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

const CirclesAndDaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const FooterText = styled(Typography)`
  margin-top: 60px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 500;
  font-style: italic;

  @media (max-width: 1525px) {
    font-size: clamp(0.6rem, 0.9vw, 1rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 2.5vw, 2rem);
    width: 120%;
  }
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
  const [menuType, setMenuType] = useState("secondary");

  const handleNext = () => {
    setDirection(1);
    setCurrentWeek((prev) => (prev === weeks.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentWeek((prev) => (prev === 0 ? weeks.length - 1 : prev - 1));
  };

  const getCurrentWeeks = () => {
    return menuType === "secondary" ? primaireWeeks : weeks;
  };

  return (
    <BackgroundContainer>
      {/* Toggle Button */}
      <ToggleContainer>
        <ToggleButton
          active={menuType === "secondary"}
          onClick={() => setMenuType("secondary")}
        >
          Primaire
        </ToggleButton>
        <ToggleButton
          active={menuType === "elementary"}
          onClick={() => setMenuType("elementary")}
        >
          Secondaire
        </ToggleButton>
      </ToggleContainer>

      <Typography as="h4" type="h4" color="seondaryDark">
        Semaine
      </Typography>

      <WeekListContainer>
        <ChevronButton onClick={handlePrev}>
          <FaChevronLeft />
        </ChevronButton>

        <WeekItem
          key={getCurrentWeeks()[currentWeek].id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {getCurrentWeeks()[currentWeek].id}
        </WeekItem>

        <ChevronButton onClick={handleNext}>
          <FaChevronRight />
        </ChevronButton>
      </WeekListContainer>

      {/* Static Days of the Week */}
      <CirclesAndDaysContainer>
        <DaysContainer>
          {titles.map((day) => (
            <DayItem key={day} as="p" type="h6">
              {day}
            </DayItem>
          ))}
        </DaysContainer>

        {/* Circle Container */}
        <CircleContainer key={currentWeek}>
          {getCurrentWeeks()[currentWeek].circles.map((circle, index) => (
            <CircleWrapper key={index}>
              <DayItemMobile as="p" type="p">{titles[index]}</DayItemMobile>
              <a href="../images/menu/fish-menu.jpg" target="_blank" rel="noopener noreferrer">

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
              </a>
              <CircleDescription as="p" type="label">{circle.description}</CircleDescription>
            </CircleWrapper>
          ))}
        </CircleContainer>
      </CirclesAndDaysContainer>

      {/* Conditional Footer Text */}
      <FooterText as="p" type="subtitle" color="seondaryDark">
        {menuType === "secondary"
          ? "* Avec chaque repas, un dessert est offert parmi le yogourt, la pomme, le jello, le pudding au chocolat ou la salade de fruits."
          : "* Avec chaque repas, un dessert est offert soit un biscuits au brisure du chocolat ou un gateaux."
        }
      </FooterText>
    </BackgroundContainer >
  );
};

export default Menu;

import { useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const titles = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

// --- DATA ---
const primaireWeeks = [
  {
    id: 1,
    circles: [
      { description: "Lentilles au blé concassé avec salade", image: "../images/menu/lentilles-ble-concasse.jpg" },
      { description: "Filet de sole sauce poivron rouge, légumes variés et riz.", image: "../images/menu/placeholder.svg" },
      { description: "Penne sauce tomate avec salade verte", image: "../images/menu/penne-sauce-tomate.jpg" },
      { description: "Souvlaki au poulet avec tzatziki, riz et légumes", image: "../images/menu/souvlaki-poulet.jpg" },
      { description: "Soupe aux lentilles avec pain au fromage", image: "../images/menu/soupe-lentilles-pain.jpg" },
    ],
  },
  {
    id: 2,
    circles: [
      { description: "Pain de viande macaroni avec légumes", image: "../images/menu/painviande-macaroni.jpg" },
      { description: "Spaghetti bolognaise avec légumes", image: "../images/menu/placeholder.svg" },
      { description: "Haricots blanc au blé concassé", image: "../images/menu/haricots-riz.jpg" },
      { description: "Macaroni sauce à la viande avec salade", image: "../images/menu/Untitled-1.png" },
      { description: "Hamburger avec salade de choux", image: "../images/menu/placeholder.svg" },
    ],
  },
  {
    id: 3,
    circles: [
      { description: "Poulet pilaf au blé concassé avec salade", image: "../images/menu/poulet-ble-concasse.jpg" },
      { description: "Haricots verts avec viande hachée et riz", image: "../images/menu/haricots-vert-viande.jpg" },
      { description: "Penne sauce à la viande avec salade", image: "../images/menu/rotini-sauce-viande.jpg" },
      { description: "Saumon avec sauce aux herbes avec riz et légumes", image: "../images/menu/saumon-sauce-herbes.jpg" },
      { description: "Boulettes de viande et patate purée avec légumes", image: "../images/menu/boulettes-viande-patate.jpg" },
    ],
  },
  {
    id: 4,
    circles: [
      { description: "Poulet et riz mexicain avec légumes", image: "../images/menu/poulet-riz-mexicain.jpg" },
      { description: "Macaroni sauce rosée avec salade", image: "../images/menu/placeholder.svg" },
      { description: "Pâté chinois avec salade", image: "../images/menu/placeholder.svg" },
      { description: "Macédoine carotte et pois verts avec riz", image: "../images/menu/macedoine-riz.jpg" },
      { description: "Burger de poitrine de poulet avec salade", image: "../images/menu/burger-poulet.jpg" },
    ],
  },
];

const weeks = [
  {
    id: 1,
    circles: [
      { description: "Lentilles au blé concassé avec salade", image: "../images/menu/lentilles-ble-concasse.jpg" },
      { description: "Filet de sole sauce poivron rouge, légumes variés et riz.", image: "../images/menu/placeholder.svg" },
      { description: "Penne sauce tomate avec salade verte", image: "../images/menu/penne-sauce-tomate.jpg" },
      { description: "Souvlaki au poulet avec tzatziki, riz et légumes", image: "../images/menu/souvlaki-poulet.jpg" },
      { description: "Sous-marin avec salade de choux", image: "../images/menu/placeholder.svg" },
    ],
  },
  {
    id: 2,
    circles: [
      { description: "Pain de viande macaroni avec légumes", image: "../images/menu/painviande-macaroni.jpg" },
      { description: "Sandwich au jambon et fromage avec soupe", image: "../images/menu/placeholder.svg" },
      { description: "Haricots blanc au blé concassé", image: "../images/menu/haricots-riz.jpg" },
      { description: "Manicotti avec salade", image: "../images/menu/manicotti.jpg" },
      { description: "Hamburger avec salade de choux", image: "../images/menu/placeholder.svg" },
    ],
  },
  {
    id: 3,
    circles: [
      { description: "Poulet pilaf au blé concassé avec salade", image: "../images/menu/poulet-ble-concasse.jpg" },
      { description: "Salade césar au poulet avec pain au fromage", image: "../images/menu/salade-cesar.jpg" },
      { description: "Macaroni au fromage avec salade", image: "../images/menu/macaroni-fromage.jpg" },
      { description: "Saumon avec sauce aux herbes avec riz et légumes", image: "../images/menu/saumon-sauce-herbes.jpg" },
      { description: "Boulettes de viande et patate purée avec légumes", image: "../images/menu/boulettes-viande-patate.jpg" },
    ],
  },
  {
    id: 4,
    circles: [
      { description: "Fajita et riz mexicain avec légumes", image: "../images/menu/fajita-riz.jpg" },
      { description: "Tortellini sauce rosée avec salade", image: "../images/menu/tortellini-sauce-rose.jpg" },
      { description: "Pâté chinois avec salade", image: "../images/menu/placeholder.svg" },
      { description: "Crevette et légumes sauce teriyaki avec riz et salade", image: "../images/menu/crevettes-sauce-teriyaki.jpg" },
      { description: "Burger de poitrine de poulet avec salade", image: "../images/menu/burger-poulet.jpg" },
    ],
  },
];

// --- STYLED COMPONENTS ---

const MenuContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

const TopNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
`;

const ToggleWrapper = styled.div`
  display: flex;
  background: #f0f4f8;
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
`;

const ToggleButton = styled.button`
  padding: 10px 24px;
  border: none;
  background: ${({ active }) => (active ? "#007dc3" : "transparent")};
  color: ${({ active }) => (active ? "#ffffff" : "#666")};
  font-family: inherit;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const WeekControl = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(0, 125, 195, 0.2);
  background: #fff;
  color: #007dc3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #007dc3;
    color: #fff;
  }
`;

const WeekInfo = styled.div`
  color: #007dc3;
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 180px;
  text-align: center;
`;

const MenuGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  width: 100%;

  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const CardBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.imageUrl}");
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  /* Start transparent */
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  transition: background 0.4s ease;
`;

const MenuCard = styled(motion.div)`
  position: relative;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #eee;

  /* Target child elements on hover */
  &:hover .card-bg-layer {
    transform: scale(1.1);
  }

  &:hover .card-overlay-layer {
    /* Apply gradient only on hover */
    background: linear-gradient(
      to top,
      rgba(0, 50, 80, 0.7) 40%,
      transparent 100%
    );
  }
`;

const DayBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #007dc3;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 2;
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardDescription = styled(motion.p)`
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const Divider = styled(motion.div)`
  width: 30px;
  height: 2px;
  background: white;
  margin: 0.75rem 0;
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 2.5rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? "#007dc3" : "#ddd")};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const FooterNote = styled.div`
  margin-top: 3rem;
  padding: 1.25rem;
  background: rgba(0, 125, 195, 0.05);
  border-radius: 12px;
  border-left: 4px solid #007dc3;
  font-style: italic;
  font-size: 0.9rem;
  color: #555;
`;

const Menu = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [menuType, setMenuType] = useState("primaire");

  const currentWeeks = menuType === "primaire" ? primaireWeeks : weeks;

  const handleNext = () => setCurrentWeek((prev) => (prev === currentWeeks.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentWeek((prev) => (prev === 0 ? currentWeeks.length - 1 : prev - 1));

  return (
    <MenuContainer>
      <TopNavigation>
        <ToggleWrapper>
          <ToggleButton active={menuType === "primaire"} onClick={() => { setMenuType("primaire"); setCurrentWeek(0); }}>
            Primaire
          </ToggleButton>
          <ToggleButton active={menuType === "secondaire"} onClick={() => { setMenuType("secondaire"); setCurrentWeek(0); }}>
            Secondaire
          </ToggleButton>
        </ToggleWrapper>

        <WeekControl>
          <NavButton onClick={handlePrev}><FaChevronLeft size={16} /></NavButton>
          <WeekInfo>Semaine {currentWeeks[currentWeek].id}</WeekInfo>
          <NavButton onClick={handleNext}><FaChevronRight size={16} /></NavButton>
        </WeekControl>
      </TopNavigation>

      <AnimatePresence mode="wait">
        <MenuGrid key={`${menuType}-${currentWeek}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {currentWeeks[currentWeek].circles.map((item, index) => (
            <MenuCard key={index} initial="initial" whileHover="hover">
              <CardBackground className="card-bg-layer" imageUrl={item.image} />
              <DayBadge>{titles[index]}</DayBadge>
              
              <Overlay className="card-overlay-layer">
                <ContentContainer>
                  {/* Removed "Menu du jour" span */}
                  
                  <Divider 
                    variants={{
                      initial: { width: 0, opacity: 0 },
                      hover: { width: 40, opacity: 1 }
                    }}
                  />
                  
                  <CardDescription
                    variants={{
                      initial: { y: 20, opacity: 0 },
                      hover: { y: 0, opacity: 1 }
                    }}
                  >
                    {item.description}
                  </CardDescription>
                </ContentContainer>
              </Overlay>
            </MenuCard>
          ))}
        </MenuGrid>
      </AnimatePresence>

      <PaginationSection>
        {currentWeeks.map((_, index) => (
          <Dot key={index} active={index === currentWeek} onClick={() => setCurrentWeek(index)} />
        ))}
      </PaginationSection>

      <FooterNote>
        {menuType === "primaire"
          ? "* Avec chaque repas, un dessert est offert parmi le yogourt, la pomme, le jello, le pudding au chocolat ou la salade de fruits."
          : "* Avec chaque repas, un dessert est offert soit un biscuits au brisure du chocolat ou un gâteau."}
      </FooterNote>
    </MenuContainer>
  );
};

export default Menu;
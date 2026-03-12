import { useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const titles = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

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

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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
  cursor: pointer;

  &:hover .card-bg-layer {
    transform: scale(1.1);
  }

  &:hover .card-overlay-layer {
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

const CardContentContainer = styled(motion.div)`
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

const CardDivider = styled(motion.div)`
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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  font-family: var(--primary-ff), sans-serif;
  color: #666;
`;

// Lightbox styles
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LightboxWeekBadge = styled.div`
  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LightboxImage = styled(motion.img)`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
`;

const LightboxInfo = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`;

const LightboxDay = styled.span`
  display: inline-block;
  background: #007dc3;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const LightboxDescription = styled.p`
  color: white;
  font-size: 1.25rem;
  line-height: 1.6;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -3rem;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LightboxNavButton = styled.button`
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #007dc3;
    border-color: #007dc3;
  }

  &.prev {
    left: -0.5rem;

    @media (max-width: 1024px) {
      left: 0.5rem;
    }
  }

  &.next {
    right: -0.5rem;

    @media (max-width: 1024px) {
      right: 0.5rem;
    }
  }
`;

const LightboxDots = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 1.5rem;
`;

const LightboxDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? "#007dc3" : "rgba(255, 255, 255, 0.3)")};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Menu = ({ data }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [menuType, setMenuType] = useState("primaire");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const primaireWeeks = data?.primaireWeeks || [];
  const secondaireWeeks = data?.secondaireWeeks || [];
  const dessertNotes = data?.dessertNotes || {
    primaire: "* Avec chaque repas, un dessert est offert parmi le yogourt, la pomme, le jello, le pudding au chocolat ou la salade de fruits.",
    secondaire: "* Avec chaque repas, un dessert est offert soit un biscuits au brisure du chocolat ou un gâteau.",
  };

  const currentWeeks = menuType === "primaire" ? primaireWeeks : secondaireWeeks;
  const currentMeals = currentWeeks[currentWeek]?.meals || [];

  const handleNext = () => setCurrentWeek((prev) => (prev === currentWeeks.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentWeek((prev) => (prev === 0 ? currentWeeks.length - 1 : prev - 1));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === currentMeals.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? currentMeals.length - 1 : prev - 1));
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  if (!currentWeeks.length) {
    return (
      <LoadingContainer>
        Aucun menu disponible pour le moment.
      </LoadingContainer>
    );
  }

  return (
    <MenuContainer onKeyDown={handleKeyDown} tabIndex={0}>
      <TopNavigation>
        <ToggleWrapper>
          <ToggleButton
            active={menuType === "primaire"}
            onClick={() => {
              setMenuType("primaire");
              setCurrentWeek(0);
            }}
          >
            Primaire
          </ToggleButton>
          <ToggleButton
            active={menuType === "secondaire"}
            onClick={() => {
              setMenuType("secondaire");
              setCurrentWeek(0);
            }}
          >
            Secondaire
          </ToggleButton>
        </ToggleWrapper>

        <WeekControl>
          <NavButton onClick={handlePrev}>
            <FaChevronLeft size={16} />
          </NavButton>
          <WeekInfo>Semaine {currentWeeks[currentWeek]?.weekNumber || currentWeek + 1}</WeekInfo>
          <NavButton onClick={handleNext}>
            <FaChevronRight size={16} />
          </NavButton>
        </WeekControl>
      </TopNavigation>

      <AnimatePresence mode="wait">
        <MenuGrid
          key={`${menuType}-${currentWeek}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {currentMeals.map((item, index) => (
            <MenuCard
              key={index}
              initial="initial"
              whileHover="hover"
              onClick={() => openLightbox(index)}
            >
              <CardBackground
                className="card-bg-layer"
                imageUrl={item.imageUrl || "../images/menu/placeholder.svg"}
              />
              <DayBadge>{titles[index]}</DayBadge>

              <Overlay className="card-overlay-layer">
                <CardContentContainer>
                  <CardDivider
                    variants={{
                      initial: { width: 0, opacity: 0 },
                      hover: { width: 40, opacity: 1 },
                    }}
                  />
                  <CardDescription
                    variants={{
                      initial: { y: 20, opacity: 0 },
                      hover: { y: 0, opacity: 1 },
                    }}
                  >
                    {item.description}
                  </CardDescription>
                </CardContentContainer>
              </Overlay>
            </MenuCard>
          ))}
        </MenuGrid>
      </AnimatePresence>

      <PaginationSection>
        {currentWeeks.map((_, index) => (
          <Dot
            key={index}
            active={index === currentWeek}
            onClick={() => setCurrentWeek(index)}
          />
        ))}
      </PaginationSection>

      <FooterNote>{dessertNotes[menuType]}</FooterNote>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentMeals[lightboxIndex] && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <LightboxContent onClick={(e) => e.stopPropagation()}>

                <LightboxWeekBadge>
                Semaine {currentWeeks[currentWeek]?.weekNumber || currentWeek + 1}
              </LightboxWeekBadge>

              <CloseButton onClick={closeLightbox}>
                <FaTimes />
              </CloseButton>

              <LightboxNavButton className="prev" onClick={prevImage}>
                <FaChevronLeft size={18} />
              </LightboxNavButton>

              <LightboxImage
                key={lightboxIndex}
                src={currentMeals[lightboxIndex].imageUrl || "../images/menu/placeholder.svg"}
                alt={currentMeals[lightboxIndex].description}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              <LightboxNavButton className="next" onClick={nextImage}>
                <FaChevronRight size={18} />
              </LightboxNavButton>

              <LightboxInfo>
                <LightboxDay>{titles[lightboxIndex]}</LightboxDay>
                <LightboxDescription>
                  {currentMeals[lightboxIndex].description}
                </LightboxDescription>
              </LightboxInfo>

              <LightboxDots>
                {currentMeals.map((_, index) => (
                  <LightboxDot
                    key={index}
                    active={index === lightboxIndex}
                    onClick={() => setLightboxIndex(index)}
                  />
                ))}
              </LightboxDots>
            </LightboxContent>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </MenuContainer>
  );
};

export default Menu;
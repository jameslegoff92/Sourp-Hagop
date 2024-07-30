import { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(motion.p)`
  color: var(--white);
  cursor: pointer;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  margin-right: 0.625rem;
  line-height: 150%; /* 27px */
  letter-spacing: 0.0094rem;
  text-transform: uppercase;
`;


const ArrowDown = styled(KeyboardArrowDownIcon)`
  color: inherit;
`;


const NavItem = ({ title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconRotate = isHovered ? -180 : 0;
  const animationColor = isHovered ? "var(--black)" : "var(--primary-color)";
  const time = 0.3;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Title
        animate={{ color: animationColor}}
        transition={{ duration: time }}
      >
        {title}
      </Title>
      <motion.div animate={{ rotate: iconRotate, color: animationColor}} transition={{ duration: time }}>
        <ArrowDown />
      </motion.div>
    </Container>
  );
};

export default NavItem;

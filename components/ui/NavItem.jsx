"use client";

import { motion } from "framer-motion";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled(motion.p)`
  color: ${(props) => props.color };
  cursor: pointer;
  font-size: clamp(1.125rem, 2vw, 1.1rem);
  font-style: normal;
  font-weight: 500;
  margin-right: 0.625rem;
  line-height: 150%; /* 27px */
  letter-spacing: 0.0094rem;
  text-transform: uppercase;
  text-decoration: none;
 
`;

const ArrowDown = styled(KeyboardArrowDownIcon)`
  color: ${({ color }) => color};
`;

const NavItem = ({ title, color, hover = 'primary', isHovered }) => {

  const iconRotate = isHovered ? -180 : 0;
  const animationColor = isHovered ? hover : color;
  const time = 0.3;

  return (
    <Container >
      <Title color={color} animate={{ color: animationColor }} transition={{ duration: time }}>
        {title}
      </Title>
      <motion.div animate={{ rotate: iconRotate, color: animationColor }} transition={{ duration: time }}>
        <ArrowDown color={animationColor} />
      </motion.div>
    </Container>
  );
};

export default NavItem;

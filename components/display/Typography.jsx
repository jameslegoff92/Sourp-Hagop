"Use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

// Define styles for different heading levels
const headingStyles = {
  h1: `
    font-size: clamp(1.3rem, 5vw, 3rem); //80px
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 64.5px */
    letter-spacing: 0.05rem;
  `,
  h2: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(2.7rem, 5vw, 61px); //61px
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 112.5px */
    letter-spacing: 0.05rem;

  `,
  h3: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: 2.9375rem; //47px
    font-style: normal;
    font-weight: 300;
    line-height: 150%; /* 36px */
    letter-spacing: 0.05rem;
  `,
  h4: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(2.25rem, 5vw, 2.5rem); //36px - 40px
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 36px */
    letter-spacing: 0.05rem;
  `,
  h5: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(0.5rem, 3.5vw, 1.6875rem); //27px
    font-style: light;
    font-weight: 300;
    line-height: 150%; /* 36px */
    letter-spacing: 0.05rem;
  `,
  h6: `
    font-size: clamp(1.1rem, 1.5vw, 2rem); 21px
    font-style: normal;
    font-weight: 300;
    line-height: 150%; /* 35.25px */
    letter-spacing: 0.05rem;
  `,
  p: `
    font-size: 1rem; //16px
    font-weight: normal;
  `,
  subtitle: `
    font-size: 0.75rem; //12px
    font-weight: normal;
  `,
  label: `
    font-size: 0.5625rem; //9px
    font-weight: normal;
  `,
};

const fontFamilyMapping = {
  primary: "var(--primary-ff)", //Roboto
  secondary: "var(--secondary-ff)", //Poppings
};

const colorMapping = {
  primary: "var(--primary-color)",
  secondary: "var(--secondary-color)",
  seondaryDark: "var(--secondary-darkcolor)",
  dark: "var(--black)",
  light: "var(--white)",
  gray: "var(--light-gray)",
};


// Create a styled motion component
const createStyledMotionComponent = (component) => styled(motion[component])`
  ${({ type }) => headingStyles[type]};
  color: ${({ color }) => colorMapping[color] || 'var(--black)'};
  font-family: ${({ fontFamily }) => fontFamilyMapping[fontFamily] || 'var(--primary-ff)'};
`;

const Typography = ({ as = 'div', ...props }) => {
  const Component = createStyledMotionComponent(as);
  return <Component {...props} />;
};
export default Typography;
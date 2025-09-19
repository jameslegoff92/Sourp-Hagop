"Use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

// Define styles for different heading levels
const headingStyles = {
  h1: `
    font-size: clamp(1.5rem, 5vw, 3rem); //80px
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 64.5px */
    letter-spacing: 0.05rem;
  `,
  h2: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(1.2rem, 5vw, 2.5rem); //61px
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 112.5px */
    letter-spacing: 0.05rem;

  `,
  h3: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(1.1rem, 4.5vw, 2rem); //47px
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 36px */
    letter-spacing: 0.05rem;
  `,
  h4: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(1rem, 4.3vw, 2rem);

    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 36px */
    letter-spacing: 0.05rem;
  `,
  h5: `
    font-feature-settings:
      "clig" off,
      "liga" off;
    font-size: clamp(0.9rem, 4vw, 1.5rem);
    font-style: light;
    font-weight: 300;
    line-height: 150%; /* 36px */
    letter-spacing: 0.05rem;
  `,
  h6: `
    font-size: clamp(0.2rem, 3.5vw, 1.3rem);
    font-style: normal;
    font-weight: 300;
    line-height: 150%; /* 35.25px */
    letter-spacing: 0.05rem;
  `,
  p: `
    font-size: clamp(0.72rem, 3.8vw, 1.3rem);
    font-weight: 390;
  `,
  subtitle: `
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    font-weight: 390;
  `,
  label: `
    font-size: clamp(0.7rem, 1.4vw, 1.1rem);
    font-weight: normal;
  `,
};

const fontFamilyMapping = {
  primary: "var(--primary-ff)",
  secondary: "var(--secondary-ff)",
};

const colorMapping = {
  primary: "var(--primary-color)",
  secondary: "var(--secondary-color)",
  seondaryDark: "var(--secondary-darkcolor)",
  dark: "var(--black)",
  light: "var(--white)",
  lightGray: "var(--light-gray)",
  gray: "var(--gray)",
};


const createStyledMotionComponent = (component) => styled(motion[component])`
  ${({ type }) => headingStyles[type]};
  color: ${({ color }) => colorMapping[color] || 'var(--black)'};
  font-family: ${({ fontFamily }) => fontFamilyMapping[fontFamily] || 'var(--primary-ff)'};
  ${({ weight }) => weight && `font-weight: ${weight};`}
`;

const Typography = ({ as = 'div', ...props }) => {
  const Component = createStyledMotionComponent(as);
  return <Component {...props} />;
};
export default Typography;
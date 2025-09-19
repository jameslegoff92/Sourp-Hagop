"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";
import Typography from "../../components/display/Typography";
import { motion } from "framer-motion";

const AccordionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 25px auto;
`;

const AccordionItemContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const AccordionHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  font-family: var(--primary-ff);
  cursor: pointer;
  position: relative;
  color: ${({ isOpen }) => (isOpen ? "var(--primary-color)" : "#000")};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ isOpen }) =>
      isOpen ? "rgba(0, 125, 195, 0.5)" : "#ddd"};
    transition: background-color 0.3s ease;
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
`;

const Icon = styled(motion.span)`
  font-size: 1.5rem;
  line-height: 1;
  color: ${({ isOpen }) => (isOpen ? "var(--primary-color)" : "#000")};
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: clamp(12rem, 2vw, 12rem);
    height: clamp(15rem, 2vw, 12rem);
    object-fit: cover;
    margin: 20px 0 10px 0;
  }
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  padding: 0 1rem;
  background-color: rgba(0, 125, 195, 0.04);
  border-top: 1px solid #ddd;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: 20px;
  text-align: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageItemComponent = ({ src, alt, name, title }) => (
  <ImageItem>
    <img src={src} alt={alt} />
    <Typography as="p" type="h6" color="dark" weight="400">
      {name}
    </Typography>
    <Typography as="p" type="secondary" color="gray">
      {title}
    </Typography>
  </ImageItem>
);

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItemContainer>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <Title>{title}</Title>
        <Icon animate={{ rotate: isOpen ? 45 : 0 }} isOpen={isOpen}>
          +
        </Icon>
      </AccordionHeader>
      <AccordionContent
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          collapsed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <ImageGrid>{children}</ImageGrid>
      </AccordionContent>
    </AccordionItemContainer>
  );
};

const Accordion = ({ categories = [] }) => {
  return (
    <AccordionContainer>
      {categories.map((category) => (
        <AccordionItem key={category.title} title={category.title}>
          {category.staff?.map((person) => (
            <ImageItemComponent
              key={person.name}
              src={person.imageUrl || "/images/staff/_default.jpg"}
              alt={person.name}
              name={person.name}
              title={person.title}
            />
          ))}
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default Accordion;

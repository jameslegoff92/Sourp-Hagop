"use client"; 

import React, { useState } from 'react';
import styled from "@emotion/styled";
import Typography from "../../components/display/Typography";
import { motion } from "framer-motion";

// Styled component for the accordion container
const AccordionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 25px auto;
`;

// Styled component for each accordion item
const AccordionItemContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

// Styled component for the accordion header with a horizontal line
const AccordionHeader = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  font-family: var(--primary-ff);
  cursor: pointer;
  position: relative;
  color: ${({ isOpen }) => (isOpen ? 'var(--primary-color)' : '#000')}; /* Change text color when open */

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ isOpen }) => (isOpen ? 'rgba(0, 125, 195, 0.5)' : '#ddd')};
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    background-color: rgba(0, 125, 195, 0.5);
  }

  &:hover {
    color: var(--primary-color);

    span {
      color: var(--primary-color);
    }
  }
`;

const Title = styled.span`
  font-size: 1.2rem;
  transition: color 0.3s ease;
  text-align: left;
`;

const Icon = styled(motion.span, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  font-size: 1.5rem;
  line-height: 1;
  transform-origin: 2px 10px 10px 0;
  transition: color 0.3s ease;
  color: ${({ isOpen }) => (isOpen ? 'var(--primary-color)' : '#000')};

  &:hover {
    color: #007bff;
  }
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  padding: 0 1rem;
  background-color: rgba(0, 125, 195, 0.04);
  border-top: 1px solid #ddd;
`;

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <AccordionItemContainer>
            <AccordionHeader
                onClick={toggleOpen}
                isOpen={isOpen}
            >
                <Title>{title}</Title>
                <Icon
                    initial={false}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    isOpen={isOpen}
                >
                    +
                </Icon>
            </AccordionHeader>
            <AccordionContent
                initial="collapsed"
                animate={isOpen ? "open" : "collapsed"}
                variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 }
                }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
            <Typography style={{ textAlign: "left", padding: "3% 4%" }}>
                {children}            
            </Typography>
            </AccordionContent>
        </AccordionItemContainer>
    );
};

const Accordion = ({ data }) => {
    return (
      <AccordionContainer>
        {Object.entries(data).map(([title, content]) => (
          <AccordionItem key={title} title={title}>
            <Typography as="subtitle" type="subtitle" color="dark">
              {content}
            </Typography>
          </AccordionItem>
        ))}
      </AccordionContainer>
    );
};

export default Accordion;
"use client";

import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { motion } from "framer-motion";

const StyledButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #006096;
  color: #006096;
  padding: 15px 25px; // Default padding
  border-radius: 50px;
  font-size: 18px; // Default font size
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  min-width: 120px; // Minimum width
  width: auto; // Width adjusts to content size up to max width

  &:hover {
    background-color: #006096;
    color: #fff;
  }

  // Smaller devices (landscape phones, 576px and up)
  @media (max-width: 576px) {
    font-size: 16px; // Smaller font size for small devices
    padding: 10px 20px; // Smaller padding
    min-width: 100px; // Smaller minimum width
  }

  // Very small devices (small phones, 320px and up)
  @media (max-width: 320px) {
    font-size: 14px; // Even smaller font size
    padding: 8px 15px; // Reduce padding further
    min-width: 80px; // Reduce minimum width
  }
`;

const CustomButton = ({...props}) => {
  return (
    <>
      <StyledButton {...props} >
        {props.children}
      </StyledButton>
    </>
  );
}

export default CustomButton;

import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const StyledButton = styled(Button)(
  {
    color: "var(--white)",
    fontSize: "1.125rem",
    fontStyle: "normal",
    fontWeight: '500',
    lineHeight: "150%", /* 27px */
    letterSpacing: "0.0094rem",
    '&:hover': {
      color: "var(--black)",
    }
  }
)

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

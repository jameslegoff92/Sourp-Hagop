import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)(
  {
    color: "red",
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

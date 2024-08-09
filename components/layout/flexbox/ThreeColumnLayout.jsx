import React from 'react';
import styled from 'styled-components';

// Container for Flexbox
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  height: 100%;
  padding: 100px 40px;
  gap: 10px;
  @media (min-width: 768px) {
    flex-direction: column;
  }

  @media (min-width: 1068px) {
    flex-direction: row;
  }
`;

// Individual Box
const Box = styled.div`
  flex: 1;
  min-height: 400px;
  background-color: grey;
  width: 100%;

  @media (min-width: 768px) {
    height: 400px;  // Make it a rectangle
  }

  @media (min-width: 1068px) {
    height: 400px;
  }
`;

const ThreeColumnLayout = ({ components }) => {
  return (
    <Container>
      {components.map((component, index) => (
        <Box key={index}>
          {component}
        </Box>
      ))}
    </Container>
  );
};

export default ThreeColumnLayout;
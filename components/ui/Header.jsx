"use client";

import TopNav from "@/components/ui/topNav";
import Container from "@/components/layout/Container";
import Nav from "@/components/ui/Nav";
import styled from "@emotion/styled";

const HeaderImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 37%;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding-top: 40%;
  }

  @media (max-width: 768px) {
    padding-top: 40%;
  }

  @media (max-width: 480px) {
    padding-top: 50%; /* Adjust for mobile phones */
  }
`;

const HeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const HeaderText = styled.div`
  position: absolute;
  top: ${props => props.top || '10%'};
  right: ${props => props.right || '60px'};
  color: white;
  padding: 1vw;
  font-size: clamp(2rem, 5vw, 5rem);
  z-index: 2;

  @media (max-width: 1024px) {
    top: ${props => props.mobileTop || '62%'};
    right: ${props => props.mobileRight || '25px'};
    padding: 4vw 0 0 3vw;
  }

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4.5vw, 4rem);
    top: ${props => props.mobileTop || props.top || '20%'};
    right: ${props => props.mobileRight || '30px'};
    padding: 4vw 0 0 3vw;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 5vw, 3rem);
    top: ${props => props.mobileTop || props.top || '50%'};
    right: ${props => props.mobileRight || '20px'};
    padding-left: 5vw;
  }
`;

const Header = ({ imageSrc, headerText, headerTextTop, headerTextRight, mobileTop, mobileRight, animate = false }) => {
  return (
    <>
      <TopNav />
      <Container>
        <Nav animate={animate} />
      </Container>
      <HeaderImageContainer>
        <HeaderImage src={imageSrc}>
          <HeaderText
            top={headerTextTop}
            right={headerTextRight}
            mobileTop={mobileTop}
            mobileRight={mobileRight}
          >
            {headerText}
          </HeaderText>
        </HeaderImage>
      </HeaderImageContainer>
    </>
  );
};

export default Header;

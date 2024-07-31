"use client";

//Native Imports
import TopNav from "@/components/ui/topNav";
import Container from "@/components/layout/Container";
import Nav from "@/components/ui/Nav";
import styled from "@emotion/styled";

const HeaderImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 28.93%; /* Aspect ratio 506 / 1748 * 100% */
  overflow: hidden;
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
`;

const HeaderText = styled.div`
  position: absolute;
  top: 60px;
  right: 60px;
  color: white;
  padding: 10px;
  font-size: 90px;
`;

const Header = ({ imageSrc, headerText }) => {
  return (
    <>
      <TopNav/>
      <Container>
        <Nav/>
      </Container>
      <HeaderImageContainer>
        <HeaderImage src={imageSrc}>
          <HeaderText>{headerText}</HeaderText>
        </HeaderImage>
      </HeaderImageContainer>
    </>
  );
};

export default Header;

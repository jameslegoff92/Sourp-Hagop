import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -2;
  pointer-events: none;
`;

const Logo = styled.img`
  opacity: 0.05;
  width: 500px;
  height: auto;
`;

const BackgroundLogo = ({ src, alt = "Background Logo" }) => {
  return (
    <Container>
      <Logo src={src} aria-label={alt} />
    </Container>
  );
};

export default BackgroundLogo;
import styled from "styled-components";
import Image from "next/image";

<<<<<<< HEAD
const Logo = styled(Image)``;
=======
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
>>>>>>> staging

const Logo = styled.img`
  opacity: 0.05;
  width: 500px;
  height: auto;
`;

const BackgroundLogo = ({ src, alt = "Background Logo" }) => {
<<<<<<< HEAD
  return <Logo src={src} aria-label={alt} style={css} width={350} height={311} />;
=======
  return (
    <Container>
      <Logo src={src} aria-label={alt} />
    </Container>
  );
>>>>>>> staging
};

export default BackgroundLogo;
import styled from 'styled-components';

const Logo = styled.img`
  position: fixed;
  top: 50%;
  left: calc(50% + 25px); /* Adjust the '20px' for the desired left margin */
  transform: translate(-50%, -50%);
  opacity: 0.05;
  width: clamp(200px, 20vw, 500px);  
  height: auto;
  background: ${({ src }) => `url(${src}) no-repeat center`};
  background-size: contain;
  z-index: -1;
`;

const BackgroundLogo = ({ src, alt = "Background Logo" }) => {
  return (
    <Logo src={src} aria-label={alt} />
  );
};

export default BackgroundLogo;

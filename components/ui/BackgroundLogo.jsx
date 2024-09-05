import styled from "styled-components";

const Logo = styled.img``;

const css = {
  position: "fixed",
  top: "50%",
  left: "calc(50% + 45px)",
  transform: "translateX(-50%)",
  opacity: 0.05,
  width: "350px",
  height: "auto",
  zIndex: -2,
};

const BackgroundLogo = ({ src, alt = "Background Logo" }) => {
  return <Logo src={src} aria-label={alt} style={css} />;
};

export default BackgroundLogo;

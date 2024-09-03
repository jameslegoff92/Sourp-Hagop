import styled from "styled-components";
import Image from "next/image";

const Logo = styled(Image)``;

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
  return <Logo src={src} aria-label={alt} style={css} width={350} height={311} />;
};

export default BackgroundLogo;

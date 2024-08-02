"use client";

import Image from "next/image";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4)
`;

const StyledImage = styled(Image)`
  margin-left: 6.25rem;
`;

function MainHeading() {
  return (
    <Container>
      <StyledImage src="images/logo-big.svg" width={353} height={315} alt="logo" />
      <div>
        <h1 className="h1">Toujours plus haut, toujours plus loin !</h1>
        <p className="h3">Préscolaire | Primaire | Secondaire</p>
      </div>
    </Container>
  );
}

export default MainHeading;

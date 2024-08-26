//Third Party Imports
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";

//Local Imports
import Typography from "../display/Typography";
import Container from "../layout/Container";

//Animation for the Values Section
const listVariants = {
  initial: {},
  hover: {},
};

const itemVariants = {
  initial: { height: "100%" },
  hover: {
    height: "25%",
    transition: {
      duration: 0.2,
    },
  },
};

const textVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
};

//CSS For Values Section
const ValuesContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 40px 0 100px;
  position relative;
  text-align: center;
  `;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-top: var(--spacing-7);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const ExtendedMotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  padding-top: var(--spacing-2);
  margin: 0 auto 0;
  width: 50%;
  flex-direction: column;
  width: 100%;
  margin-bottom: var(--spacing-4);

  @media (min-width: 768px) {
    width: calc(33.333% - var(--spacing-4));
    margin-bottom: 0;
  }
`;

const ValueContainer = styled(motion.div)`
  overflow: hidden;
  height: 31.25rem;
`;

const ValueSubContainer = styled(motion.div)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)),
    // Blue tint overlay// Blue tint overlay
    url("/images/value-img-1.png"); // Replace with your image URL
  background-size: cover; // Ensures the image covers the whole div
  background-position: center; // Centers the image
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 40px;
`;

const ValueSubContainer2 = styled(ValueSubContainer)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)),
    // Blue tint overlay// Blue tint overlay
    url("/images/respect.JPG"); // Replace with your image URL
`;

const ValueSubContainer3 = styled(ValueSubContainer)`
  background:
    linear-gradient(rgba(0, 96, 150, 0.3), rgba(0, 96, 150, 0.3)),
    // Blue tint overlay// Blue tint overlay
    url("/images/responsible.JPG"); // Replace with your image URL
`;

const ValueText = styled(Typography)`
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ValueText2 = styled(ValueText)`
  color: #fff;
`;

const TextDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  height: auto;
  background-color: var(--tertiary-color);

  @media (min-width: 768px) {
    padding: 6rem 4rem 0;
    height: 100%;
  }
`;

const TextDiv2 = styled(TextDiv)`
  background-color: #006096;
`;

const Values = () => {
  const parentControls = useAnimation();
  const childControls1 = useAnimation();
  const childControls2 = useAnimation();

  const handleHoverStart = async () => {
    await parentControls.start({});
    await childControls1.start({
      height: "25%",
      transition: { duration: 0.3 },
    });
    await childControls2.start({
      scale: 1.2,
      opacity: 1,
      transition: { duration: 1 },
    });
  };

  const handleHoverEnd = async () => {
    await parentControls.start({});
    await childControls1.start({
      height: "100%",
      transition: { duration: 0.3 },
    });
    await childControls2.start({
      scale: 1,
      opacity: 0,
      transition: { duration: 0.2 },
    });
  };

  return (
    <>
      <ValuesContainer>
        <Container>
          <Typography as="h1" type="h2" color="primary">
            Nos Valeurs
          </Typography>
          <CardContainer>
            <ExtendedMotionDiv>
              <ValueContainer
                animate={parentControls}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              >
                <ValueSubContainer2
                  initial={{ height: "100%" }}
                  animate={childControls1}
                >
                  <Typography
                    as="h1"
                    type="h4"
                    color="light"
                    fontFamily="secondary"
                  >
                    RESPECT
                  </Typography>
                </ValueSubContainer2>
                <TextDiv variants={{}}>
                  <ValueText
                    as="p"
                    type="h6"
                    fontFamily="secondary"
                    initial={{ opacity: 0 }}
                    animate={childControls2}
                  >
                    À Sourp Hagop, nous aidons nos élèves à atteindre
                    l'accomplissement de soi en découvrant et développant leur
                    plein potentiel pour une vie épanouie.
                  </ValueText>
                </TextDiv>
              </ValueContainer>
            </ExtendedMotionDiv>
            <ExtendedMotionDiv>
              <ValueContainer
                inital="initial"
                whileHover="hover"
                variants={listVariants}
              >
                <ValueSubContainer3 variants={itemVariants}>
                  <Typography
                    as="h1"
                    type="h4"
                    color="light"
                    fontFamily="secondary"
                  >
                    RESPONSABILITÉ
                  </Typography>
                </ValueSubContainer3>
                <TextDiv2>
                  <ValueText2
                    initial="initial"
                    whileHover="hover"
                    as="p"
                    type="h6"
                    fontFamily="secondary"
                    variants={textVariants}
                  >
                    La responsabilité nous rend autonomes. À Sourp Hagop, nous
                    encourageons les élèves à prendre en charge leurs actions et
                    à s'engager activement dans leur communauté.
                  </ValueText2>
                </TextDiv2>
              </ValueContainer>
            </ExtendedMotionDiv>
            <ExtendedMotionDiv>
              <ValueContainer
                inital="initial"
                whileHover="hover"
                variants={listVariants}
              >
                <ValueSubContainer variants={itemVariants}>
                  <Typography
                    as="h1"
                    type="h4"
                    color="light"
                    fontFamily="secondary"
                  >
                    ACOMPLISSEMENT DE SOI
                  </Typography>
                </ValueSubContainer>
                <TextDiv>
                  <ValueText
                    initial="initial"
                    whileHover="hover"
                    as="p"
                    type="h6"
                    fontFamily="secondary"
                    variants={textVariants}
                  >
                    Le respect est essentiel. À l'école arménienne Sourp Hagop,
                    nous valorisons le respect envers tous, créant un
                    environnement de confiance et de considération mutuelle
                  </ValueText>
                </TextDiv>
              </ValueContainer>
            </ExtendedMotionDiv>
          </CardContainer>
        </Container>
      </ValuesContainer>
    </>
  );
};

export default Values;

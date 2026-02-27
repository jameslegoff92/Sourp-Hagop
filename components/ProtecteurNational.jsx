"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import CustomButton from "./inputs/Button";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";

const StyledDiv = styled.div`
  text-align: center;
  padding: 60px 0 150px;
  position: relative;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
`;

const InfoCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  margin-top: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 125, 195, 0.08);
  text-align: left;
  transition: all 0.4s ease;

  &:hover {
    box-shadow: 0 20px 50px rgba(0, 125, 195, 0.1);
    border-color: rgba(0, 125, 195, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`;

const InfoTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.4;

  p {
    margin: 0;
    display: inline;
  }

  sup {
    font-size: 0.7em;
    color: var(--primary-color);
    font-weight: 700;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const InfoContent = styled.div`
  font-size: 1.05rem;
  color: #444;
  line-height: 1.8;

  p {
    margin: 0 0 1rem 0;
  }

  sup {
    font-size: 0.75em;
    color: var(--primary-color);
    font-weight: 700;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: "●";
      color: var(--primary-color);
      position: absolute;
      left: -1rem;
    }
  }

  ol li {
    &::before {
      content: counter(list-item) ".";
      color: var(--primary-color);
      font-weight: 700;
    }
  }

  a {
    color: var(--primary-color);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const StepsSection = styled.div`
  margin-top: 3rem;
`;

const StepsIntroText = styled.div`
  font-size: 1.05rem;
  color: #444;
  line-height: 1.8;
  text-align: left;
  margin-bottom: 1rem;

  p {
    margin: 0 0 1rem 0;
  }

  sup {
    font-size: 0.75em;
    color: var(--primary-color);
    font-weight: 700;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: "●";
      color: var(--primary-color);
      position: absolute;
      left: -1rem;
    }
  }

  a {
    color: var(--primary-color);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const StepCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 125, 195, 0.08);
  text-align: left;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    background: linear-gradient(180deg, var(--primary-color), var(--tertiary-color));
  }

  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StepNumber = styled.div`
  min-width: 50px;
  height: 50px;
  background: var(--secondary-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary-color);

  @media (max-width: 768px) {
    min-width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const StepTitle = styled.h5`
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HighlightedBox = styled.div`
  background-color: var(--secondary-color);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
  line-height: 1.7;

  p {
    margin: 0 0 0.5rem 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  sup {
    font-size: 0.75em;
    color: var(--primary-color);
    font-weight: 700;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: "●";
      color: var(--primary-color);
      position: absolute;
      left: -1rem;
    }
  }

  ol li {
    counter-increment: list-item;

    &::before {
      content: counter(list-item) ".";
      color: var(--primary-color);
      font-weight: 700;
    }
  }

  a {
    color: var(--primary-color);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    font-size: 0.95rem;
  }
`;

const RegularParagraph = styled.div`
  font-size: 1rem;
  color: #444;
  line-height: 1.8;
  margin-bottom: 1rem;
  text-align: left;

  p {
    margin: 0 0 0.5rem 0;
  }

  sup {
    font-size: 0.75em;
    color: var(--primary-color);
    font-weight: 700;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;

    &::before {
      content: "●";
      color: var(--primary-color);
      position: absolute;
      left: -1rem;
    }
  }

  a {
    color: var(--primary-color);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ContactBox = styled.div`
  background-color: var(--secondary-color);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;

  &::before {
    content: "●";
    color: var(--primary-color);
  }

  a, span {
    color: var(--primary-color);
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ProcessImage = styled(motion.img)`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 16px;
  margin: 2rem auto;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

const Footnote = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  font-size: 0.9rem;
  color: #666;
  text-align: left;
  line-height: 1.7;
  font-style: italic;

  p {
    margin: 0;
  }

  sup {
    font-size: 0.75em;
    color: var(--primary-color);
    font-weight: 700;
  }

  a {
    color: var(--primary-color);
    font-weight: 700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const portableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    sup: ({ children }) => <sup>{children}</sup>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export default function ProtecteurNational({ data }) {
  const headerImageUrl = data?.pageHeader?.headerImageUrl;
  const headerText = data?.pageHeader?.headerText;
  const mainTitle = data?.mainTitle;
  const introText = data?.introText;
  const infoSections = Array.isArray(data?.infoSections) ? data.infoSections : [];
  const stepsTitle = data?.stepsTitle;
  const stepsIntro = data?.stepsIntro;
  const etapes = Array.isArray(data?.etapes) ? data.etapes : [];
  const formButton = data?.formButton;
  const processImageUrl = data?.processImageUrl;
  const additionalSections = Array.isArray(data?.additionalSections) ? data.additionalSections : [];
  const contactInfo = data?.contactInfo;
  const footnote = data?.footnote;

  return (
    <>
      <Header
        animate={false}
        imageSrc={headerImageUrl || "../images/header/pne-header.jpg"}
        headerText={headerText || "PROTECTEUR NATIONAL DE L'ÉLÈVE"}
        headerTextTop="70%"
      />

      <StyledDiv>
        <ContentContainer>
          <MotionDiv>
            {/* Titre principal */}
            <Typography
              as="h1"
              type="h1"
              color="primary"
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              {mainTitle || "Processus de traitement des plaintes"}
            </Typography>

            {/* Introduction */}
            {introText && (
              <Typography
                as="p"
                type="h5"
                color="dark"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {introText}
              </Typography>
            )}

            {/* Sections d'information */}
            {infoSections.map((section, index) => (
              <InfoCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InfoTitle>{section.title}</InfoTitle>
                <InfoContent>
                  <PortableText value={section.content} components={portableTextComponents} />
                </InfoContent>
              </InfoCard>
            ))}

            {/* Section des étapes */}
            {etapes.length > 0 && (
              <StepsSection>
                <Typography
                  as="h3"
                  type="h3"
                  color="primary"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ textAlign: "left", marginBottom: "1rem" }}
                >
                  {stepsTitle || "Comment déposer une plainte ?"}
                </Typography>

                {stepsIntro && (
                  <StepsIntroText>
                    <PortableText value={stepsIntro} components={portableTextComponents} />
                  </StepsIntroText>
                )}

                {etapes.map((etape, index) => (
                  <StepCard
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <StepHeader>
                      <StepNumber>{etape.stepNumber}</StepNumber>
                      <StepTitle>{etape.title}</StepTitle>
                    </StepHeader>

                    {etape.paragraphs?.map((para, pIndex) => (
                      <HighlightedBox key={pIndex}>
                        <PortableText value={para.text} components={portableTextComponents} />
                      </HighlightedBox>
                    ))}

                    {etape.contactPerson?.name && (
                      <HighlightedBox>
                        La personne responsable du traitement des plaintes à l'École arménienne Sourp Hagop est{" "}
                        <a href={`mailto:${etape.contactPerson.email}`}>
                          {etape.contactPerson.name}
                        </a>
                        , {etape.contactPerson.role}. Elle dispose de 15 jours ouvrables pour répondre à la plainte soumise.
                      </HighlightedBox>
                    )}
                  </StepCard>
                ))}
              </StepsSection>
            )}

            {/* Bouton formulaire */}
            {formButton?.link && (
              <ButtonContainer>
                <CustomButton
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={formButton.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {formButton.text || "Formulaire de plainte"}
                  </a>
                </CustomButton>
              </ButtonContainer>
            )}

            {/* Image du processus */}
            {processImageUrl && (
              <a href={processImageUrl} target="_blank" rel="noopener noreferrer">
                <ProcessImage
                  src={processImageUrl}
                  alt="Processus de traitement des plaintes"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                />
              </a>
            )}

            {/* Sections additionnelles */}
            {additionalSections.map((section, index) => (
              <InfoCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InfoTitle>
                  <PortableText value={section.title} components={portableTextComponents} />
                </InfoTitle>
                {section.paragraphs?.map((para, pIndex) =>
                  para.isHighlighted ? (
                    <HighlightedBox key={pIndex}>
                      <PortableText value={para.text} components={portableTextComponents} />
                    </HighlightedBox>
                  ) : (
                    <RegularParagraph key={pIndex}>
                      <PortableText value={para.text} components={portableTextComponents} />
                    </RegularParagraph>
                  )
                )}
              </InfoCard>
            ))}

            {/* Contact info */}
{/*             {contactInfo && (
              <ContactBox>
                <ContactItem>
                  Formulaire de plainte web :{" "}
                  <a href={`https://${contactInfo.formUrl}`} target="_blank" rel="noopener noreferrer">
                    {contactInfo.formUrl}
                  </a>
                </ContactItem>
                <ContactItem>
                  Téléphone ou texto : <span>{contactInfo.phone}</span>
                </ContactItem>
                <ContactItem>
                  Courriel :{" "}
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </ContactItem>
              </ContactBox>
            )} */}

            {/* Note de bas de page */}
            {footnote && (
              <Footnote>
                <PortableText value={footnote} components={portableTextComponents} />
              </Footnote>
            )}
          </MotionDiv>
        </ContentContainer>
      </StyledDiv>

      <Footer />
    </>
  );
}
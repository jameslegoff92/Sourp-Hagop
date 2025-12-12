"use client";

import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
//import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../components/display/Typography";
import { PortableText } from "@portabletext/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: left;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  flex-direction: column;
  margin: 50px auto 0;
  width: 70%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const SectionContainer = styled(motion.div)`
  background-color: rgba(0, 125, 195, 0.04);
  border-left: 4px solid var(--primary-color);
  padding: 30px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
`;

const CyclesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    width: 100%;
    margin: 25px auto;
  }
`;

const CycleCard = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'bgImage'
})`
  position: relative;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6);
    transition: background 0.3s ease;
  }
  
  &:hover::before {
    background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8));
  }
  
  &:hover .cycle-content {
    justify-content: center;
    padding-top: 40px;
  }
  
  &:hover .cycle-name {
    transform: translateY(-20px);
  }
  
  &:hover .cycle-details {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }

  @media (max-width: 1300px) {
    height: 300px;
  }
`;

const CycleContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 25px;
  text-align: center;
  transition: all 0.5s ease;
`;

const CycleName = styled.div`
  color: white;
  font-weight: 600;
  margin: 0;
  transform: translateY(0);
  transition: transform 0.5s ease;
`;

const CycleDetails = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  margin-top: 15px;
    max-height: 0;
  overflow: hidden;
`;

const SubjectAreasContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 30px;
  border-radius: 8px;
  margin: 30px 0;
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 240px));
  gap: 15px;
  justify-content: center;
  margin: 20px auto;
`;


const SubjectItem = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 3px solid var(--primary-color);
`;

const LanguageContainer = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 30px;
  border-radius: 12px;
  margin: 30px 0;
  border: 1px solid #dee2e6;
`;

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;

    @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;

const LanguageCard = styled(motion.div, {
    shouldForwardProp: (prop) => prop !== 'language'
})`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 3px solid ${props => {
        switch (props.language) {
            case 'french': return '#007bff';
            case 'english': return '#28a745';
            case 'armenian': return '#dc3545';
            default: return '#6c757d';
        }
    }};
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 30px 0;
`;

const TableNote = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #ffc107;
`;

export default function Primaire({ data }) {

    return (
        <>
            <Header
                animate={false}
                imageSrc={data?.headerImageUrl || "../images/header/primaire-header.jpg"}
                headerText={data?.headerText || "PROGRAMME ÉDUCATIF AU PRIMAIRE"}
                headerTextTop="70%"
            />

            <StyledDiv>
                <MotionDiv>
                    <TextContainer>
                        <Typography
                            as="p"
                            type="h6"
                            color="dark"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            {data?.introText}
                        </Typography>
                    </TextContainer>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h2" type="h2" color="primary" style={{ textAlign: "center", marginBottom: "20px" }}>
                            Les Trois Cycles du Primaire
                        </Typography>
<CyclesContainer>
{data?.cycles?.map((cycle, index) => (
    <CycleCard
        key={index}
        bgImage={cycle.imageUrl}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
    >
        <CycleContent className="cycle-content">
            
            <CycleName className="cycle-name">
                <Typography as="h3" type="h4" color="light">
                    {cycle.name}
                </Typography>
            </CycleName>

            <CycleDetails className="cycle-details">
                <Typography as="p" type="p" color="light" style={{ marginBottom: "10px" }}>
                    {cycle.grades}
                </Typography>

                <Typography as="p" type="p" color="light" style={{ opacity: 0.9 }}>
                    {cycle.description}
                </Typography>
            </CycleDetails>

        </CycleContent>
    </CycleCard>
))}
</CyclesContainer>

                    </motion.div>

                    <LanguageContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "20px" }}>
                            Apprentissage des Langues
                        </Typography>
                        <LanguageGrid>
                            {data?.languages?.map((lang, index) => (
                                <LanguageCard
                                    key={index}
                                    language={lang.type}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="h4" type="h5" color="primary" style={{ marginBottom: "15px" }}>
                                        {lang.language}
                                    </Typography>
                                    <Typography as="p" type="p" color="dark">
                                        {lang.description}
                                    </Typography>
                                </LanguageCard>
                            ))}
                        </LanguageGrid>
                    </LanguageContainer>

                    <SectionContainer
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            {data?.enrichmentTitle}
                        </Typography>
                        <PortableText
                            value={data?.enrichmentContent}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                                            {children}
                                        </Typography>
                                    ),
                                },
                            }}
                        />
                    </SectionContainer>

                    <SubjectAreasContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            {data?.subjectAreasTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                            {data?.subjectAreasText}
                        </Typography>
                        <SubjectGrid>
                            {data?.subjectAreas?.map((subject, index) => (
                                <SubjectItem
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="p" type="p" color="dark">
                                        {subject}
                                    </Typography>
                                </SubjectItem>
                            ))}
                        </SubjectGrid>
                    </SubjectAreasContainer>

                    <SectionContainer
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            {data?.artsTitle}
                        </Typography>
                        <PortableText
                            value={data?.artsContent}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                                            {children}
                                        </Typography>
                                    ),
                                },
                            }}
                        />
                    </SectionContainer>

                    <TableContainer>
                        <div style={{ padding: "30px" }}>
                            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px", textAlign: "center" }}>
                                {data?.maquetteTitle}
                            </Typography>
                            <PortableText
                                value={data?.artsContent}
                                components={{
                                    block: {
                                        normal: ({ children }) => (
                                            <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                                                {children}
                                            </Typography>
                                        ),
                                    },
                                }}
                            />
                            <TableNote>
                                <Typography as="p" type="p" color="dark">
                                    📊 Tableau détaillé de la maquette de cours disponible sur demande
                                </Typography>
                            </TableNote>
                        </div>
                    </TableContainer>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ textAlign: "center", marginTop: "50px" }}
                    >
                        <Typography as="h3" type="h3" color="primary">
                            Horaire Type d'une Journée au Primaire
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginTop: "20px" }}>
                            Contactez-nous pour obtenir plus d'informations sur l'horaire détaillé et la répartition des matières.
                        </Typography>
                    </motion.div>
                </MotionDiv>
            </StyledDiv>
            {/* <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/> */}
            <Footer />
        </>
    );
}
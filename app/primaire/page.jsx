"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
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
`;

const CycleCard = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 4px solid var(--primary-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SubjectAreasContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 30px;
  border-radius: 8px;
  margin: 30px 0;
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const SubjectItem = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
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
`;

const LanguageCard = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 3px solid ${props => {
    switch(props.language) {
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

export default function Primaire() {
    const cycles = [
        { 
            name: "1er cycle", 
            grades: "1ère et 2e années",
            description: "Introduction aux apprentissages fondamentaux"
        },
        { 
            name: "2e cycle", 
            grades: "3e et 4e années",
            description: "Consolidation des acquis de base"
        },
        { 
            name: "3e cycle", 
            grades: "5e et 6e années",
            description: "Approfondissement et préparation au secondaire"
        }
    ];

    const subjectAreas = [
        "Les langues",
        "La mathématique",
        "La science et la technologie",
        "L'univers social",
        "Les arts",
        "Le développement personnel"
    ];

    const languages = [
        {
            name: "Français",
            type: "french",
            description: "Au cœur de nos pratiques pédagogiques avec enrichissement du vocabulaire, stratégies de lecture et expression orale."
        },
        {
            name: "Anglais",
            type: "english", 
            description: "Apprentissage progressif de la langue seconde à travers diverses activités communicatives."
        },
        {
            name: "Arménien",
            type: "armenian",
            description: "Communication orale, compréhension de textes et productions écrites avec transmission culturelle."
        }
    ];

    return (
        <>
            <Header 
                animate={false} 
                imageSrc="../images/header/primaire-header.jpg" 
                headerText="PROGRAMME ÉDUCATIF AU PRIMAIRE" 
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
                            Dès l'entrée au primaire et tout au long de la formation, l'acquisition du français est au cœur de nos pratiques pédagogiques. Au-delà du contenu prévu au programme de formation de l'École québécoise, les enseignants planifient, en concertation, de nombreuses activités pédagogiques et éducatives favorisant l'apprentissage du français.
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
                            {cycles.map((cycle, index) => (
                                <CycleCard
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="h3" type="h4" color="primary" style={{ marginBottom: "10px" }}>
                                        {cycle.name}
                                    </Typography>
                                    <Typography as="h4" type="h5" color="secondaryDark" style={{ marginBottom: "15px" }}>
                                        {cycle.grades}
                                    </Typography>
                                    <Typography as="p" type="p" color="dark">
                                        {cycle.description}
                                    </Typography>
                                </CycleCard>
                            ))}
                        </CyclesContainer>
                    </motion.div>

                    <LanguageContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "20px" }}>
                            Apprentissage des Langues
                        </Typography>
                        <LanguageGrid>
                            {languages.map((lang, index) => (
                                <LanguageCard
                                    key={index}
                                    language={lang.type}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="h4" type="h5" color="primary" style={{ marginBottom: "15px" }}>
                                        {lang.name}
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
                            Enrichissement des Apprentissages
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                            Nos activités pédagogiques incluent : enrichissement du vocabulaire, stratégies favorisant la compréhension de la lecture, méthodologie de correction des écrits, situations variées permettant l'expression orale.
                        </Typography>
                        <Typography as="p" type="p" color="dark">
                            À travers une variété d'œuvres littéraires proposées aux élèves de la 1ère à la 6e année, y incluant les lectures d'été, nous tentons d'inculquer à nos élèves l'importance de la lecture dans tous les apprentissages.
                        </Typography>
                    </SectionContainer>

                    <SubjectAreasContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            Domaines d'Apprentissage
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                            L'expérimentation de logiciels outils et la réalisation de projets à l'aide des technologies de l'information enrichissent les apprentissages faits en classe dans les cinq différents domaines d'apprentissage :
                        </Typography>
                        <SubjectGrid>
                            {subjectAreas.map((subject, index) => (
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
                            Enseignement des Arts
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                            L'enseignement de l'art dramatique est assumé par les titulaires de classe tandis que les arts plastiques (1er cycle) et la musique (2e et 3e cycles) sont sous la responsabilité d'enseignants spécialistes.
                        </Typography>
                        <Typography as="p" type="p" color="dark">
                            Enfin, l'utilisation de méthodes de travail efficaces et le travail d'équipe sont d'autres compétences omniprésentes dans le travail de nos élèves du primaire.
                        </Typography>
                    </SectionContainer>

                    <TableContainer>
                        <div style={{ padding: "30px" }}>
                            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px", textAlign: "center" }}>
                                Maquette de Cours au Primaire
                            </Typography>
                            <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                                Les cours sont d'une durée de 60 minutes selon un horaire-semaine de cinq jours. Le tableau ci-dessous présente le nombre d'heures d'enseignement pour chacune des matières d'un cycle à l'autre de la 1ère à la 6e année.
                            </Typography>
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
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Footer />
        </>
    );
}
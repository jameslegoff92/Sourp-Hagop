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

const CyclesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin: 30px 0;
`;

const CycleCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-top: 5px solid var(--primary-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const SectionContainer = styled(motion.div)`
  background-color: rgba(0, 125, 195, 0.04);
  border-left: 4px solid var(--primary-color);
  padding: 30px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
`;

const EnrichedCurriculumContainer = styled.div`
  background: linear-gradient(135deg, var(--secondary-color) 0%, #f8f9fa 100%);
  padding: 35px;
  border-radius: 12px;
  margin: 30px 0;
  border: 1px solid #e9ecef;
`;

const ProgramOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 25px 0;
`;

const ProgramCard = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => {
    switch(props.program) {
      case 'sciences': return '#28a745';
      case 'humanities': return '#dc3545';
      case 'arts': return '#fd7e14';
      case 'math': return '#6f42c1';
      default: return '#007bff';
    }
  }};
`;

const ActivitiesContainer = styled.div`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  margin: 30px 0;
  border: 2px dashed var(--primary-color);
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const ActivityItem = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-top: 3px solid var(--primary-color);
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

export default function Secondaire() {
    const cycles = [
        {
            name: "1er cycle",
            grades: "1ère et 2e secondaire",
            focus: "Méthodes de travail",
            description: "La méthode de travail, l'organisation matérielle et l'étude efficace sont abordés et évalués dans tous les domaines d'apprentissage."
        },
        {
            name: "2e cycle", 
            grades: "3e, 4e et 5e secondaire",
            focus: "Communication de qualité",
            description: "Nous insistons davantage sur la qualité de la communication à l'oral comme à l'écrit : utiliser un vocabulaire juste et riche, formuler ses idées de façon claire et cohérente."
        }
    ];

    const programOptions = [
        {
            type: "sciences",
            title: "Programme Sciences",
            description: "Cours de chimie et physique pour les élèves de 5e secondaire",
            target: "Élèves orientés vers les sciences"
        },
        {
            type: "humanities", 
            title: "Programme Sciences Humaines",
            description: "Histoire du 20e siècle et cours d'entrepreneuriat",
            target: "Élèves orientés vers les sciences humaines"
        }
    ];

    const enrichedCourses = [
        {
            type: "arts",
            subject: "Arts plastiques",
            levels: "1ère à 4e secondaire",
            description: "Formation artistique complète"
        },
        {
            type: "arts",
            subject: "Art dramatique", 
            levels: "5e secondaire",
            description: "Pour les finissants"
        },
        {
            type: "math",
            subject: "Mathématiques enrichies",
            levels: "4e et 5e secondaire",
            description: "Séquence sciences naturelles"
        },
        {
            type: "languages",
            subject: "Anglais enrichi",
            levels: "Tous les niveaux",
            description: "Adapté au niveau avancé de nos élèves"
        }
    ];

    const extracurricularActivities = [
        "Sortie au théâtre",
        "Visite culturelle", 
        "Séjour à l'étranger",
        "Projet communautaire",
        "Projet humanitaire",
        "Compétition sportive"
    ];

    return (
        <>
            <Header 
                animate={false} 
                imageSrc="../images/header/secondaire-header.jpg" 
                headerText="PROGRAMME ÉDUCATIF AU SECONDAIRE" 
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
                            Au secondaire, l'enseignement tient compte des caractéristiques et des besoins particuliers des élèves. Notre approche pédagogique évolue selon les cycles pour développer progressivement l'autonomie et les compétences de communication de nos élèves.
                        </Typography>
                    </TextContainer>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h2" type="h2" color="primary" style={{ textAlign: "center", marginBottom: "30px" }}>
                            Les Deux Cycles du Secondaire
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
                                    <Typography as="h5" type="h6" color="primary" style={{ marginBottom: "15px", fontWeight: "600" }}>
                                        Focus: {cycle.focus}
                                    </Typography>
                                    <Typography as="p" type="p" color="dark">
                                        {cycle.description}
                                    </Typography>
                                </CycleCard>
                            ))}
                        </CyclesContainer>
                    </motion.div>

                    <SectionContainer
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            Approche Pédagogique : Résolution de Problèmes
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                            La résolution de problèmes demeure une approche pédagogique privilégiée dans tous les cours au secondaire. Chaque programme d'enseignement propose aux élèves des situations d'apprentissage qui nécessitent une analyse, une organisation d'idées et une démarche de résolution.
                        </Typography>
                        <Typography as="p" type="p" color="dark">
                            Exemples : réfléchir à une question d'éthique ou à un enjeu de société, résoudre un problème de mathématique, relever des arguments pour appuyer ses écrits ou entreprendre une démarche expérimentale en science et technologie.
                        </Typography>
                    </SectionContainer>

                    <EnrichedCurriculumContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "25px" }}>
                            Curriculum Enrichi
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "25px" }}>
                            Notre curriculum prévoit des cours enrichis qui répondent aux besoins spécifiques de nos élèves :
                        </Typography>
                        
                        <div style={{ display: "grid", gap: "20px" }}>
                            {enrichedCourses.map((course, index) => (
                                <ProgramCard
                                    key={index}
                                    program={course.type}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="h4" type="h5" color="primary" style={{ marginBottom: "10px" }}>
                                        {course.subject}
                                    </Typography>
                                    <Typography as="p" type="p" color="secondaryDark" style={{ marginBottom: "10px", fontWeight: "600" }}>
                                        {course.levels}
                                    </Typography>
                                    <Typography as="p" type="p" color="dark">
                                        {course.description}
                                    </Typography>
                                </ProgramCard>
                            ))}
                        </div>
                    </EnrichedCurriculumContainer>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "25px" }}>
                            Options de 5e Secondaire
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "25px" }}>
                            En 5e secondaire, nous proposons deux choix d'options qui tiennent compte du profil de nos élèves :
                        </Typography>
                        <ProgramOptionsContainer>
                            {programOptions.map((program, index) => (
                                <ProgramCard
                                    key={index}
                                    program={program.type}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="h4" type="h5" color="primary" style={{ marginBottom: "15px" }}>
                                        {program.title}
                                    </Typography>
                                    <Typography as="p" type="p" color="dark" style={{ marginBottom: "10px" }}>
                                        {program.description}
                                    </Typography>
                                    <Typography as="p" type="p" color="secondaryDark" style={{ fontStyle: "italic" }}>
                                        {program.target}
                                    </Typography>
                                </ProgramCard>
                            ))}
                        </ProgramOptionsContainer>
                    </motion.div>

                    <ActivitiesContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "20px" }}>
                            Activités Parascolaires et Projets Particuliers
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "25px" }}>
                            Des activités enrichissantes sont proposées en complément à la formation en classe pour parfaire la culture générale et l'expérience personnelle de nos élèves :
                        </Typography>
                        <ActivitiesGrid>
                            {extracurricularActivities.map((activity, index) => (
                                <ActivityItem
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="p" type="p" color="dark">
                                        {activity}
                                    </Typography>
                                </ActivityItem>
                            ))}
                        </ActivitiesGrid>
                        <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginTop: "20px", fontStyle: "italic" }}>
                            Ces activités permettent aux élèves de vivre des situations interpersonnelles harmonieuses élèves-enseignants dans des cadres hors scolaire.
                        </Typography>
                    </ActivitiesContainer>

                    <TableContainer>
                        <div style={{ padding: "30px" }}>
                            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px", textAlign: "center" }}>
                                Maquette de Cours au Secondaire
                            </Typography>
                            <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                                La grille-horaire du secondaire est conçue pour offrir une formation complète et équilibrée, incluant les cours obligatoires du ministère et nos cours enrichis.
                            </Typography>
                            <TableNote>
                                <Typography as="p" type="p" color="dark">
                                    📊 Grille-horaire détaillée et répartition des cours disponibles sur demande
                                </Typography>
                            </TableNote>
                        </div>
                    </TableContainer>
                </MotionDiv>
            </StyledDiv>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Footer />
        </>
    );
}
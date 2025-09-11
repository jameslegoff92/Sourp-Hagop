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
  text-align: center;
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

const CompetenceContainer = styled.div`
  margin: 40px 0;
`;

const CompetenceItem = styled(motion.div)`
  background-color: rgba(0, 125, 195, 0.04);
  border-left: 4px solid var(--primary-color);
  padding: 24px;
  margin: 20px 0;
  border-radius: 0 8px 8px 0;
`;

const ScheduleContainer = styled.div`
  background-color: var(--secondary-color);
  padding: 30px;
  border-radius: 8px;
  margin: 30px 0;
`;

const SpecializedCoursesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const CourseCard = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 3px solid var(--primary-color);
`;

const EvaluationContainer = styled.div`
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  margin: 30px 0;
`;

const GradeScale = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const GradeItem = styled.div`
  background: white;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid ${props => {
    switch(props.grade) {
      case 'A': return '#28a745';
      case 'B': return '#17a2b8'; 
      case 'C': return '#ffc107';
      case 'D': return '#dc3545';
      default: return '#6c757d';
    }
  }};
`;

export default function Prescolaire() {
    const competences = [
        {
            title: "Compétence 1: Se développer sur le plan sensoriel et moteur",
            description: "L'élève se déplace et manipule des objets de façon sécuritaire. L'élève apprend à utiliser les outils et le matériel à sa disposition (coloriage, découpage, pré-écriture). L'élève reconnaît des façons d'assurer son bien-être. L'élève adapte ses actions à son environnement physique."
        },
        {
            title: "Compétence 2 : Développer sa personnalité",
            description: "L'élève exprime ses goûts, ses intérêts, ses idées, ses sentiments et ses émotions de façon pertinente. L'élève manifeste de l'autonomie et de l'assurance à travers la vie quotidienne de la classe. L'élève se fait reconnaître comme personne et en ce qui le distingue des autres. L'élève est capable de gérer ses émotions. L'élève demande de l'aide au besoin."
        },
        {
            title: "Compétence 3 : Entrer en relation avec les autres",
            description: "L'élève manifeste des gestes d'ouverture aux autres. L'élève participe à la vie de groupe. L'élève écoute les autres. L'élève respecte les règles de vie du groupe."
        },
        {
            title: "Compétence 4 : Communiquer oralement",
            description: "L'élève écoute les autres à la causerie. L'élève respecte le sujet de discussion. L'élève exprime ses idées de manière structurée en utilisant un vocabulaire approprié."
        },
        {
            title: "Compétence 5 : Se familiariser avec son environnement",
            description: "L'élève manifeste de l'intérêt, de la curiosité pour différents domaines d'apprentissage : les arts, l'univers social, la mathématique, la science et la technologie. L'élève se questionne sur ce qui l'entoure. L'élève partage ses découvertes. L'élève fait preuve de créativité."
        },
        {
            title: "Compétence 6 : Mener à terme des projets et des activités",
            description: "L'élève réalise des projets personnels ou de groupe à sa mesure. L'élève réutilise ses connaissances antérieures pour planifier son projet. L'élève présente son projet. L'élève fait part des connaissances qu'il a acquises. L'élève partage son matériel et ses jeux."
        }
    ];

    const specializedCourses = [
        { name: "Arts plastiques", duration: "120 minutes par semaine" },
        { name: "Éducation physique", duration: "180 minutes par semaine" },
        { name: "Arménien", duration: "360 minutes par semaine" }
    ];

    const gradeScale = [
        { grade: "A", description: "l'élève se développe très bien" },
        { grade: "B", description: "l'élève se développe adéquatement" },
        { grade: "C", description: "l'élève se développe avec certaines difficultés" },
        { grade: "D", description: "l'élève éprouve des difficultés importantes" }
    ];

    return (
        <>
            <Header 
                animate={false} 
                imageSrc="../images/header/prescolaire-header.jpg" 
                headerText="PROGRAMME ÉDUCATIF AU PRÉSCOLAIRE" 
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
                            L'enseignant du préscolaire planifie des activités et des projets visant à développer chez ses élèves les six compétences définies dans le programme de formation de l'École québécoise. Les activités prennent la forme de causeries, de chants, de comptines, de bricolage, de peinture, d'activités d'éveil à la lecture et aux mathématiques. Ces activités pédagogiques sont présentées aux élèves soit en ateliers libres ou obligatoires selon la planification de l'enseignante. Des ateliers de lecture sont aussi prévus chaque semaine en collaboration avec nos personnes-ressources.
                        </Typography>
                    </TextContainer>

                    <ScheduleContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            Cours spécialisés
                        </Typography>
                        <Typography as="p" type="h6" color="dark" style={{ marginBottom: "20px" }}>
                            En plus des activités pédagogiques, des cours spécialisés sont aussi intégrés à l'horaire à des périodes fixes :
                        </Typography>
                        <SpecializedCoursesContainer>
                            {specializedCourses.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Typography as="h4" type="h5" color="primary" style={{ marginBottom: "10px" }}>
                                        {course.name}
                                    </Typography>
                                    <Typography as="p" type="p" color="dark">
                                        {course.duration}
                                    </Typography>
                                </CourseCard>
                            ))}
                        </SpecializedCoursesContainer>
                    </ScheduleContainer>

                    <CompetenceContainer>
                        <Typography
                            as="h2"
                            type="h2"
                            color="primary"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: "30px", textAlign: "center" }}
                        >
                            Les Six Compétences
                        </Typography>
                        
                        {competences.map((competence, index) => (
                            <CompetenceItem
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Typography as="h3" type="h4" color="primary" style={{ marginBottom: "15px" }}>
                                    {competence.title}
                                </Typography>
                                <Typography as="p" type="p" color="dark">
                                    {competence.description}
                                </Typography>
                            </CompetenceItem>
                        ))}
                    </CompetenceContainer>

                    <EvaluationContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            Évaluation
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                            L'enseignant titulaire du groupe est responsable de l'évaluation de chacun de ses élèves, et recueille ainsi des données (observations, travaux, réalisations, etc.) qui lui permettent de porter un jugement sur les progrès accomplis par l'enfant au cours d'une étape et ce, à l'aide de grilles d'évaluation. L'enseignant s'appuie également sur les observations faites par ses collègues spécialistes dans le cadre des cours d'éducation physique, d'arts plastiques et d'arménien avant de déterminer le niveau de développement de chacune des compétences évaluées.
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                            L'évaluation est établie et communiquée au bulletin à l'aide d'une cote selon la légende suivante :
                        </Typography>
                        <GradeScale>
                            {gradeScale.map((grade, index) => (
                                <GradeItem key={index} grade={grade.grade}>
                                    <Typography as="span" type="h5" color="primary" style={{ marginRight: "10px" }}>
                                        {grade.grade} :
                                    </Typography>
                                    <Typography as="span" type="p" color="dark">
                                        {grade.description}
                                    </Typography>
                                </GradeItem>
                            ))}
                        </GradeScale>
                    </EvaluationContainer>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ textAlign: "center", marginTop: "50px" }}
                    >
                        <Typography as="h3" type="h3" color="primary">
                            Horaire type d'une journée en préscolaire
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginTop: "20px" }}>
                            Contactez-nous pour obtenir plus d'informations sur l'horaire détaillé.
                        </Typography>
                    </motion.div>
                </MotionDiv>
            </StyledDiv>
            <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }}/>
            <Footer />
        </>
    );
}
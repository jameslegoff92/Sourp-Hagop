"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
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

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: left;
`;

const SectionContainer = styled(motion.div)`
  background-color: rgba(0, 125, 195, 0.04);
  border-left: 4px solid var(--primary-color);
  padding: 30px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
  text-align: left;
`;

const ActivitiesContainer = styled.div`
  background: linear-gradient(135deg, var(--secondary-color) 0%, #f8f9fa 100%);
  padding: 35px;
  border-radius: 12px;
  margin: 30px 0;
  border: 1px solid #e9ecef;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 25px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityItem = styled(motion.div)`
  background: white;
  padding: 25px 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-top: 3px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ActivityIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 25px 0;
`;

const CourseCard = styled(motion.div, {
    shouldForwardProp: (prop) => prop !== 'accentColor'
})`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.accentColor || 'var(--primary-color)'};
  text-align: center;
`;

const CourseIcon = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

const CourseHours = styled.div`
  background: ${props => props.bg || 'rgba(0, 125, 195, 0.1)'};
  color: ${props => props.color || 'var(--primary-color)'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
  margin-top: 10px;
`;

const EvaluationContainer = styled(motion.div)`
  background-color: rgba(0, 125, 195, 0.04);
  border-left: 4px solid var(--primary-color);
  padding: 30px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
  text-align: left;
`;

const GradeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 25px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GradeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

const GradeBadge = styled.span`
  min-width: 35px;
  height: 35px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: white;
  background: ${props => {
        switch (props.grade) {
            case 'A': return '#28a745';
            case 'B': return '#007bff';
            case 'C': return '#ffc107';
            case 'D': return '#dc3545';
            default: return 'var(--primary-color)';
        }
    }};
`;

const CompetenciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin: 30px 0;
`;

const CompetencyCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-top: 5px solid var(--primary-color);
  text-align: left;
`;

const CompetencyNumber = styled.div`
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const CompetencyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
`;

const CompetencyListItem = styled.li`
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  color: var(--dark-color);
  font-size: 0.95rem;
  line-height: 1.5;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
  }
`;

const TableNote = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #ffc107;
`;

// Helper function to get background color from accent color
const getBgColor = (color) => {
    switch (color) {
        case '#fd7e14': return 'rgba(253, 126, 20, 0.1)';
        case '#28a745': return 'rgba(40, 167, 69, 0.1)';
        case '#dc3545': return 'rgba(220, 53, 69, 0.1)';
        case '#6f42c1': return 'rgba(111, 66, 193, 0.1)';
        default: return 'rgba(0, 125, 195, 0.1)';
    }
};

export default function Prescolaire({ data }) {
    return (
        <>
            <Header
                animate={false}
                imageSrc={data?.headerImageUrl || "../images/header/prescolaire-header.jpg"}
                headerText={data?.headerText}
                headerTextTop="70%"
            />

            <StyledDiv>
                <MotionDiv>
                    {/* Introduction */}
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

                    {/* Activities Section */}
                    <ActivitiesContainer>
                        <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "15px" }}>
                            {data?.activitiesTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "20px" }}>
                            {data?.activitiesDescription}
                        </Typography>

                        <ActivitiesGrid>
                            {data?.activities?.map((activity, index) => (
                                <ActivityItem
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <ActivityIcon src={activity.iconUrl} alt={activity.title} />
                                    <Typography as="p" type="h6" color="dark">
                                        {activity.title}
                                    </Typography>
                                </ActivityItem>
                            ))}
                        </ActivitiesGrid>
                    </ActivitiesContainer>

                    {/* Specialized Courses */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h2" type="h2" color="primary" style={{ textAlign: "center", marginBottom: "30px" }}>
                            {data?.coursesTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "20px" }}>
                            {data?.coursesDescription}
                        </Typography>

                        <CoursesGrid>
                        {data?.specializedCourses?.map((course, index) => (
                            <CourseCard
                            key={index}
                            accentColor={course.color}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            >
                            <CourseIcon src={course.iconUrl} alt={course.title} />
                            <Typography as="h4" type="h5" color="primary" style={{ margin: "15px 0 5px" }}>
                                {course.title}
                            </Typography>
                            <CourseHours bg={getBgColor(course.color)} color={course.color}>
                                {course.hours}
                            </CourseHours>
                            </CourseCard>
                        ))}
                        </CoursesGrid>
                    </motion.div>

                    {/* Evaluation Section */}
                    <EvaluationContainer
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "15px" }}>
                            {data?.evaluationTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark">
                            {data?.evaluationDescription}
                        </Typography>

                        <GradeGrid>
                            {data?.grades?.map((grade, index) => (
                                <GradeItem key={index}>
                                    <GradeBadge grade={grade.letter}>{grade.letter}</GradeBadge>
                                    <Typography as="p" type="p" color="dark" style={{ fontSize: "0.95rem" }}>
                                        {grade.description}
                                    </Typography>
                                </GradeItem>
                            ))}
                        </GradeGrid>
                    </EvaluationContainer>

                    {/* Competencies Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h2" type="h2" color="primary" style={{ textAlign: "center", marginBottom: "15px" }}>
                            {data?.competenciesTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "30px" }}>
                            {data?.competenciesSubtitle}
                        </Typography>

                        <CompetenciesGrid>
                            {data?.competencies?.map((comp, index) => (
                                <CompetencyCard
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <CompetencyNumber>{comp.number}</CompetencyNumber>
                                    <Typography as="h4" type="h5" color="primary" style={{ marginBottom: "10px" }}>
                                        {comp.title}
                                    </Typography>
                                    <CompetencyList>
                                        {comp.items?.map((item, i) => (
                                            <CompetencyListItem key={i}>{item}</CompetencyListItem>
                                        ))}
                                    </CompetencyList>
                                </CompetencyCard>
                            ))}
                        </CompetenciesGrid>
                    </motion.div>

                    {/* Daily Schedule */}
                    <SectionContainer
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
                            {data?.scheduleTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginBottom: "15px" }}>
                            {data?.scheduleDescription}
                        </Typography>
                        {data?.scheduleNote && (
                            <TableNote>
                                <Typography as="p" type="p" color="dark">
                                    {data.scheduleNote}
                                </Typography>
                            </TableNote>
                        )}
                    </SectionContainer>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ textAlign: "center", marginTop: "30px" }}
                    >
                        <Typography as="h3" type="h3" color="primary">
                            {data?.contactTitle}
                        </Typography>
                        <Typography as="p" type="p" color="dark" style={{ marginTop: "15px" }}>
                            {data?.contactDescription}
                        </Typography>
                    </motion.div>
                </MotionDiv>
            </StyledDiv>

            <Footer />
        </>
    );
}
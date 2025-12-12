"use client";

import Header from "./ui/Header";
import Footer from "./ui/Footer";
import Typography from "./display/Typography";
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

const CyclesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin: 30px 0;

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
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  
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
  transition: transform 0.4s ease;
`;

const CycleFocus = styled.div`
  font-weight: 600;
  margin-top: 5px;
`;

const CycleDetails = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  margin-top: 15px;
  max-height: 0;
  overflow: hidden;
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

const ProgramCard = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'program'
})`
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
      case 'languages': return '#007bff';
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
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ActivityItem = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-top: 3px solid var(--primary-color);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function Secondaire({ data }) {
  return (
    <>
      <Header 
        animate={false} 
        imageSrc={data?.headerImageUrl} 
        headerText={data?.headerText} 
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

          {/* Cycles Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography as="h2" type="h2" color="primary" style={{ textAlign: "center", marginBottom: "30px" }}>
              {data?.cyclesTitle}
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
                      <Typography as="h4" type="h5" color="light" style={{ opacity: 0.9, marginTop: "5px" }}>
                        {cycle.grades}
                      </Typography>
                    </CycleName>

                    <CycleDetails className="cycle-details">
                      <CycleFocus>
                        <Typography as="p" type="p" color="light" style={{ fontWeight: "600" }}>
                          Focus: {cycle.focus}
                        </Typography>
                      </CycleFocus>
                      <Typography as="p" type="p" color="light" style={{ opacity: 0.9, marginTop: "10px" }}>
                        {cycle.description}
                      </Typography>
                    </CycleDetails>
                  </CycleContent>
                </CycleCard>
              ))}
            </CyclesContainer>
          </motion.div>

          {/* Pedagogy Section */}
          <SectionContainer
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px" }}>
              {data?.pedagogyTitle}
            </Typography>
            <PortableText
              value={data?.pedagogyContent}
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

          {/* Enriched Curriculum Section */}
          <EnrichedCurriculumContainer>
            <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "25px" }}>
              {data?.enrichedTitle}
            </Typography>
            <Typography as="p" type="p" color="dark" style={{ marginBottom: "25px" }}>
              {data?.enrichedIntro}
            </Typography>
            
            <div style={{ display: "grid", gap: "20px" }}>
              {data?.enrichedCourses?.map((course, index) => (
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

          {/* Program Options Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "25px" }}>
              {data?.optionsTitle}
            </Typography>
            <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "25px" }}>
              {data?.optionsIntro}
            </Typography>
            <ProgramOptionsContainer>
              {data?.programOptions?.map((program, index) => (
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

          {/* Activities Section */}
          <ActivitiesContainer>
            <Typography as="h3" type="h3" color="primary" style={{ textAlign: "center", marginBottom: "20px" }}>
              {data?.activitiesTitle}
            </Typography>
            <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginBottom: "25px" }}>
              {data?.activitiesIntro}
            </Typography>
            <ActivitiesGrid>
              {data?.activities?.map((activity, index) => (
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
            {data?.activitiesNote && (
              <Typography as="p" type="p" color="dark" style={{ textAlign: "center", marginTop: "20px", fontStyle: "italic" }}>
                {data.activitiesNote}
              </Typography>
            )}
          </ActivitiesContainer>

          {/* Maquette Section */}
          <TableContainer>
            <div style={{ padding: "30px" }}>
              <Typography as="h3" type="h3" color="primary" style={{ marginBottom: "20px", textAlign: "center" }}>
                {data?.maquetteTitle}
              </Typography>
              <Typography as="p" type="p" color="dark" style={{ marginBottom: "20px" }}>
                {data?.maquetteContent}
              </Typography>
              {data?.maquetteNote && (
                <TableNote>
                  <Typography as="p" type="p" color="dark">
                    📊 {data.maquetteNote}
                  </Typography>
                </TableNote>
              )}
            </div>
          </TableContainer>
        </MotionDiv>
      </StyledDiv>
      <Footer />
    </>
  );
}
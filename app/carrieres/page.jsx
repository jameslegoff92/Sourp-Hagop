"use client";

import { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import BackgroundLogo from "../../components/ui/BackgroundLogo";
import Typography from "../../components/display/Typography";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { createClient } from "@sanity/client";
import { getCareerPage } from "../../lib/sanity-queries";
import CareerModal from "../../components/modal/careerModal";

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
  width: 90%;
  max-width: 1200px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin: 40px 0;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const JobCard = styled(motion.div)`
  background: white;
  border: 1px solid #e8f4fd;
      box-shadow: 0 2px 30px rgba(0, 125, 195, 0.15);

  overflow: visible;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 520px;
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background-color: #f8fbff;
  @media (max-width: 768px) {
    height: 160px;
  }
`;

const CircularBadge = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  text-align: center;
  line-height: 1.1;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  &.unavailable {
    background: #f4f4f5;
    color: #9ca3af;
  }
  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
    font-size: 0.7rem;
    top: -16px;
    right: -16px;
  }
`;

const BadgeNumber = styled.div`
  font-size: 1.0rem;
  font-weight: 700;
  margin-bottom: 2px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  text-align: left;
  flex: 1 1 auto;
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.3;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const JobLocation = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 16px;
  font-weight: 500;
`;

const JobDescription = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 0.95rem;
`;

const JobDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const JobTag = styled.span`
  background: linear-gradient(135deg, #f0f8ff 0%, #e8f4fd 100%);
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e8f4fd;
`;

const PillButton = styled.button`
  background: ${p => (p.disabled ? "#f3f4f6" : "var(--primary-color)")};
  color: ${p => (p.disabled ? "#9ca3af" : "white")};
  border: none;
  padding: 14px 22px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  min-width: 190px;
  text-align: center;
  &:hover:not(:disabled) {
    background: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;


function blocksToPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter(b => b._type === "block")
    .map(b => (b.children || []).map(c => c.text).join(""))
    .join("\n\n");
}

export default function CareerPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let mounted = true;
    getCareerPage()
      .then(res => { if (mounted) { setData(res); setLoading(false); } })
      .catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const jobs = data?.jobs || [];

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImage?.asset?.url || "../images/header/careers-header.jpg"}
        headerText={data?.headerText || "REJOIGNEZ NOTRE ÉQUIPE"}
        headerTextTop="70%"
      />

      <StyledDiv>
        <MotionDiv>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TextContainer>
              <Typography
                as="p"
                type="h6"
                color="dark"

              >
                {blocksToPlainText(data?.introText)}
              </Typography>
            </TextContainer>
          </motion.div>

          <CardsGrid>
            {loading ? (
              // Show 3 placeholder cards while loading
              Array.from({ length: 3 }).map((_, i) => (
                <JobCard key={`placeholder-${i}`} />
              ))
            ) : jobs.length === 0 ? (
              // If no jobs in Sanity, show friendly message

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TextContainer>
              <Typography
                as="p"
                type="h3"
                style={{ color: "var(--primary-color)" }}
              >
                Aucune offre disponible pour l’instant

              </Typography>
              <Typography
                as="p"
                type="h6"
                color="dark"
              >
                Restez à l’affût de nos prochaines opportunités !
              </Typography>
            </TextContainer>
          </motion.div>

            ) : (
              // Otherwise render jobs
              jobs.map((job, index) => (
                <JobCard
                  key={job._key || job._id || `job-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CardImage
                    style={{
                      backgroundImage: job.image?.asset?.url
                        ? `url('${job.image.asset.url}')`
                        : "none",
                    }}
                  >
                    <CircularBadge className={job.postsAvailable === 0 ? "unavailable" : ""}>
                      <BadgeNumber>
                        {typeof job.postsAvailable === "number" ? job.postsAvailable : 0}
                      </BadgeNumber>
                      {job.postsAvailable === 1 ? "POSTE" : "POSTES"}
                      <br />
                      disponible{job.postsAvailable > 1 ? "s" : ""}
                    </CircularBadge>
                  </CardImage>

                  <CardContent>
                    <JobTitle>{job.title}</JobTitle>
                    <JobLocation>{job.level}</JobLocation>

                    <JobDescription>
                      {typeof job.description === "string"
                        ? job.description
                        : blocksToPlainText(job.description)}
                    </JobDescription>

                    <JobDetails>
                      {job.type && <JobTag>{job.type}</JobTag>}
                      {job.location && <JobTag>{job.location}</JobTag>}
                      {Array.isArray(job.tags) &&
                        job.tags.slice(0, 2).map((tag, i) => <JobTag key={i}>{tag}</JobTag>)}
                    </JobDetails>

                    <CardFooter>
                      <PillButton
                        disabled={job.postsAvailable === 0}
                        onClick={() => job.postsAvailable > 0 && setSelectedJob(job)}
                      >
                        {job.postsAvailable === 0
                          ? "Aucun poste disponible pour ce rôle"
                          : "Postuler maintenant"}
                      </PillButton>
                    </CardFooter>
                  </CardContent>
                </JobCard>
              ))
            )}
          </CardsGrid>
        </MotionDiv>
      </StyledDiv>
      <CareerModal
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
      />
      {/* <BackgroundLogo src="../images/logo-big.svg" style={{ marginLeft: "200px" }} /> */}
      <Footer />
    </>
  );
}
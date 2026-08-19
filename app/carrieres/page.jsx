"use client";

import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Typography from "@/components/display/Typography";
import CareerDetailModal from "@/components/modal/careerDetailModal";
import { useLocale } from "@/components/display/LangContext";
import { getCareerPage } from "@/lib/sanity-queries";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function blocksToPlainText(blocks = []) {
  return blocks
    .filter(b => b._type === "block")
    .map(b => (b.children || []).map(c => c.text).join(""))
    .join("\n\n");
}

function toSentenceCase(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('fr-CA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

const FALLBACK_IMAGE = "../images/logo-big.svg";

// ─── Layout ──────────────────────────────────────────────────────────────────

const Page = styled.div`
  text-align: center;
  padding: 10px 0 150px;
  position: relative;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin: 50px auto 0;
  width: 90%;
  max-width: 1200px;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

// ─── Grid ────────────────────────────────────────────────────────────────────

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 40px 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ─── Card ────────────────────────────────────────────────────────────────────

const CardWrapper = styled.div`
  position: relative;
`;

const Card = styled(motion.div)`
  position: relative;
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border-radius: 20px;
  padding: 0 1.5rem;
  min-height: 502px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid rgba(0, 125, 195, 0.1);
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), #00a8e8);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(0, 125, 195, 0.3);
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover .engagement-icon {
    transform: scale(1.15) rotate(5deg);
  }

  &:hover .engagement-title {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    min-height: 240px;
    padding: 1.5rem 1rem;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f8fbff;
  background-image: ${p => `url('${p.src}')`};
  background-size: ${p => (p.isFallback ? "30%" : "cover")};
  background-position: ${p => (p.isFallback ? "57% center" : "center")};
  background-repeat: no-repeat;
  opacity: ${p => (p.isFallback ? 0.3 : 1)};
  flex-shrink: 0;
`;

const Badge = styled.div`
  position: absolute;
  top: -16px;
  right: -16px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${p => (p.unavailable ? "#f4f4f5" : "var(--primary-color)")};
  color: ${p => (p.unavailable ? "#9ca3af" : "white")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  text-align: center;
  line-height: 1.2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 1;
`;

const BadgeCount = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 24px 20px 20px;
`;

const Title = styled.h3`
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 6px;
  line-height: 1.35;
  height: calc(1.05rem * 1.35 * 2); /* exactly 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Level = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 12px;
`;

const ShortDesc = styled.div`
  color: #6b7280;
  font-size: 0.88rem;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  p { margin: 0; }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #f0f8ff, #e8f4fd);
  color: var(--primary-color);
  border: 1px solid #e8f4fd;
  padding: 5px 11px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 13px 20px;
  border-radius: 50px;
  border: 1px solid ${p => (p.disabled ? "transparent" : "var(--primary-color)")};
  background: ${p => (p.disabled ? "#f3f4f6" : "var(--primary-color)")};
  color: ${p => (p.disabled ? "#9ca3af" : "white")};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  transition: background 0.25s ease, color 0.25s ease;

  &:hover:not(:disabled) {
    background: transparent;
    color: var(--primary-color);
  }
`;

// ─── Skeleton & Empty ─────────────────────────────────────────────────────────

const SkeletonCard = styled.div`
  height: 380px;
  background: linear-gradient(90deg, #f0f8ff 25%, #e8f4fd 50%, #f0f8ff 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const EmptyState = styled(motion.div)`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 0;
`;

// ─── JobCard ──────────────────────────────────────────────────────────────────

function JobCard({ job, index, onSelect }) {
  const hasPosts = job.postsAvailable > 0;
  const hasImage = !!job.image?.asset?.url;
  const typeTags = [job.type].filter(Boolean);
  const locationTags = job.location ? [job.location] : [];
  const { locale } = useLocale();

  return (
    <CardWrapper>
      <Card
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        viewport={{ once: true }}
      >
        <Thumbnail
          src={hasImage ? job.image.asset.url : FALLBACK_IMAGE}
          isFallback={!hasImage}
        />

        <Content>
          <div>
            <Title>{toSentenceCase(job.title?.[locale] ?? job.title?.fr)}</Title>
            {job.level && <Level>{job.level}</Level>}

            {Array.isArray(job.shortDescription) && job.shortDescription.length > 0 && (
              <ShortDesc>
                <PortableText value={job.shortDescription} />
              </ShortDesc>
            )}

            {(typeTags.length > 0 || locationTags.length > 0 || job.deadline) && (
              <Tags>
                {typeTags.map((tag, i) => (
                  <Tag key={`type-${i}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {tag}
                  </Tag>
                ))}
                {locationTags.map((tag, i) => (
                  <Tag key={`loc-${i}`}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {tag}
                  </Tag>
                ))}
                {job.deadline && (
                  <Tag>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {formatDate(job.deadline)}
                  </Tag>
                )}
              </Tags>
            )}
          </div>

          <ApplyButton disabled={!hasPosts} onClick={() => hasPosts && onSelect(job)}>
            {hasPosts ? "Voir l'offre" : "Aucun poste disponible"}
          </ApplyButton>
        </Content>
      </Card>

        <Badge unavailable={!hasPosts}>
          <BadgeCount>{job.postsAvailable ?? 0}</BadgeCount>
          {job.postsAvailable === 1 ? "POSTE" : "POSTES"}
          <br />dispo.
        </Badge>
    </CardWrapper>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareerPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let active = true;
    getCareerPage()
      .then(res => active && setData(res))
      .catch(console.error)
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const { locale } = useLocale();

  const headerText = data?.[locale]?.headerText ?? data?.fr?.headerText;
  const jobs = data?.jobs || [];

  return (
    <>
      <Header
        animate={false}
        imageSrc={data?.headerImage?.asset?.url}
        headerText={headerText || "REJOIGNEZ NOTRE ÉQUIPE"}
        headerTextTop="70%"
      />

      <Page>
        <Container>
          {data?.introText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography as="p" type="h6" color="dark">
                {blocksToPlainText(data.introText)}
              </Typography>
            </motion.div>
          )}

          <Grid>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            ) : jobs.length === 0 ? (
              <EmptyState
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Typography as="p" type="h3" style={{ color: "var(--primary-color)" }}>
                  Aucune offre disponible pour l'instant
                </Typography>
                <Typography as="p" type="h6" color="dark">
                  Restez à l'affût de nos prochaines opportunités !
                </Typography>
              </EmptyState>
            ) : (
              jobs.map((job, i) => (
                <JobCard
                  key={job._key || i}
                  job={job}
                  index={i}
                  onSelect={setSelectedJob}
                />
              ))
            )}
          </Grid>
        </Container>
      </Page>

      <CareerDetailModal
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
        applicationNote={data?.applicationNote}
      />

      <Footer />
    </>
  );
}
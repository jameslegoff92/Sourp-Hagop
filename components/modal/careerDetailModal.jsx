"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocale } from "@/components/display/LangContext";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import CareerModal from "./careerModal";

const SECTION_TITLES = {
  intro: null,
  description: "DESCRIPTION DU POSTE",
  profil: 'PROFIL CHERCHÉ',
  responsabilites: "PRINCIPALES RESPONSABILITÉS",
  conditions: "CONDITIONS DE TRAVAIL ET AVANTAGES",
  exigences: "EXIGENCES",
}

function toSentenceCase(str = "") {
  if (!str || typeof str !== "string") return str?.fr ?? "";
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

function getSectionTitle(section, locale) {
  if (section.sectionType === 'autre') {
    const title = section.customTitle?.[locale] ?? section.customTitle?.fr ?? 'INFORMATION ADDITIONNELLE'
    return title.toUpperCase()
  }
  return SECTION_TITLES[section.sectionType] ?? null
}

// ─── Shell ────────────────────────────────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  z-index: 80;
  padding: 20px;
`;

const Panel = styled(motion.div)`
  width: min(820px, 92vw);
  max-height: 90vh;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = styled.div`
  background: linear-gradient(135deg, var(--primary-color), #004799);
  color: white;
  padding: 32px 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.2s;
  &:hover { background: rgba(255, 255, 255, 0.28); }
`;

const HeaderEyebrow = styled.span`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
`;

const JobTitle = styled.h2`
  font-family: var(--primary-ff), sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  padding-right: 44px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.span`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

// ─── Body ─────────────────────────────────────────────────────────────────────

const Body = styled.div`
  overflow-y: auto;
  padding: 32px 36px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FootNote = styled.p`
  font-size: 0.82rem;
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SectionTitle = styled.h3`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--primary-color);
  margin: 0;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 36px;
    height: 2px;
    background: var(--primary-color);
  }
`;

const SectionBody = styled.div`
  p            { color: #4b5563; line-height: 1.8; margin: 0 0 10px; font-size: 0.95rem; }
  h1,h2,h3,h4 { color: #1f2937; margin: 16px 0 6px; font-weight: 700; font-family: var(--primary-ff), sans-serif; }
  ul, ol       { color: #4b5563; padding-left: 22px; margin: 0 0 10px; line-height: 1.8; }
  li           { margin-bottom: 4px; }
  strong       { color: #1f2937; }
`;

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = styled.div`
  padding: 16px 36px 28px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid rgba(0, 125, 195, 0.1);
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  border-radius: 999px;
  padding: 13px 30px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid ${p => p.variant === "primary" ? "var(--primary-color)" : "#e5e7eb"};
  background: ${p => p.variant === "primary" ? "var(--primary-color)" : "#f3f4f6"};
  color: ${p => p.variant === "primary" ? "white" : "#374151"};

  &:hover {
    background: ${p => p.variant === "primary" ? "transparent" : "#e9ecef"};
    color: ${p => p.variant === "primary" ? "var(--primary-color)" : "#111827"};
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CareerDetailModal({ open, onClose, job, applicationNote }) {

  const { locale } = useLocale(); 
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = e => e.key === "Escape" && !applyOpen && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, applyOpen]);

  const visibleTags = [job?.level, job?.type, job?.location].filter(Boolean);
  const sections = Array.isArray(job?.sections) ? job.sections : [];

  return (
    <>
      <AnimatePresence>
        {open && job && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          >
            <Panel
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
            >
              <Header>
                <CloseButton onClick={onClose} aria-label="Fermer">✕</CloseButton>
                <HeaderEyebrow>Offre d'emploi</HeaderEyebrow>
                <JobTitle>{toSentenceCase(job.title)}</JobTitle>
                {visibleTags.length > 0 && (
                <Tags>
                    {visibleTags.map((tag, i) => <Pill key={i}>{tag}</Pill>)}
                    {job?.deadline && (
                    <Pill>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Jusqu'au {formatDate(job.deadline)}
                    </Pill>
                    )}
                </Tags>
                )}
              </Header>

              <Body>
                {sections.length === 0 && (
                  <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
                    Aucune description disponible.
                  </p>
                )}
                {sections.map((section, i) => {
                const title = getSectionTitle(section, locale)
                const content = section.content?.[locale] ?? section.content?.fr ?? []

                return (
                    <Section key={section._key || i}>
                    {title && <SectionTitle>{title}</SectionTitle>}
                    {Array.isArray(content) && content.length > 0 && (
                        <SectionBody>
                        <PortableText value={content} />
                        </SectionBody>
                    )}
                    </Section>
                )
                })}
                {applicationNote && <FootNote>{applicationNote?.[locale] ?? applicationNote?.fr}</FootNote>}
              </Body>

              <Footer>
                <ActionButton onClick={onClose}>Fermer</ActionButton>
                <ActionButton variant="primary" onClick={() => setApplyOpen(true)}>
                  Postuler maintenant
                </ActionButton>
              </Footer>
            </Panel>
          </Overlay>
        )}
      </AnimatePresence>

      <CareerModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        job={job}
      />
    </>
  );
}
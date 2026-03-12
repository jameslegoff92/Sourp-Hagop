"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ─────────────────────────────────────────────
   OVERLAY & PANEL
───────────────────────────────────────────── */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const Panel = styled(motion.div)`
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 880px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.2);

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 96, 150, 0.15) transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: rgba(0, 96, 150, 0.15); border-radius: 99px; }
`;

/* Blue top accent bar */
const PanelAccent = styled.div`
  height: 3px;
  background: #007dc3;
  border-radius: 20px 20px 0 0;
`;

const PanelInner = styled.div`
  padding: 2rem 2rem 2.5rem;

  @media (min-width: 768px) { padding: 2.5rem 3rem 3rem; }
`;

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  gap: 1rem;
`;

const TitleGroup = styled.div``;

const ModalTitle = styled.h2`
  font-family: var(--secondary-ff), sans-serif;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  font-weight: 700;
  color: #006096;
  margin: 0 0 0.35rem 0;
  letter-spacing: 0.01em;
`;

const TitleAccent = styled.div`
  width: 40px;
  height: 2px;
  background: #007dc3;
`;

const CloseBtn = styled(motion.button)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(0, 96, 150, 0.15);
  background: rgba(0, 96, 150, 0.05);
  color: #006096;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
`;

/* ─────────────────────────────────────────────
   CAROUSEL
───────────────────────────────────────────── */
const CarouselOuter = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.75rem;
  border-radius: 12px;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  border-radius: 12px;
  position: relative;

  @media (min-width: 768px) { height: 340px; }
`;

const CarouselInner = styled(motion.div)`
  display: flex;
  height: 100%;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const ArrowBtn = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #006096;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  -webkit-tap-highlight-color: transparent;
`;

const LeftArrow = styled(ArrowBtn)`left: 12px;`;
const RightArrow = styled(ArrowBtn)`right: 12px;`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 0.75rem;
`;

const Dot = styled.button`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${p => p.active ? "#007dc3" : "rgba(0, 96, 150, 0.2)"};
  transition: background 0.2s;
`;

/* ─────────────────────────────────────────────
   DETAILS TABLE
───────────────────────────────────────────── */
const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 96, 150, 0.07);
  &:last-child { border-bottom: none; }
`;

const TableCell = styled.td`
  padding: 0.75rem 0.5rem;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.9rem;

  &:first-of-type {
    font-weight: 600;
    color: #333;
    width: 55%;
  }
  &:last-child {
    color: #555;
    text-align: right;
  }
`;

/* ─────────────────────────────────────────────
   CTA BUTTON
───────────────────────────────────────────── */
const CtaButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: #006096;
  color: #fff;
  border: 1px solid #006096;
  border-radius: 50px;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: transparent;
    color: #006096;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.85rem;
  color: #006096;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 2rem;

  &:hover { text-decoration: underline; }
`;

/* ─────────────────────────────────────────────
   FORM
───────────────────────────────────────────── */
const FormTitle = styled.h3`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: #006096;
  margin: 0 0 1.75rem 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 580px) { grid-template-columns: 1fr; }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full { grid-column: 1 / -1; }
`;

const Label = styled.label`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #374151;
`;

const inputBase = `
  padding: 11px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;

  &:focus {
    border-color: #006096;
    box-shadow: 0 0 0 3px rgba(0, 96, 150, 0.08);
  }
`;

const Input = styled.input`${inputBase}`;
const Select = styled.select`${inputBase} background: #fff;`;
const TextArea = styled.textarea`
  ${inputBase}
  min-height: 100px;
  resize: vertical;
`;

const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 0.85rem;
  margin: 0.5rem 0 0;
`;

/* ─────────────────────────────────────────────
   SUCCESS
───────────────────────────────────────────── */
const SuccessWrap = styled(motion.div)`
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SuccessIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 96, 150, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #006096;
  margin-bottom: 0.5rem;
`;

const SuccessTitle = styled.h3`
  font-family: var(--secondary-ff), sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: #006096;
  margin: 0;
`;

const SuccessText = styled.p`
  font-family: var(--primary-ff), sans-serif;
  color: #555;
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 440px;
  margin: 0;
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const EMPTY_FORM = {
  firstName: "", lastName: "", email: "",
  phone: "", date: "", eventType: "", comments: "",
};

const LocationModal = ({ isOpen, onClose, space }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { setShowForm(false); setSubmitted(false); setFormData(EMPTY_FORM); setCurrentIndex(0); }
  }, [isOpen, space]);

  if (!isOpen || !space) return null;

  const images = space.images?.length ? space.images.map(i => i.url) : [];
  const next = () => setCurrentIndex(p => (p + 1) % images.length);
  const prev = () => setCurrentIndex(p => (p - 1 + images.length) % images.length);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("access_key", process.env.NEXT_PUBLIC_W3F_LOCATION_KEY);
      fd.append("subject", `Nouvelle demande de réservation - ${space.title}`);
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("space", space.title);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const result = await res.json();
      if (result.success) { setSubmitted(true); setFormData(EMPTY_FORM); }
      else setError(result.message || "Erreur lors de l'envoi.");
    } catch { setError("Impossible d'envoyer le formulaire."); }
    finally { setSubmitting(false); }
  };

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Panel
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <PanelAccent />
        <PanelInner>

          {/* Header */}
          <ModalHeader>
            <TitleGroup>
              <ModalTitle>{space.title}</ModalTitle>
              <TitleAccent />
            </TitleGroup>
            <CloseBtn
              onClick={() => { setShowForm(false); setSubmitted(false); onClose(); }}
              whileTap={{ scale: 0.9 }}
              aria-label="Fermer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </CloseBtn>
          </ModalHeader>

          <AnimatePresence mode="wait">

            {/* SUCCESS */}
            {submitted && (
              <SuccessWrap key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <SuccessIcon>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SuccessIcon>
                <SuccessTitle>Demande envoyée!</SuccessTitle>
                <SuccessText>
                  Nous avons bien reçu votre demande de réservation pour <strong>{space.title}</strong>. Notre équipe vous contactera dans les plus brefs délais.
                </SuccessText>
              </SuccessWrap>
            )}

            {/* FORM */}
            {!submitted && showForm && (
              <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <SecondaryBtn onClick={() => setShowForm(false)}>
                  ← Retour aux détails
                </SecondaryBtn>
                <FormTitle>Formulaire de réservation</FormTitle>
                <form onSubmit={handleSubmit}>
                  <FormGrid>
                    <FormGroup>
                      <Label>Prénom *</Label>
                      <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                      <Label>Nom *</Label>
                      <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                      <Label>Courriel *</Label>
                      <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                      <Label>Téléphone *</Label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                      <Label>Date souhaitée *</Label>
                      <Input type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required />
                    </FormGroup>
                    <FormGroup>
                      <Label>Type d'événement *</Label>
                      <Select name="eventType" value={formData.eventType} onChange={handleChange} required>
                        <option value="">Sélectionnez</option>
                        <option value="conference">Conférence</option>
                        <option value="meeting">Réunion</option>
                        <option value="event">Événement</option>
                        <option value="other">Autre</option>
                      </Select>
                    </FormGroup>
                    <FormGroup className="full">
                      <Label>Commentaires</Label>
                      <TextArea name="comments" value={formData.comments} onChange={handleChange} placeholder="Détails supplémentaires..." />
                    </FormGroup>
                  </FormGrid>
                  {error && <ErrorMsg>{error}</ErrorMsg>}
                  <CtaButton type="submit" disabled={submitting} whileTap={{ scale: 0.98 }} style={{ marginTop: "1.5rem" }}>
                    {submitting ? "Envoi en cours..." : "Envoyer la demande"}
                  </CtaButton>
                </form>
              </motion.div>
            )}

            {/* DETAILS */}
            {!submitted && !showForm && (
              <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
                {/* Carousel */}
                {images.length > 0 && (
                  <CarouselOuter>
                    <CarouselTrack>
                      <CarouselInner animate={{ x: `-${currentIndex * 100}%` }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                        {images.map((img, i) => (
                          <Slide key={i} style={{ backgroundImage: `url(${img})` }} />
                        ))}
                      </CarouselInner>
                      {images.length > 1 && (
                        <>
                          <LeftArrow onClick={prev} whileTap={{ scale: 0.9 }}><FaChevronLeft size={12} /></LeftArrow>
                          <RightArrow onClick={next} whileTap={{ scale: 0.9 }}><FaChevronRight size={12} /></RightArrow>
                        </>
                      )}
                    </CarouselTrack>
                    {images.length > 1 && (
                      <Dots>
                        {images.map((_, i) => <Dot key={i} active={currentIndex === i} onClick={() => setCurrentIndex(i)} />)}
                      </Dots>
                    )}
                  </CarouselOuter>
                )}

                {/* Details table */}
                {space.details?.length > 0 && (
                  <DetailsTable>
                    <tbody>
                      {space.details.map((d, i) => (
                        <TableRow key={i}>
                          <TableCell>{d.label}</TableCell>
                          <TableCell>{d.value}</TableCell>
                        </TableRow>
                      ))}
                    </tbody>
                  </DetailsTable>
                )}

                <CtaButton onClick={() => setShowForm(true)} whileTap={{ scale: 0.98 }}>
                  Demande de réservation
                </CtaButton>
              </motion.div>
            )}

          </AnimatePresence>
        </PanelInner>
      </Panel>
    </Overlay>
  );
};

export default LocationModal;

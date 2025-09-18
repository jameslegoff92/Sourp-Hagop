"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  z-index: 80;
`;

const Sheet = styled(motion.div)`
  width: min(820px, 92vw);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Side = styled.div`
  background: linear-gradient(135deg, var(--primary-color), #004799);
  color: #fff;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  margin: 0;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Pill = styled.span`
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
`;

const Body = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

const Section = styled.h4`
  margin: 0 0 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
`;

const Helper = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

const Field = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: var(--primary-color);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 22px;
`;

const Button = styled.button`
  border-radius: 999px;
  padding: 12px 22px;
  margin-top: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  border: 1px solid transparent;
  background: ${(p) =>
    p.variant === "primary" ? "var(--primary-color)" : "#f3f4f6"};
  color: ${(p) => (p.variant === "primary" ? "#fff" : "#111827")};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 160px;
  &:hover {
    filter: brightness(0.98);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessBox = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

export default function CareerApplyModal({ open, onClose, job }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setDone(false);
      setError("");
      setSubmitting(false);
    }
  }, [open, job?._id]); // Reset when modal opens or job changes

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    fd.append("access_key", process.env.NEXT_PUBLIC_W3F_CAREER_KEY);
    fd.append("subject", `Candidature: ${job?.title || "Poste"}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (data.success) {
        setDone(true);
        e.currentTarget.reset();
      } else {
        setError(data.message || "Erreur lors de l'envoi.");
      }
    } catch {
      setError("Impossible d'envoyer le formulaire.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Sheet
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Side>
              <Title>{job?.title || "Poste"}</Title>
              <Meta>
                {job?.level ? <Pill>{job.level}</Pill> : null}
                {job?.type ? <Pill>{job.type}</Pill> : null}
                {job?.location ? <Pill>{job.location}</Pill> : null}
              </Meta>
            </Side>
            <Body>
              {!done ? (
                <form onSubmit={submit}>
                  <Section>Vos informations</Section>
                  <Row>
                    <FieldWrapper>
                      <Label>Nom complet</Label>
                      <Field name="name" required />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Label>Courriel</Label>
                      <Field type="email" name="email" required />
                    </FieldWrapper>
                  </Row>
                  <Row style={{ marginTop: 12 }}>
                    <FieldWrapper>
                      <Label>Téléphone</Label>
                      <Field name="phone" />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Label>Poste visé</Label>
                      <Field value={job?.title || ""} disabled />
                    </FieldWrapper>
                  </Row>

                  <Section style={{ marginTop: 24 }}>Votre candidature</Section>
                  <FieldWrapper>
                    <Label>Message</Label>
                    <Textarea name="message" />
                  </FieldWrapper>
                  <FieldWrapper style={{ marginTop: 12 }}>
                    <Label>Lien vers votre CV</Label>
                    <Field
                      name="cv_link"
                      placeholder="Google Drive, Dropbox, etc."
                      required
                    />
                    <Helper>Ajoutez un lien partageable</Helper>
                  </FieldWrapper>
                  <FieldWrapper style={{ marginTop: 12 }}>
                    <Label>Lien vers votre lettre de motivation</Label>
                    <Field
                      name="cover_link"
                      placeholder="Google Drive, Dropbox, etc."
                    />
                  </FieldWrapper>

                  {error ? (
                    <div
                      style={{
                        color: "#b91c1c",
                        marginTop: 10,
                        fontWeight: 600,
                      }}
                    >
                      {error}
                    </div>
                  ) : null}
                  <Actions>
                    <Button type="button" onClick={onClose}>
                      Fermer
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                    >
                      {submitting ? "Envoi…" : "Postuler"}
                    </Button>
                  </Actions>
                </form>
              ) : (
                <SuccessBox>
                  <h3>Candidature envoyée !</h3>
                  <p>
                    Merci pour votre intérêt. Nous vous contacterons si votre
                    profil correspond.
                  </p>
                  <Button variant="primary" onClick={onClose}>
                    OK
                  </Button>
                </SuccessBox>
              )}
            </Body>
          </Sheet>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

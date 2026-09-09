"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

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

// ─── Shell ────────────────────────────────────────────────────────────────────

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  z-index: 90;
  padding: 20px;
`;

const Sheet = styled(motion.div)`
  width: min(820px, 92vw);
  max-height: 90vh;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    max-height: 95vh;
    overflow-y: auto;
  }
`;

// ─── Left side ────────────────────────────────────────────────────────────────

const Side = styled.div`
  background: linear-gradient(135deg, var(--primary-color), #004799);
  color: white;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: -40px;
    right: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SideEyebrow = styled.span`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
`;

const SideTitle = styled.h3`
  font-family: var(--primary-ff), sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Pill = styled.span`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
`;

// ─── Right side / form ────────────────────────────────────────────────────────

const Body = styled.div`
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const SectionLabel = styled.h4`
  font-family: var(--primary-ff), sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--primary-color);
  margin: 0 0 14px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 28px;
    height: 2px;
    background: var(--primary-color);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 0.82rem;
  font-weight: 600;
  color: #374151;
`;

const Helper = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const Field = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 0.92rem;
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    background: white;
  }

  &:disabled {
    background: #f3f4f6;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 0.92rem;
  min-height: 100px;
  resize: vertical;
  outline: none;
  background: #fafafa;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:focus {
    border-color: var(--primary-color);
    background: white;
  }
`;

const ErrorMsg = styled.div`
  color: #b91c1c;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 10px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ActionButton = styled.button`
  border-radius: 999px;
  padding: 12px 26px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid ${p => p.variant === "primary" ? "var(--primary-color)" : "#e5e7eb"};
  background: ${p => p.variant === "primary" ? "var(--primary-color)" : "#f3f4f6"};
  color: ${p => p.variant === "primary" ? "white" : "#374151"};

  &:hover:not(:disabled) {
    background: ${p => p.variant === "primary" ? "transparent" : "#e9ecef"};
    color: ${p => p.variant === "primary" ? "var(--primary-color)" : "#111827"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ─── Success ──────────────────────────────────────────────────────────────────

const SuccessBox = styled.div`
  text-align: center;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--secondary-color);
  display: grid;
  place-items: center;
  color: var(--primary-color);
  font-size: 1.6rem;
`;

const SuccessTitle = styled.h3`
  font-family: var(--primary-ff), sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SuccessText = styled.p`
  color: #6b7280;
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0;
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CareerApplyModal({ open, onClose, job }) {
  const t = useTranslations("CareerModal");
  const tCommon = useTranslations("Common");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setDone(false);
      setError("");
      setSubmitting(false);
    }
  }, [open, job?._id]);

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    fd.append("access_key", process.env.NEXT_PUBLIC_W3F_CAREER_KEY);
    fd.append("subject", `Candidature: ${toSentenceCase(job?.title || t("fallbackTitle"))}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        e.currentTarget.reset();
      } else {
        setError(data.message || tCommon("forms.genericSubmitError"));
      }
    } catch {
      setError(tCommon("forms.genericNetworkError"));
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
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={e => e.stopPropagation()}
          >
            <Side>
              <SideEyebrow>{t("eyebrow")}</SideEyebrow>
              <SideTitle>{toSentenceCase(job?.title || t("fallbackTitle"))}</SideTitle>
              <Meta>
                {job?.level    && <Pill>{job.level}</Pill>}
                {job?.type     && <Pill>{job.type}</Pill>}
                {job?.location && <Pill>{job.location}</Pill>}
              </Meta>
            </Side>

            <Body>
              {!done ? (
                <form onSubmit={submit}>
                  <SectionLabel>{t("sectionYourInfo")}</SectionLabel>
                  <Row>
                    <FieldWrapper>
                      <Label>{t("fields.fullName")}</Label>
                      <Field name="name" required />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Label>{t("fields.email")}</Label>
                      <Field type="email" name="email" required />
                    </FieldWrapper>
                  </Row>

                  <Row style={{ marginTop: 12 }}>
                    <FieldWrapper>
                      <Label>{t("fields.phone")}</Label>
                      <Field name="phone" />
                    </FieldWrapper>
                    <FieldWrapper>
                      <Label>{t("fields.targetPosition")}</Label>
                      <Field value={toSentenceCase(job?.title || "")} disabled readOnly />
                    </FieldWrapper>
                  </Row>

                  <SectionLabel style={{ marginTop: 24 }}>{t("sectionApplication")}</SectionLabel>
                  <FieldWrapper>
                    <Label>{t("fields.message")}</Label>
                    <Textarea name="message" />
                  </FieldWrapper>

                  <FieldWrapper style={{ marginTop: 12 }}>
                    <Label>{t("fields.cvLink")}</Label>
                    <Field name="cv_link" placeholder={t("fields.cvLinkPlaceholder")} required />
                    <Helper>{t("fields.cvLinkHelper")}</Helper>
                  </FieldWrapper>

                  <FieldWrapper style={{ marginTop: 12 }}>
                    <Label>{t("fields.coverLetterLink")}</Label>
                    <Field name="cover_link" placeholder={t("fields.cvLinkPlaceholder")} />
                  </FieldWrapper>

                  {error && <ErrorMsg>{error}</ErrorMsg>}

                  <Actions>
                    <ActionButton type="button" onClick={onClose}>{t("close")}</ActionButton>
                    <ActionButton type="submit" variant="primary" disabled={submitting}>
                      {submitting ? t("submitCtaPending") : t("submitCta")}
                    </ActionButton>
                  </Actions>
                </form>
              ) : (
                <SuccessBox>
                  <SuccessIcon>✓</SuccessIcon>
                  <SuccessTitle>{t("successTitle")}</SuccessTitle>
                  <SuccessText>
                    {t("successBody")}
                  </SuccessText>
                  <ActionButton variant="primary" onClick={onClose}>
                    {t("close")}
                  </ActionButton>
                </SuccessBox>
              )}
            </Body>
          </Sheet>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
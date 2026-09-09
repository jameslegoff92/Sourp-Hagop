"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// This site loads no third-party scripts and sets no tracking cookies (see
// the cookie/localStorage/script inventory that motivated this component).
// The only deposits before this notice are: two NextAuth cookies
// (authjs.csrf-token / authjs.callback-url), a side effect of
// <SessionProvider> wrapping the whole public layout in
// app/[locale]/layout.jsx to support the admin's Google sign-in - not
// anything a visitor to the school's site is using. And a NEXT_LOCALE
// cookie from next-intl's middleware that in practice never fires here,
// because routing.ts sets localeDetection: false. Nothing here is a
// consent mechanism - there is nothing to opt in or out of. This is a
// transparency notice: one acknowledgement action, and a link to the
// privacy policy. No category toggles, no accept/reject, no consent store.
const STORAGE_KEY = "cookieNoticeAcknowledged";

const Bar = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* Below PageLoader's intro splash (Tailwind z-50 = z-index: 50, see
     components/ui/PageLoader.jsx) so the notice doesn't visually fight the
     intro animation on a true first load - the opaque splash simply covers
     it until the splash itself fades out. Below modal overlays (z-index:
     1000 in LocationModal.jsx/careerModal.jsx) so an open modal still takes
     precedence. Above ordinary page content otherwise. */
  z-index: 40;
  background: var(--primary-color);
  color: var(--white);
`;

const BarInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-3) var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-6);
  flex-wrap: wrap;
  text-align: center;

  @media (max-width: 768px) {
    padding: var(--spacing-3) var(--spacing-2);
    flex-direction: column;
    gap: var(--spacing-2);
  }
`;

const Text = styled.p`
  font-family: var(--primary-ff);
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  line-height: 1.5;
  margin: 0;
  max-width: 640px;
`;

const PolicyLink = styled(Link)`
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    opacity: 0.85;
  }
`;

/* No white-space: nowrap here or on PolicyLink above - the pending legal
   placeholder text (messages/fr.json, messages/hy.json) is a full sentence,
   much longer than the short final copy this will eventually hold, and
   nowrap would push it past the viewport edge instead of wrapping. Must
   still look correct with today's long placeholder, not just with the
   short text it will hold once legal wording lands. */
const AckButton = styled(motion.button)`
  flex-shrink: 0;
  max-width: 100%;
  padding: var(--spacing-1) var(--spacing-4);
  background: var(--white);
  color: var(--primary-color);
  border: 1px solid var(--white);
  border-radius: 50px;
  font-family: var(--primary-ff);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: transparent;
    color: var(--white);
  }
`;

export default function CookieNotice() {
  const t = useTranslations("CookieNotice");
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isAdminRoute) return;
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing, disabled storage) -
      // fail open: no notice rather than a crash.
    }
  }, [isAdminRoute]);

  const acknowledge = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Same fallback as above - dismissal still works for this visit.
    }
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const handler = (e) => {
      if (e.key === "Escape") acknowledge();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (isAdminRoute) return null;

  return (
    <AnimatePresence>
      {visible && (
        <Bar
          role="region"
          aria-label={t("ariaLabel")}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <BarInner>
            <Text>
              {t("message")}{" "}
              <PolicyLink href="/confidentialite">
                {t("policyLinkText")}
              </PolicyLink>
            </Text>
            <AckButton type="button" onClick={acknowledge} whileTap={{ scale: 0.97 }}>
              {t("acknowledge")}
            </AckButton>
          </BarInner>
        </Bar>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ARMENIAN_CONTENT_TRANSLATED } from "@/lib/armenian-content-status";
import css from "./topNav.module.css";

export default function LangSwitcher() {
  const t = useTranslations("LangSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const isHy = locale === "hy";
  const targetLocale = isHy ? "fr" : "hy";

  if (!ARMENIAN_CONTENT_TRANSLATED) return null;

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className={css.langToggle}
      aria-label={t("ariaLabel")}
    >
      <div className={css.langSlider} style={{
        transform: isHy ? "translateX(100%)" : "translateX(0)"
      }} />
      <span className={`${css.langOption} ${!isHy ? css.langOptionActive : ""}`}>
        FR
      </span>
      <span className={`${css.langOption} ${isHy ? css.langOptionActive : ""}`}>
        ՀԱՅ
      </span>
    </Link>
  );
}

"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import css from "./topNav.module.css";

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const isHyw = locale === "hyw";
  const targetLocale = isHyw ? "fr" : "hyw";

  return (
    <Link
      href={pathname}
      locale={targetLocale}
      className={css.langToggle}
      aria-label="Changer de langue"
    >
      <div className={css.langSlider} style={{
        transform: isHyw ? "translateX(100%)" : "translateX(0)"
      }} />
      <span className={`${css.langOption} ${!isHyw ? css.langOptionActive : ""}`}>
        FR
      </span>
      <span className={`${css.langOption} ${isHyw ? css.langOptionActive : ""}`}>
        ՀԱՅ
      </span>
    </Link>
  );
}

"use client";

import { useLocale } from "@/components/display/LangContext";
import css from "./topNav.module.css";

export default function LangSwitcher() {
  const { locale, setLocale } = useLocale();
  const isHy = locale === "hy";

  return (
    <button
      className={css.langToggle}
      onClick={() => setLocale(isHy ? "fr" : "hy")}
      aria-label="Changer de langue"
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
    </button>
  );
}
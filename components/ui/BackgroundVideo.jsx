"use client";

import { useTranslations } from "next-intl";
import css from "./BackgroundVideo.module.css";

const BackgroundVideo = ({ src, fallback, children }) => {
  const t = useTranslations("BackgroundVideo");
  return (
    <div className={css.videoContainer}>
      {src ? (
        <video
          preload="auto"
          className={css.video}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={src} type="video/mp4" />
          {t("unsupportedVideoTag")}
        </video>
      ) : (
        fallback && <img src={fallback} alt={t("fallbackAlt")} className={css.video} />
      )}
      <div className={css.overlay}></div>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default BackgroundVideo;

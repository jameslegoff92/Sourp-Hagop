"use client";

import css from "./BackgroundVideo.module.css";

const BackgroundVideo = ({ src, fallback, children }) => {
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
          Your browser does not support the video tag.
        </video>
      ) : (
        fallback && <img src={fallback} alt="Background" className={css.video} />
      )}
      <div className={css.overlay}></div>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default BackgroundVideo;

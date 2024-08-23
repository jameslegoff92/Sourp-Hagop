"use client";

import css from './BackgroundVideo.module.css';

const BackgroundVideo = ({ src, children }) => {
  return (
    <div className={css.videoContainer}>
      <video className={css.video} autoPlay loop muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={css.overlay}></div>
      <div className={css.content}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;
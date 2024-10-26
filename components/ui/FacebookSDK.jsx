"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function FacebookSDK() {
  useEffect(() => {
    // Add the fb-root div dynamically if not present
    const fbRoot = document.createElement("div");
    fbRoot.id = "fb-root";
    document.body.prepend(fbRoot);
  }, []);

  return (
    <>
      {/* This runs on the server first then Loads the Facebook SDK */}
      <Script
        id="facebook-sdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v20.0&appId=453471724522393"
        nonce="AUbqPMsr"
        async
        defer
        crossorigin="anonymous"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: "453471724522393", // Replace with your actual Facebook App ID
              cookie: true,
              xfbml: true, // This will automatically parse XFBML
              version: "v20.0",
            });
            FB.AppEvents.logPageView();

            // Explicitly call XFBML parsing after init to ensure button renders
            FB.XFBML.parse();
          };
        }}
      />
    </>
  );
}

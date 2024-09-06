"use client";
import { useEffect, useState } from "react";

export default function FacebookLoginLogout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkFacebookLoginStatus = () => {
      if (typeof FB !== "undefined") {
        FB.getLoginStatus(function (response) {
          if (response.status === "connected") {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });
      } else {
        setTimeout(checkFacebookLoginStatus, 100); // Retry if FB is not yet available
      }
    };

    checkFacebookLoginStatus();
  }, []);

  // Handle user login
  const handleLogin = () => {
    FB.login(
      function (response) {
        if (response.authResponse) {

          const accessToken = response.authResponse.accessToken;
          const expiresIn = response.authResponse.expiresIn;  
  
          // Call the API route with the access token
          fetch('/api/facebook/post-token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken, expiresIn }), // Just send the token for simplicity
          })
            .then((response) => {
              console.log("Fetch response status:", response.status); // Log the status to check if it's 200 or an error
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Server response:', data);  // Log the data returned by the API route
            })
            .catch((error) => {
              console.error('Fetch error:', error);  // Catch and log any errors
            });
  
          setIsLoggedIn(true);
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  // Handle user logout
  const handleLogout = () => {
    FB.logout(function (response) {
      console.log("Logged out successfully:", response);
      setIsLoggedIn(false);
    });
  };

  return (
    <>
      {/* Render login or logout button based on user's login status */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout from Facebook</button>
      ) : (
        <button onClick={handleLogin}>Login with Facebook</button>
      )}
    </>
  );
}

//dotenv is used to load the .env.local env variables from the nextjs environment into our nodejs environment
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import axios from 'axios';
import logger from '../logger/logger.js';

/**
 * Returns a new Google Access Token
 * 
 * @param {string} token The refresh token. 
 * @returns {string} The new access token.
 * 
 */
export async function getNewAccessToken(token) {
  const refreshToken = token;
  logger.debug(`Value of process.env.AUTH_GOOGLE_ID: ${process.env.AUTH_GOOGLE_ID}`)
  const clientId = process.env.AUTH_GOOGLE_ID;
  logger.debug(`Value of process.env.AUTH_GOOGLE_ID: ${process.env.AUTH_GOOGLE_SECRET}`)
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('refresh_token', refreshToken);
  params.append('grant_type', 'refresh_token');

  try {
    logger.debug(`Sending new access token request to google server`)
    const response = await axios.post(tokenEndpoint, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    logger.debug(response.data.access, `Google response: `);
    const newAccessToken = response.data.access_token;
    logger.debug(`New access token: ${newAccessToken}`);
    return newAccessToken
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    return null;
  }
}
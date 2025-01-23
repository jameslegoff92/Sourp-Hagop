import axios from "axios";
import logger from "../logger/logger.js";

export const fetchInstagramMedia = async (accessTokenString) => {
  if (!accessTokenString) {
    logger.warn('No access token provided');
    return "No access token";
  }

  if (typeof accessTokenString !== 'string') {
    logger.warn('Access token must be a string');
    return "Invalid access token type";
  }

  const accessToken = accessTokenString;
  const instagramAccountId = "17841400285723343";
  const url = `https://graph.facebook.com/v17.0/${instagramAccountId}/media`;

  try {
    logger.info(`Fetching Instagram media`);
    const response = await axios.get(url, {
      params: {
        fields: 'id,caption,media_url',
        access_token: accessToken,
      },
    });
    
    logger.info(`Fetched Instagram media`);
    return response.data;
  } catch (error) {
    logger.error(error, 'Error from fetching Instagram media');
  }
};

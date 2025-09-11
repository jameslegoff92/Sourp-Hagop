import axios from "axios";

export const fetchInstagramMedia = async (accessTokenString) => {
  console.debug(accessTokenString, 'Access token for Instagram media');
  if (!accessTokenString) {
    console.warn('No access token provided');
    return "No access token";
  }

  if (typeof accessTokenString !== 'string') {
    console.warn('Access token must be a string');
    return "Invalid access token type";
  }

  const accessToken = accessTokenString;
  const instagramAccountId = "17841400285723343";
  const url = `https://graph.facebook.com/v17.0/${instagramAccountId}/media`;

  try {
    console.info(`Fetching Instagram media`);
    const response = await axios.get(url, {
      params: {
        fields: 'id,caption,media_url',
        access_token: accessToken,
      },
    });
    console.debug(response.data.data, 'Instagram media response');
    console.info(`Fetched Instagram media`);
    const media = response.data.data;
    return media;
  } catch (error) {
    console.error(error, 'Error from fetching Instagram media');
  }
};

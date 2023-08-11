import querystring from 'querystring';

function getAuthUrl() {
  const discordClientId = process.env.DISCORD_CLIENT_ID;
  const discordRedirectUri = process.env.DISCORD_REDIRECT_URI;
  const queryParams = querystring.stringify({
    client_id: discordClientId,
    redirect_uri: discordRedirectUri,
    response_type: 'code',
    scope: 'identify email', // Add more scopes if needed
  });

  return `https://discord.com/api/oauth2/authorize?${queryParams}`;
}

export default getAuthUrl;
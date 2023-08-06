import querystring from 'querystring';

export default async function handler(req, res) {
    const { code } = req.query;

    // Exchange the code for an access token
    const discordClientId = process.env.DISCORD_CLIENT_ID;
    const discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
    const discordRedirectUri = process.env.DISCORD_REDIRECT_URI;
    
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            client_id: discordClientId,
            client_secret: discordClientSecret,
            grant_type: 'authorization_code',
            code,
            redirect_uri: discordRedirectUri,
            scope: 'email' // Add more scopes if needed
        })
    });

    // Extract the access token from the response
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Now, you can use the accessToken to make requests to the Discord API on behalf of the user

    // For example, you can fetch user information like this:
    const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const user = await userResponse.json();
    console.log(user); // You will have user information here

    // After processing, redirect the user to the desired page
    res.redirect('/');
}

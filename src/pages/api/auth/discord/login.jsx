import getAuthUrl from "../../../../lib/discord";

export default async function handler(req, res) {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
}
//localhost:3000/api/auth/discord/login
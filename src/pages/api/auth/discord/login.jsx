import getAuthUrl from "../../../../lib/discord";

export default async function handler(req, res) {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
}
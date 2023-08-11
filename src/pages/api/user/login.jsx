// Import userRegister
const generateConfirmToken = require("../../../lib/encript/genconfirmtoken");
const { generateJWT, verifyJWT } = require("../../../lib/encript/jwt");
const createUserSession = require("../../../lib/datalayer/createUserSession");
const userLogin = require("../../../lib/datalayer/userLogin");
/*
POST 
{
    "jwt": "jwt token",
}

decoded jwt token:
{
    "password": "password",
    "email": "email"
}

model Session {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expiresAt DateTime
  handle    String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id])

  // Context
  ip        String?
  userAgent String?

  // Opposite relation field
  @@index([userId], name: "user_sessions")
}

*/

export default async function handler(req, res) {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let userAgent = req.headers["user-agent"];

  if (req.method === "POST") {
    const { jwt } = req.body;

    const decoded = verifyJWT(jwt, process.env.JWT_SECRET);
    const userQuery = await userLogin(decoded.email, decoded.password);

    if (userQuery.error) {
      res.status(400).json({ error: userQuery.error });
    } else {
      const session = await createUserSession(userQuery.user, ip, userAgent);
      let sessionjwt = generateJWT(session, process.env.JWT_SECRET);
      res.status(200).json({ jwt: sessionjwt });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
// Import userRegister
import userRegister from '../../../lib/userregister';
const generateConfirmToken = require('../../../lib/genconfirmtoken');
const { generateJWT, verifyJWT } = require('../../../lib/jwt');
/*
POST 
{
    "jwt": "jwt token",
}

decoded jwt token:
{
    "username": "username",
    "password": "password",
    "email": "email"
}
*/

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { jwt } = req.body;
        const decoded = verifyJWT(jwt, process.env.JWT_SECRET);
        console.log(decoded);
        const confirmToken = generateConfirmToken();

        const user = await userRegister(decoded.username, decoded.password, decoded.email, confirmToken);

        if (user.error) {
            res.status(400).json({ error: user.error });
        } else {
            const jwt = generateJWT(user, process.env.JWT_SECRET);
            res.status(200).json({ jwt });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
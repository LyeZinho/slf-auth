const { sign, verify } = require('jsonwebtoken');

function generateJWT(payload, secret) {
    const token = sign(payload, secret, { expiresIn: '1h', algorithm: 'HS512' });
    return token;
}

function verifyJWT(token, secret) {
    const decoded = verify(token, secret);
    return decoded;
}

module.exports = {
    generateJWT,
    verifyJWT
};
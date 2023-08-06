// Node.js crypto module
const crypto = require('crypto');

// Generate salt
function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Generate hash
function generateHash(password, username) {
    let salt = generateSalt();    
    let raw = username + password + salt;
    let hash = crypto.createHash('sha512').update(raw).digest('hex');
    return {
        salt: salt,
        hash: hash
    };
}

// Compare hash
function compareHash(password, username, salt, hash) {
    let raw = username + password + salt;
    let hashVerify = crypto.createHash('sha512').update(raw).digest('hex');
    return hash === hashVerify;
}

module.exports = {
    generateHash,
    compareHash
};
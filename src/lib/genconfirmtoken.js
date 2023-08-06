// genconfirmtoken

const crypto = require('crypto');

function generateConfirmToken() {
    return crypto.randomBytes(40).toString('hex');
}

module.exports = generateConfirmToken;
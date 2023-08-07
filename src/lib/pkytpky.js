// Public Key to Private Key (PKYTPKY)
const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // Comprimento do módulo aumentado para 4096 bits
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return { publicKey, privateKey };
}

// Verifica se as chaves são válidas
function verifyKeyPair(publicKey, privateKey, data) {
  const signature = crypto.sign('sha256', Buffer.from(data), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  });
  const isVerified = crypto.verify(
    'sha256',
    Buffer.from(data),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    signature
  );

  return isVerified;
}

module.exports = {
  generateKeyPair,
  verifyKeyPair
};
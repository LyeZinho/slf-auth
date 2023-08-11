// Node.js crypto module
const crypto = require("crypto");

// Generate salt
function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

// Gen random hash token
function generateToken() {
  let base = crypto.randomBytes(16).toString("hex");
  let token = crypto.createHash("sha512").update(base).digest("hex");
  return token;
}

// Generate hash
function generateHash(content) {
  let salt = generateSalt();
  let raw = content + salt;
  let hash = crypto.createHash("sha512").update(raw).digest("hex");
  return {
    salt: salt,
    hash: hash,
  };
}

function generateHashSalt(content, salt) {
  let raw = content + salt;
  let hash = crypto.createHash("sha512").update(raw).digest("hex");
  return {
    salt: salt,
    hash: hash,
  };
}

// Compare hash
function compareHash(content, salt, hash) {
  let raw = content + salt;
  let hashVerify = crypto.createHash("sha512").update(raw).digest("hex");
  return hash === hashVerify;
}

function pad(data) {
  const blockSize = 16;
  const paddingLength = blockSize - (data.length % blockSize);
  const paddingChar = String.fromCharCode(paddingLength);
  return data + paddingChar.repeat(paddingLength);
}

function unpad(data) {
  const paddingLength = data.charCodeAt(data.length - 1);
  return data.slice(0, -paddingLength);
}

function encrypt(message, key) {
  const hashedKey = crypto.createHash("sha256").update(key).digest();
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    hashedKey,
    Buffer.alloc(16)
  );
  let encrypted = cipher.update(pad(message), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(encrypted, key) {
  const hashedKey = crypto.createHash("sha256").update(key).digest();
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    hashedKey,
    Buffer.alloc(16)
  );
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return unpad(decrypted);
}

module.exports = {
  generateHash,
  generateToken,
  generateHashSalt,
  compareHash,
  encrypt,
  decrypt,
};
/*
model Admin {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String   @unique
  secret    String   @unique
  adminHash String   @unique
  salt      String

  // Opposite relation field
  sessions AdminSession[]
}
*/ 

const AdminRepository = require('../../dbacess/admin');
const { generateHash, encrypt } = require('../encript/genhash');

const adminRepository = new AdminRepository();

async function adminRegister(name, password, secret) {
    const { salt, hash } = generateHash(password);
    const encryptedHash = encrypt(hash, process.env.ENCRIPTATION_KEY);
    const encryptedSalt = encrypt(salt, process.env.ENCRIPTATION_KEY);
    const encryptedSecret = encrypt(secret, process.env.ENCRIPTATION_KEY);
    const admin = await adminRepository.findByField('name', name);

    if (admin) return { error: 'Admin already exists' }
    else {
        const admin = await adminRepository.create({
            name: name,
            adminHash: encryptedHash,
            salt: encryptedSalt,
            secret: encryptedSecret,
        });
        return admin;
    }
}

module.exports = adminRegister;
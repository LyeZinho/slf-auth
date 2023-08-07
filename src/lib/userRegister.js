// Register
import UserRepository from '../dbacess/user';
import { generateHash, encrypt } from './genhash';
import { generateKeyPair } from './pkytpky';

const userRepository = new UserRepository();

async function userRegister(password, email, confirmToken) {
    const { salt, hash } = generateHash(password);
    const { publicKey, privateKey } = generateKeyPair();

    const encryptedHash = encrypt(hash, process.env.ENCRIPTATION_KEY)
    const encryptedSalt = encrypt(salt, process.env.ENCRIPTATION_KEY)
    const encryptedEmail = encrypt(email, process.env.ENCRIPTATION_KEY)
    const encryptedPublicKey = encrypt(publicKey, process.env.ENCRIPTATION_KEY)
    const encryptedPrivateKey = encrypt(privateKey, process.env.ENCRIPTATION_KEY)

    const user = await userRepository.getUserByField('email', encryptedEmail);
    if (user) {
        return {
            error: 'User already exists'
        }
    }
    else {
        const user = await userRepository.createUser({
            email: encryptedEmail,
            userHash: encryptedHash,
            confirmToken: confirmToken,
            salt: encryptedSalt,
            publicKey: encryptedPublicKey,
            privateKey: encryptedPrivateKey,
        });
        return user;
    }
}


export default userRegister;

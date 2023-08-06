// Register
import UserRepository from '../dbacess/user';
import { generateHash } from './genhash';

const userRepository = new UserRepository();

async function userRegister(username, password, email, confirmToken) {
    const { salt, hash } = generateHash(password, username);

    // Verify if user exists
    const user = await userRepository.getUserByField('email', email);
    if (user) {
        return {
            error: 'User already exists'
        }
    }
    else {
        const user = await userRepository.createUser({
            email: email,
            userHash: hash,
            confirmToken: confirmToken,
            salt: salt,
        });
        return user;
    }
}


export default userRegister;

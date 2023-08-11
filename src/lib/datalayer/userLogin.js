const UserRepository = require("../dbacess/user");
const { compareHash, decrypt, encrypt, } = require("./genhash");

async function login(email, password) {
  let userRepository = new UserRepository();
  let encryptedEmail = encrypt(email, process.env.ENCRIPTATION_KEY);
  let user = await userRepository.getUserByField("email", encryptedEmail);
  if (!user) {
    return {
      error: "User not found",
    };
  } else {
    let decryptedSalt = decrypt(user.salt, process.env.ENCRIPTATION_KEY);
    let decryptedHash = decrypt(user.userHash, process.env.ENCRIPTATION_KEY);
    let result = compareHash(password, decryptedSalt, decryptedHash);

    if (result) {
      return {
        user: user,
      };
    } else {
      return {
        error: "Invalid password",
      };
    }
  }
}

module.exports = login;
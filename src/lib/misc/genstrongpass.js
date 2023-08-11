function generateStrongPassword(length = 12, ...charTypes) {
    const charSets = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz",
        "0123456789",
        "!@#$%^&*()-_=+[]{}|;:,.<>?",
    ];

    const allowedChars = charTypes.reduce((acc, type, index) => {
        if (type) {
            return acc + charSets[index];
        }
        return acc;
    }, "");

    if (!allowedChars) {
        throw new Error("At least one character type must be allowed.");
    }

    let password = "";
    const totalChars = allowedChars.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * totalChars);
        password += allowedChars[randomIndex];
    }

    return password;
}

module.exports = generateStrongPassword;
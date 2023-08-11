// Send email
async function sendConfirmEmail(from, to, subject) {
    const transportFactory = require('./transportFactory');

    let emailbody = 
    `
    <h1>Confirm your email</h1>
    <p>Click the link below to confirm your email</p>
    <a href="http://localhost:3000/auth/confirm/${token}">Confirm email</a>
    `
    let transporter = transportFactory();

    email.from = from;
    email.to = to;
    email.subject = subject;
    email.text = subject;
    email.html = emailbody;
    let info = await transporter.sendMail(email);
}

module.exports = sendConfirmEmail;
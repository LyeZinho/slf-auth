// Import the Nodemailer library
const nodemailer = require('nodemailer');


let email = {
    from: "",
    to: "",
    subject: "",
    text: "",
    html: ""
};

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

let emailbody = 
`
<h1>Confirm your email</h1>
<p>Click the link below to confirm your email</p>
<a href="http://localhost:3000/auth/confirm/${token}">Confirm email</a>
`

// Send email
async function sendConfirmEmail(from, to, subject) {
    email.from = from;
    email.to = to;
    email.subject = subject;
    email.text = subject;
    email.html = emailbody;
    let info = await transporter.sendMail(email);
}

module.exports = sendConfirmEmail;
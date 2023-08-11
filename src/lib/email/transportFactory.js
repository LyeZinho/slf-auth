function transportFactory(smtp_user, smtp_host, smtp_pass) {
    let email = {
        from: "",
        to: "",
        subject: "",
        text: "",
        html: ""
    };

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: smtp_host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: smtp_user,
            pass: smtp_pass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    return transporter;
}

module.exports = transportFactory;
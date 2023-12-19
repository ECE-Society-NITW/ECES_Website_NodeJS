const nodemailer = require("nodemailer");
const Mailgen = require('mailgen')

require('dotenv').config();
const EMAIL = process.env.EMAIL
const PASS = process.env.PASS

async function sendMail(userEmail) {

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS,
        },
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "E-summit IG",
            link: 'https://linktr.ee/ig.nitw'
        }
    })

    let response = {
        body: {
            name: 'Hi there!',
            intro: 'Welcome to email verification',
            action: {
                instructions: 'Please click the button below to verify your account',
                button: {
                    color: '#33b5e5',
                    text: 'Verify account',
                    link: 'http://example.com/verify_account',
                },
            },
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "EMAIL verification",
        html: mail
    }

    try {
        await transporter.sendMail(message)
        return;
    } catch (ex) {
        throw ex;
    }

}

module.exports = sendMail
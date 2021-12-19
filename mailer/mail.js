const nodemailer = require('nodemailer')
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST } = require('../keys/index');

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    from: `<drafttransfer1@gmail.com>`
})

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log("Email sent", info)
    })
}

module.exports = mailer

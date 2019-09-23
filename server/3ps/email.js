//comes from maintenance request app

const nodemailer = require('nodemailer');
const config = require('./../config/creds')
const { availabilityLink } = require('./calandly');

// make email less secure
//https://myaccount.google.com/lesssecureapps?pli=1

let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
        user: config.smtpAcct,
        pass: config.smtpPass
    }
});

const sendEmail = (to, subject, body, html) => {
    let mailOptions = {
        from: 'info@levanongrp.com',
        to: to,
        subject: subject,
        text: body,
        html: html
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent', info);
        }
    })
};
// console.log('send email test start');
// sendEmail('adampoznanski@outlook.com', 'test', 'test email');

const sendFirstEmail = (data) => {
    console.log('fired send first email');
    const subject = `Thank you for your interest in ${data.property}.`
    const templet = `
    Thank you for your interest in ${data.property}. Would you like to schedual a time to see the place?
    \nPlease use the link below to check our availbility and schedual.\n${availabilityLink[data.property]}
  `

    sendEmail(data.email,subject,templet);
}



module.exports = { sendEmail, sendFirstEmail };

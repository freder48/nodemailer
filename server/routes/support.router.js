const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const nodemailer = require('nodemailer');
require('dotenv').config();
//POST support

// NODEMAILER POST
router.post('/', (req, res) => {
    console.log('email', req.body);
    const data = req.body;
    let password = process.env.password;
    const smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'jfredericksen12@gmail.com',
            pass: password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    smtpTransport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages!");
        }
    });
    const mailOptions = {
        from: `${data.email_address}`,
        to: 'kimberly.a.orchard@gmail.com',
        subject: `${data.subject}`,
        html: `<p>${data.message}</p>
                <p>Thank you, ${data.name}</p>`
    };
    smtpTransport.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                console.log('error sending', error);
            } else {
                console.log('Success!');
            }
            smtpTransport.close();

            const queryText = `INSERT INTO "support" ("name", "email", "message")
                       VALUES ($1, $2, $3);`;
            pool.query(queryText, [data.name, data.email, data.message])
                .then(() => { res.sendStatus(201); })
                .catch((err) => {
                    console.log('Error completing POST server query', err);
                    res.sendStatus(500);
                });


        });
})

















module.exports = router;
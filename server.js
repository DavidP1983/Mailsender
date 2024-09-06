const express = require('express');
require('dotenv').config();

const app = express();
const nodemalier = require('nodemailer');

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemalier.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'david.piruzashvili@gmail.com',
        subject: `Message from ${req.body.name}: ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
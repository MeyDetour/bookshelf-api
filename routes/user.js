const {expressjwt: jwt} = require("express-jwt");
const {Router} = require("express");
const router = Router();
const {registerUser, login} = require('../controllers/user')
const dotenv = require('dotenv');
dotenv.config();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {

        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({storage: storage});




//https://mailtrap.io/blog/expressjs-send-email/
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require("uuid");
const path = require("path");
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
router.post('/send-email', async (req, res) => {
    try {
        let { name, subject, email, message } = req.body; // Destructure and retrieve data from request body.
        name = "contact@meydetour.com"
        subject = "App send mails"
        email = "meydetour@gmail.com"
        message = "Premier envoie d'email"

        // Validate required fields.
        if (!name || !subject || !email || !message) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }


        // Prepare the email message options.
        const mailOptions = {
            from: process.env.SENDER_EMAIL, // Sender address from environment variables.
            to: `${name} <${email}>`, // Recipient's name and email address.
            replyTo: process.env.REPLY_TO, // Sets the email address for recipient responses.
            subject: subject, // Subject line.
            text: message // Plaintext body.
        };

        console.log(mailOptions);


        // Send email and log the response.
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ status: 'success', message: 'Email sent successfully' });
    } catch (err) {
        // Handle errors and log them.
        console.error('Error sending email:', err);
        res.status(500).json({ status: 'error', message: 'Error sending email, please try again. : '+err });
    }
});


router.post('/send-email-attachement',upload.single('document'),async (req, res) => {
    try {
        let { name, subject, email, message } = req.body; // Destructure and retrieve data from request body.
        name = "contact@meydetour.com"
        subject = "App send mails"
        email = "meydetour@gmail.com"
        message = "Envoie d'email avec fichier"

        // Validate required fields.
        if (!name || !subject || !email || !message) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }
        const attachment = req.file.filename
        console.log(attachment)
        // Prepare the email message options.
        const messageToSend = {
            from: process.env.SENDER_EMAIL, // Sender address from environment variables.
            to: `${name} <${email}>`, // Recipient's name and email address.
            subject: subject, // Subject line.
            html: message ,
            attachment :attachment
        };



        // Send email and log the response.
        const info = await transporter.sendMail(messageToSend);
        console.log('Email sent:', info.response);
        res.status(200).json({ status: 'success', message: 'Email sent successfully' });
    } catch (err) {
        // Handle errors and log them.
        console.error('Error sending email:', err);
        res.status(500).json({ status: 'error', message: 'Error sending email, please try again. : '+err });
    }
});



router.post( "/login",   login );
router.post("/register", registerUser);

module.exports = router;
const multer = require('multer');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require("uuid");
const path = require("path");
const router = require("./book");
dotenv.config();

/*const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {

        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({storage: storage});*/

const upload = multer({ storage: multer.memoryStorage(

    ) });

//https://mailtrap.io/blog/expressjs-send-email/
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
        let {name, subject, email, message} = req.body; // Destructure and retrieve data from request body.
        name = "app@meydetour.com"
        subject = "App send mails"
        email = "meydetour@gmail.com"
        message = "Premier envoie d'email"

        // Validate required fields.
        if (!name || !subject || !email || !message) {
            return res.status(400).json({status: 'error', message: 'Missing required fields'});
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
        res.status(200).json({status: 'success', message: 'Email sent successfully'});
    } catch (err) {
        // Handle errors and log them.
        console.error('Error sending email:', err);
        res.status(500).json({status: 'error', message: 'Error sending email, please try again. : ' + err});
    }
});


router.post('/send-email-attachement', upload.single('document'), async (req, res) => {
    try {
        let {name, subject, email, message} = req.body; // Destructure and retrieve data from request body.
        name = "app@meydetour.com"
        subject = "App send mails"
        email = "meydetour@gmail.com"
        message = "Envoie d'email avec fichier et nom"

        // Validate required fields.
        if (!name || !subject || !email || !message) {
            return res.status(400).json({status: 'error', message: 'Missing required fields'});
        }
        const attachment = {
            filename:   uuidv4() + path.extname(req.file.originalname),
            content: req.file.buffer,
            type: req.file.mimetype
        }
        console.log(attachment)
        // Prepare the email message options.
        const messageToSend = {
            from: process.env.SENDER_EMAIL, // Sender address from environment variables.
            to: `${name} <${email}>`, // Recipient's name and email address.
            subject: subject, // Subject line.
            html: message,
            attachments: [attachment]
        };


        // Send email and log the response.
        const info = await transporter.sendMail(messageToSend);
        console.log('Email sent:', info.response);
        res.status(200).json({status: 'success', message: 'Email sent successfully'});
    } catch (err) {
        // Handle errors and log them.
        console.error('Error sending email:', err);
        res.status(500).json({status: 'error', message: 'Error sending email, please try again. : ' + err});
    }
});


module.exports = router;
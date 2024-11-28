const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const cors = require('cors');
const corsOptions = {
    origin: '*',  // Allows requests from all domains. Specify actual domain in production for security.
    optionsSuccessStatus: 200 // Ensure compatibility by setting OPTIONS success status to 200 OK.
};
const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;
const {  expressjwt: jwt } = require("express-jwt");

const bookRouter = require('./routes/book.js');
const bookshelfRouter = require('./routes/bookshelf.js');
const mailRouter = require('./routes/mail.js');
const userRouter = require('./routes/user.js');
const docRouter = require('./routes/documentation.js');

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const {verifyToken} = require("./controllers/tokenVerify");
const mongodUri = 'mongodb://localhost:27017/bookshelf';

//for database
mongoose.connect(mongodUri)
    .then(() => {
        console.log("connected to mongod");
    }).catch((err) => {
    console.log(err)
})

//for body data
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.static('public'));

/*
console.log(require('crypto').randomBytes(64).toString('hex'))
*/



//make all routes protected
app.use(
    jwt({
        secret: process.env.TOKEN_SECRET,
        algorithms: ["HS256"],
    }).unless({ path: ["/login", "/register","/public","/doc",'/send-email'] }),
);
app.use('/api', async (req, res, next) => {
    const hasValidToken = await verifyToken(req);
    if (!hasValidToken) {
        return res.status(403).json({ message: 'Invalid token' });
    }
    next(); // Si le token est valide, on passe à la route suivante
});

//for route
app.use("/", docRouter);
app.use("/", mailRouter);
app.use("/api", bookRouter);
app.use("/api", bookshelfRouter);
app.use("", userRouter);

//we cant see images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//customize error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'No authorization token was found or token is invalid :',err });
    } else {
        next(err);
    }
});

//return customize error
app.use((req, res, next) => {
    res.status(404).send({ message: 'No route found ! Read the doc please <3  Verify the method of your request' });
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
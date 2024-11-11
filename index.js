const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const {  expressjwt: jwt } = require("express-jwt");
const bookRouter = require('./routes/book.js');
const bookshelfRouter = require('./routes/bookshelf.js');
const userRouter = require('./routes/user.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
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

//make all routes protected
app.use(
    jwt({
        secret: "shhhhhhared-secret",
        algorithms: ["HS256"],
    }).unless({ path: ["/login", "/register"] }),
);

//for route
app.use("/", bookRouter);
app.use("/", bookshelfRouter);
app.use("/", userRouter);

//we cant see images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



//customize error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'No authorization token was found or token is invalid' });
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
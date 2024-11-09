const express = require('express');
const app = express();
const port = 3000
const imageRouter = require('./routes/image.js');
const bookRouter = require('./routes/book.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const mongodUri = 'mongodb://localhost:27017/bookshelf';


mongoose.connect(mongodUri)
    .then(( ) => {
        console.log("connected to mongod");
    }).catch((err) => {
    console.log(err)
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use("/",imageRouter);
app.use("/",bookRouter);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
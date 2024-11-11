const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const bookRouter = require('./routes/book.js');
const bookshelfRouter = require('./routes/bookshelf.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const mongodUri = 'mongodb://localhost:27017/bookshelf';


mongoose.connect(mongodUri)
    .then(() => {
        console.log("connected to mongod");
    }).catch((err) => {
    console.log(err)
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use("/", bookRouter);
app.use("/", bookshelfRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    res.status(404).send({ message: 'No route found ! Read the doc please <3 \n\n\n Verify the method of your request' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
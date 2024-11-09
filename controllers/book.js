const Book = require("../models/Book");

async function getBooks(req, res) {
    let books = await Book.find({})
    res.status(200).json(books);
}

async function newBook(req, res) {
    const {...data} = req.body;
    console.log("new book function")
    console.log(data)

}

module.exports = {getBooks, newBook};
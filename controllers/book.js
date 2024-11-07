const {find} = require("../models/book");
async function getBooks(req, res) {
    let books = await find({})
    res.status(200).json(books);
}

async function newBook(req, res) {

}
module.exports = getBooks;
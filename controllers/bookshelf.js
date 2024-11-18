const Bookshelf = require("../models/Bookshelf");
const Book = require("../models/Book");



async function getBookshelves(req, res) {
    const bookshelves = await Bookshelf.find({}).select('name').populate({
        path: 'books',
        select: 'title publishedYear description image author ine'
    })
    return res.status(200).json(bookshelves)
}

async function getBookshelf(req, res) {
    try {
        const {id} = req.params;

        const bookshelf = await Bookshelf.findById(id).select('name').lean();
        if (!bookshelf) {
            return res.status(404).send('No bookshelf found.');
        }

        return res.status(200).json(bookshelf);

    } catch (e) {
        return res.status(500).send('Error getting bookshelf: ' + e);
    }
}


async function newBookshelf(req, res) {
    try {
        const {name} = req.body;
        if (!name) return res.status(400).json({'message':'Please enter name.'});

        let bookshelfExist = await Bookshelf.findOne({name})
        if (bookshelfExist) return res.status(404).send('bookshelf name is already taken.');

        await Bookshelf.create(name)
        return res.status(201).json({"message": "ok"});
    } catch (e) {
        return res.status(500).json({'message' :'Error during creation of bookshelf .' + e});
    }
}


async function editBookshelf(req, res) {
    try {
        const {id} = req.params
        const bookshelf = await Bookshelf.findById(id)
        if (!bookshelf) return res.status(404).send('Bookshelf not found.');


        const {name} = req.body;
        if (!name) return res.status(400).send('Please enter name.');

        bookshelf.name = name;

        await bookshelf.save()
        return res.status(200).json({"message": "ok"});

    } catch (e) {
        return res.status(500).send('New bookshelf .' + e);
    }
}

async function removeBookshelf(req, res) {
    try {
        const {id} = req.params
        const bookshelf = await Bookshelf.findById(id)
        if (!bookshelf) return res.status(404).send('Bookshelf not found.');

        const booksAssociated = await Book.find({bookshelf: id})
        if (booksAssociated.length !== 0) return res.status(400).send('Bookshelf has many books');

        await bookshelf.deleteOne()
        return res.status(200).json({"message": "ok"});
    } catch (e) {
        return res.status(500).send('New bookshelf .' + e);
    }
}

async function addBookToBookshelf(req, res) {
    try {
        const {bookId, bookshelfId} = req.params
        const bookshelf = await Bookshelf.findById(bookshelfId)
        if (!bookshelf) return res.status(404).send('Bookshelf not found.');

        const book = await Book.findById(bookId)
        if (!book) return res.status(404).send('Book not found.');

        if (!book.bookshelves.includes(bookshelfId))  {
            bookshelf.books.push(bookId)
            await bookshelf.save()
            book.bookshelves.push(bookshelfId)
            await book.save()
            return res.status(200).json({"message": "ok"});
        }
        return res.status(200).json({"message": "Bookshelf already contains this book"});
    } catch (e) {
        return res.status(500).send('New bookshelf .' + e);
    }
}


module.exports = {getBookshelves, newBookshelf, getBookshelf, editBookshelf, removeBookshelf, addBookToBookshelf};
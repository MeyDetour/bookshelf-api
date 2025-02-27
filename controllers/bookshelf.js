const Bookshelf = require("../models/Bookshelf");
const Book = require("../models/Book");


async function getBookshelves(req, res) {
    const bookshelves = await Bookshelf.find({author: req.user.id}).select('name').populate({
        path: 'books',
        select: 'title publishedYear description image author ine'
    })
    return res.status(200).json(bookshelves)
}

async function getBookshelf(req, res) {
    try {
        const {id} = req.params;

        const bookshelf = await Bookshelf.findById(id).select('name').select('name').populate({
            path: 'books',
            select: 'title publishedYear description image author ine'
        });


        if (!bookshelf) {
            return res.status(404).send('No bookshelf found.');
        }
        if (bookshelf.author !== req.user.id) {
            return res.status(403).json({"message": "It's no your bookshelf"});
        }
        return res.status(200).json(bookshelf);

    } catch (e) {
        return res.status(500).send('Error getting bookshelf: ' + e);
    }
}


async function newBookshelf(req, res) {
    try {
        const {name} = req.body;
        if (!name) return res.status(400).json({'message': 'Please enter name.'});

        let bookshelfExist = await Bookshelf.findOne({name})
        if (bookshelfExist) return res.status(404).send('bookshelf name is already taken.');

        await Bookshelf.create({name: name, author: req.user.id})
        return res.status(201).json({"message": "ok"});
    } catch (e) {
        return res.status(500).json({'message': 'Error during creation of bookshelf .' + e});
    }
}


async function editBookshelf(req, res) {
    try {
        const {id} = req.params
        const bookshelf = await Bookshelf.findById(id)

        if (!bookshelf) return res.status(404).send('Bookshelf not found.');
        if (bookshelf.author !== req.user.id) {
            return res.status(401).json({"message": "It's no your bookshelf"});
        }

        const {name} = req.body;
        let bookshelfExist = await Bookshelf.findOne({name})
        if (bookshelfExist) return res.status(404).send('bookshelf name is already taken.');

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
        if (bookshelf.author !== req.user.id) {
            return res.status(403).json({"message": "It's no your bookshelf"});
        }
        const booksAssociated = await Book.find({bookshelf: id})
        if (booksAssociated.length !== 0) return res.status(400).send('Bookshelf has many books');
        for (const bookAssociated of booksAssociated) {
            if (book.bookshelves.includes(id)) {
                book.bookshelves = book.bookshelves.filter(id => id.toString() !== id);
                await book.save();

                bookshelf.books = bookshelf.books.filter(id => id.toString() !== bookAssociated.id);
                await bookshelf.save();

                return res.status(200).send('Bookshelf removed from book and book removed from bookshelf successfully.');
            }
        }

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
        if (bookshelf.author !== req.user.id) {
            return res.status(403).json({"message": "It's no your bookshelf"});
        }
        const book = await Book.findById(bookId)
        if (!book) return res.status(404).send('Book not found.');
        if (book.author !== req.user.id) {
            return res.status(403).json({"message": "It's not your book"});
        }
        if (!book.bookshelves.includes(bookshelfId)) {
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

async function sortBookshelves(req, res) {
    try {
        const {type} = req.params;
        let bookshelves = [];
        if (!type) return res.status(404).send('type not found.');
        switch (type) {
            case 'name-asc':
                bookshelves = await Bookshelf.find({author: req.user.id}).sort({name: 1})
                break;
            case 'name-dsc':
                bookshelves = await Bookshelf.find({author: req.user.id}).sort({name: -1})
                break;
            case 'books-asc':
                // https://mongoosejs.com/docs/api/aggregate.html#Aggregate()
                bookshelves = await Bookshelf.aggregate(
                    [
                        {$match: {author: req.user.id}},
                        {$project: {bookNumber: {$size: "$books"}}},
                        {$sort: {bookNumber: 1}}
                    ]
                )
                break;
            case 'books-dsc':
                bookshelves = await Bookshelf.aggregate(
                    [

                        {$match: {author: req.user.id}},
                        {
                            $project: {
                                bookNumber: {$size: "$books"}
                            }
                        },
                        {$sort: {bookNumber: -1}}
                    ]
                )
                break;
            default :
                bookshelves = await Bookshelf.find({})

        }


        return res.status(200).json(bookshelves);
    } catch (e) {
        res.status(500).send('Error remove book. :' + e);
    }
}

module.exports = {
    getBookshelves,
    newBookshelf,
    getBookshelf,
    editBookshelf,
    removeBookshelf,
    addBookToBookshelf,
    sortBookshelves
};

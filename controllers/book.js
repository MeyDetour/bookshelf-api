const Book = require("../models/Book");
const path = require("path");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const filename = file.originalname.replace(/\s/g, '');

        cb(null, filename);
    }
});
const upload = multer({storage: storage});


async function uploadImageToBook(req, res) {
    try {

        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(500).send('Error uploading file.');
            }
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            const {id} = req.params
            const book = await Book.findById(id)

            if (!book) return res.status(404).send('Book not found.');

            const filename = req.file.filename.replace(/\s/g, '');
            console.log(filename);
            book.image = `/uploads/${encodeURIComponent(req.file.filename)}`;
            await book.save();
            console.log(`Image uploaded: ${filename}`);

            res.send('File uploaded successfully.');
        });
    } catch (e) {
        res.status(500).send('Error upload image to book. :' + e);
    }
}

async function getBooks(req, res) {
    console.log("get all books")
    let books = await Book.find({}).select('title image description publishedYear author ine ').populate({
        path: 'bookshelves',
        select:"name"
    })
    res.status(200).json(books);
}

async function newBook(req, res) {
    try {
        console.log("create book")
        const {...data} = req.body;

        if (!data.title) return res.status(400).send('Please enter name');
        let book = await Book.create({...data})

        res.status(201).json({"message": "ok"});
    } catch (e) {
        res.status(500).send('Error creating book. :' + e);
    }
}


async function editBook(req, res) {
    try {

        const {id} = req.params
        const book = await Book.findById(id)
        const {title, description, publishedYear,ine,author} = req.body

        if (!book) return res.status(404).send('Book not found.');

        if (title) book.title = title
        if (description) book.description = description
        if (publishedYear) book.publishedYear = publishedYear
        if (author) book.author = author
        if (ine) book.ine = ine

        await book.save();

        res.status(200).json({"message": "ok"});
    } catch (e) {
        res.status(500).send('Error updating book. :' + e);
    }
}

async function removeImage(req, res) {
    try {

        const {id} = req.params
        const book = await Book.findById(id)

        if (!book) return res.status(404).send('Book not found.');
        book.image = null
        await book.save()
        res.status(200).json({"message": "ok"});
    } catch (e) {
        res.status(500).send('Error remove book-s image. :' + e);
    }

}

async function removeBook(req, res) {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if (!book) return res.status(404).send('Book not found.');

        await book.deleteOne()

        res.status(200).json({"message": "ok"});
    } catch (e) {
        res.status(500).send('Error remove book. :' + e);
    }
}
//recherche de ligne
//Scna de qrcode
module.exports = {getBooks, newBook, uploadImageToBook, editBook,removeBook,removeImage};
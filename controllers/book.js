const Book = require("../models/Book");
const path = require("path");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {v4: uuidv4} = require('uuid'); // Importer UUID
const fs = require('fs');
const res = require("express/lib/response");
dotenv.config();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {

        const uniqueName = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only PNG, JPEG, and JPG are allowed.'));
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter, // Apply the file filter
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5 MB
});


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

            if (book.image) {
                let removal = removeImageFromServer(book)
                if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + e);

            }


            book.image = `/uploads/${encodeURIComponent(req.file.filename)}`;
            await book.save();

            res.status(201).json({"message": "ok"});
        });
    } catch (e) {
        res.status(500).send('Error upload image to book. :' + e);
    }
}

async function getBooks(req, res) {
    try {

        console.log("get all books")
        let books = await Book.find({}).select('title image description publishedYear author ine ').populate({
            path: 'bookshelves',
            select: "name"
        })
        res.status(200).json(books);
    } catch (err) {
        return res.sendStatus(400); // Token invalide ou expiré
    }
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
        const {title, description, publishedYear, ine, author} = req.body

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
        if (book.image == null) return res.status(200).json({"message": "ok"});

        let removal = removeImageFromServer(book)
        if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + e);


        return res.status(200).json({"message": "ok"});


    } catch (e) {
        res.status(500).send('Error remove books image. :' + e);
    }

}

async function removeBook(req, res) {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if (!book) return res.status(404).send('Book not found.');
        if (book.image) {
            let removal = removeImageFromServer(book)
            if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + e);
        }

        await book.deleteOne()

        res.status(200).json({"message": "ok"});
    } catch (e) {
        res.status(500).send('Error remove book. :' + e);
    }
}

async function searchBook(req, res) {
    try {
        const {searchTerm} = req.body;
        //https://www.geeksforgeeks.org/how-to-do-a-full-text-search-in-mongodb-using-mongoose/
        const books = await Book.find({$text: {$search: searchTerm}})
        res.status(200).json(books);
    } catch (e) {
        res.status(500).send('Error remove book. :' + e);
    }
}

function removeImageFromServer(book) {
    const imagePath = path.join(__dirname + '/..' + book.image);

    fs.unlink(imagePath, async (err) => {
        if (err) {
            return err;
        }

        book.image = null;
        await book.save();
        return null;
    });
    return null
}

//recherche de ligne
//Scna de qrcode
module.exports = {getBooks, newBook, uploadImageToBook, editBook, removeBook, removeImage, searchBook};
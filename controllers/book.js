const Book = require("../models/Book");
const path = require("path");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {v4: uuidv4} = require('uuid'); // Importer UUID
const fs = require('fs');
const res = require("express/lib/response");
const Bookshelf = require("../models/Bookshelf");
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
    limits: {fileSize: 5 * 1024 * 1024} // Limit file size to 5 MB
});


const fileFilterPdf = (req, file, cb) => {
    // Allowed file types
    const allowedMimeTypes = ['application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only PDF are allowed.'));
    }
};
const uploadpdf = multer({
    storage: storage,
    fileFilter: fileFilterPdf, // Apply the file filter
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
             if (!bookshelf.author.equals(req.user.id)) {
                return res.status(403).json({"message": "It's not your book"});
            }
            if (book.image) {
                let removal = await removeImageFromServer(book)
                if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + removal);

            }


            book.image = `/uploads/${encodeURIComponent(req.file.filename)}`;
            await book.save();

           return  res.status(201).json({"message": "ok"});
        });
    } catch (e) {
        res.status(500).send('Error upload image to book. :' + e);
    }
}

async function uploadPdfToBook(req, res) {
    try {

        uploadpdf.single('pdf')(req, res, async (err) => {
            if (err) {
                return res.status(500).send('Error uploading file.' + err);
            }
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            const {id} = req.params
            const book = await Book.findById(id)
            if (!book) return res.status(404).send('Book not found.');
             if (!bookshelf.author.equals(req.user.id)) {
                return res.status(403).json({"message": "It's nott your book"});
            }
            if (book.pdf) {
                let removal =  await removePdfFromServer(book)
                if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + removal);

            }


            book.pdf = `/uploads/${encodeURIComponent(req.file.filename)}`;
            await book.save();

         return    res.status(201).json({"message": "ok"});
        });
    } catch (e) {
    return     res.status(500).send('Error upload pdf to book. :' + e);
    }
}

async function getBooks(req, res) {
    try {

        let books = await Book.find({author:req.user.id}).select('title image pdf description publishedYear author ine ').populate({
            path: 'bookshelves',
            select: "name"
        })
        res.status(200).json(books);
    } catch (err) {
        return res.sendStatus(400); // Token invalide ou expiré
    }
}

async function getAllBooks(req, res) {
    try {

        let books = await Book.find({}).select('title image pdf description publishedYear author ine ').populate({
            path: 'bookshelves',
            select: "name"
        })
        res.status(200).json(books);
    } catch (err) {
        return res.sendStatus(400); // Token invalide ou expiré
    }
}

async function getBook(req, res) {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if (!book) return res.status(404).send('Book not found.');
         if (!bookshelf.author.equals(req.user.id)) {
            return res.status(403).json({"message": "It's not your book"});
        }
       return  res.status(200).json(book);
    } catch (err) {
        console.log(err)
        return res.sendStatus(400).send('Error get book. :' + err); // Token invalide ou expiré
    }
}

async function newBook(req, res) {
    try {
        console.log("create book")
        const {bookshelves,...data} = req.body;

        if (!data.title) return res.status(400).json({message:'Please enter name'});
        data.title = String(data.title).charAt(0).toUpperCase() + String(data.title).slice(1)
        console.log('user :',req.user)
        console.log(req.user.id)
        data.author = req.user.id;
        console.log("Data to create:", data);
        if (Array.isArray(bookshelves) && bookshelves.length > 0) {
            for (let bookshelfId of bookshelves) {
                const bookshelf = await Bookshelf.findOne(bookshelfId);
                if (bookshelf) {
                    bookshelf.books.push(data);
                    await bookshelf.save();
                } else {
                    console.error(`Bookshelf not found: ${bookshelfId}`);
                }
            }
        }

        let book = await Book.create({...data}).catch((err) => {
            console.error("MongoDB Error:", err);
            throw new Error(err);
        });

        res.status(201).json(book);
    } catch (e) {
        res.status(500).send('Error creating book. :' + e);
    }
}


async function editBook(req, res) {
    try {

        const {id} = req.params
        const book = await Book.findById(id)
        let {title, description, publishedYear, ine, author,bookshelves} = req.body

        if (!book) return res.status(404).send('Book not found.');
         if (!bookshelf.author.equals(req.user.id)) {
            return res.status(403).json({"message": "It's not your book"});
        }
        if (title) {
            title = String(title).charAt(0).toUpperCase() + String(title).slice(1)
            book.title = title
        }
        if (description) book.description = description
        if (publishedYear) book.publishedYear = publishedYear
        if (author) book.author = author
        if (ine) book.ine = ine

        if (Array.isArray(bookshelves) && bookshelves.length > 0) {
            for (let bookshelfId of bookshelves) {
                const bookshelf = await Bookshelf.findById(bookshelfId);
                if (bookshelf) {
                    bookshelf.books.push(data);
                    await bookshelf.save();
                } else {
                    console.warn(`Bookshelf not found: ${bookshelfId}`);
                }
            }
        }

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
         if (!bookshelf.author.equals(req.user.id)) {
            return res.status(403).json({"message": "It's not your book"});
        }
        if (book.image == null) return res.status(200).json({"message": "ok"});

        let removal = await removeImageFromServer(book)
        if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + removal);


        return res.status(200).json({"message": "ok"});


    } catch (e) {
        res.status(500).send('Error remove books image. :' + e);
    }

}
async function removePdf(req, res) {
    try {

        const {id} = req.params
        const book = await Book.findById(id)

        if (!book) return res.status(404).send('Book not found.');
         if (!bookshelf.author.equals(req.user.id)) {
            return res.status(403).json({"message": "It's not your book"});
        }
        if (book.pdf == null) return res.status(200).json({"message": "ok"});

        let removal = await removePdfFromServer(book)
        if (removal != null) return res.status(500).send("Error during removal of book's pdf on server. :" + removal);


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
         if (!bookshelf.author.equals(req.user.id)) {
            return res.status(403).json({"message": "It's not your book"});
        }
        if (book.image) {
            let removal =  await removeImageFromServer(book)
            if (removal != null) return res.status(500).send("Error during removal of book's image on server. :" + e);
        }  if (book.pdf) {
            let removal = await removePdfFromServer(book)
            if (removal != null) return res.status(500).send("Error during removal of book's pdgf on server. :" + e);
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
        const books = await Book.find({$text: {$search: searchTerm},author:req.user.id})
        res.status(200).json(books);
    } catch (e) {
        res.status(500).send('Error remove book. :' + e);
    }
}

async function removeImageFromServer(book) {
    const imagePath = path.join(__dirname, '..', book.image);
    await removeFile(imagePath);
    book.image = null;
    await book.save();
}

async function removePdfFromServer(book) {
    const pdfPath = path.join(__dirname, '..', book.pdf);
    await removeFile(pdfPath);
    book.pdf = null;
    await book.save();
}
async function removeFile(filePath) {
    try {
        await fs.promises.access(filePath); // Vérifie si le fichier existe
        await fs.promises.unlink(filePath); // Supprime le fichier
        console.log(`File at ${filePath} deleted successfully`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`File at ${filePath} does not exist.`);
        } else {
            console.error(`Error deleting file at ${filePath}:`, err);
        }
    }
}

async function sortBooks(req, res) {
    try {
        const {type} = req.params;
        let books = [];
        if (!type) return res.status(404).send('type not found.');
        switch (type) {
            case 'title-asc':
                books = await Book.find({author:req.user.id}).sort({title: 1})
                break;
            case 'title-dsc':
                books = await Book.find({author:req.user.id}).sort({title: -1})
                break;

            default :
                books = await Book.find({author:req.user.id})

        }


        return res.status(200).json(books);
    } catch (e) {
        res.status(500).send('Error remove book. :' + e);
    }
}


//recherche de ligne
//Scna de qrcode
module.exports = {
    getBooks,
    newBook,
    uploadImageToBook,
    editBook,
    getBook,
    removeBook,
    removeImage,
    searchBook,
    sortBooks,
    uploadPdfToBook,
    removePdf,
    getAllBooks
};

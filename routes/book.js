const {Router} = require('express');
const {getBooks,newBook,uploadImageToBook,editBook,removeImage,removeBook, searchBook,sortBooks, getBook} = require("../controllers/book");
const router = Router();

router.get('/books',  getBooks);
router.get('/book/get/:id',  getBook);
router.get('/books/sort/:type',  sortBooks);
router.post('/book/new',  newBook)
router.get('/book/search',  searchBook)
router.patch('/upload/image/to/book/:id',  uploadImageToBook)
router.put('/book/edit/:id',  editBook)
router.delete('/book/remove/:id',  removeBook)
router.delete('/book/remove/image/:id',  removeImage)

module.exports = router;

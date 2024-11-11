const {Router}=require('express');
const router = Router();
const {getBookshelves,newBookshelf,getBookshelf,editBookshelf,removeBookshelf,addBookToBookshelf}= require('../controllers/bookshelf');

router.get('/bookshelves',getBookshelves)
router.get('/bookshelves/get/:id',getBookshelf)
router.post('/bookshelves/new',newBookshelf)
router.put('/bookshelf/edit/:id',editBookshelf)
router.delete('/bookshelves/remove/:id',removeBookshelf)
router.patch('/bookshelf/:bookshelfId/add/book/:bookId',addBookToBookshelf)


module.exports = router;
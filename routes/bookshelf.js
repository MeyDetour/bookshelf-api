const {Router}=require('express');
const router = Router();
const {getBookshelves,newBookshelf,getBookshelf,editBookshelf,removeBookshelf,addBookToBookshelf, sortBookshelf}= require('../controllers/bookshelf');

router.get('/bookshelves',getBookshelves)
router.get('/bookshelf/get/:id',getBookshelf)
router.post('/bookshelf/new',newBookshelf)
router.put('/bookshelf/edit/:id',editBookshelf)
router.delete('/bookshelf/remove/:id',removeBookshelf)
router.patch('/bookshelf/:bookshelfId/add/book/:bookId',addBookToBookshelf)
router.get('/bookshelves/sort/:type',sortBookshelf)


module.exports = router;
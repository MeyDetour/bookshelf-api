const {Router}=require('express');
const router = Router();
const {getBookshelves,newBookshelf,getBookshelf,editBookshelf,removeBookshelf}= require('../controllers/bookshelf');

router.get('/bookshelves',getBookshelves)
router.get('/bookshelves/get/:id',getBookshelf)
router.post('/bookshelves/new',newBookshelf)
router.put('/bookshelves/edit/:id',editBookshelf)
router.delete('/bookshelves/remove/:id',removeBookshelf)


module.exports = router;
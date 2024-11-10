const {Router} = require('express');
const {getBooks,newBook,uploadImageToBook,editBook,removeImage,removeBook} = require("../controllers/book");
const router = Router();

router.get('/',  getBooks);
router.post('/book/new',  newBook)
router.post('/uploadimage/to/:id',  uploadImageToBook)
router.put('/book/edit/:id',  editBook)
router.delete('/book/remove/:id',  removeBook)
router.delete('/book/remove/image/:id',  removeImage)

module.exports = router;

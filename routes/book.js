const {Router} = require('express');
const {getBooks,newBook} = require("../controllers/book");
const router = Router();

router.get('/',  getBooks);
router.post('/book/new',  newBook);


module.exports = router;
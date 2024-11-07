const {Router} = require('express');
const {getBooks,getBooks} = require("../controllers/book");
const router = Router();

router.get('/',  getBooks);
router.post('/book/new',  newBook);


module.exports = router;
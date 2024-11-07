const {Router} = require('express');
const uploadImage = require("../controllers/image");
const router = Router();

router.post('/uploadimage',  uploadImage);


module.exports = router;
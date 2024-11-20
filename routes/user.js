const {expressjwt: jwt} = require("express-jwt");
const {Router} = require("express");
const router = Router();
const {registerUser, login} = require('../controllers/user')




router.post( "/login",   login );
router.post("/register", registerUser);

module.exports = router;
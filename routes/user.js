const {expressjwt: jwt} = require("express-jwt");
const {Router} = require("express");
const router = Router();
const {registerUser, login,deleteUser, getCurrentUser} = require('../controllers/user')




router.post( "/login",   login );
router.post("/register", registerUser);
router.delete("/api/delete", deleteUser);
router.get("/api/get/user", getCurrentUser);

module.exports = router;
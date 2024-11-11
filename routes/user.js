const {  expressjwt: jwt } = require("express-jwt");
const {Router} = require("express");
const router = Router();

router.get(
    "/protected",
    jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
    function (req, res) {

        console.log("aa")
        if (!req.auth.admin) return res.status(404).json({'message':"no token"});
        console.log("authenticated")
     return    res.status(200);
    }
);

module.exports = router;
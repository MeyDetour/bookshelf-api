const jwt = require("jsonwebtoken");


async function verifyToken(req) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    const user = await jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = user;
    if (user){
        return true
    }
    return false
}

module.exports = {verifyToken}
const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const token = req.cookies.access_token

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json("token is not valid")
            } else {
                req.token = token
                req.user = user;
                next();
            }
        })
    } else {
        res.status(401).json("you are not authenticated")
    }
}

module.exports = verify;
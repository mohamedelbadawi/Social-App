const jwt = require('jsonwebtoken');
module.exports = class AuthMiddleware {

    static async ensureToken(req, res, next) {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }
        else {
            res.json({ msg: "unauth" }, 401);
        }

    }

    static async verifyToken(req, res, next) {
        jwt.verify(req.token, process.env.JWT_SECRET_KEY, function (err, data) {
            if (err) {
                res.sendStatus(403);
            }
            else
                req.data=data;
                next();
        });
    }
}
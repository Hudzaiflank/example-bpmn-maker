const jwt = require("jsonwebtoken");
const config = require("./environment-config");
config.loadEnvironmentVariables();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { UnauthorizedError, UnauthenticatedError, BadRequestError, NotFoundError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateToken = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
        if (!token) {
            throw new UnauthorizedError("Authorization Invalid");
        }
        const data = jwt.verify(token, SECRET_KEY);
        req.user = data;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticateToken,
};

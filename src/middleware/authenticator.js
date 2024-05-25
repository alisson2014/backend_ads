const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if(!authorization) {
            throw new Error();
        }
        
        const token = authorization.replace('Bearer', '').trim();
        const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
        req.user = tokenVerify;
        next();
    } catch (error) {
        return res
           .status(StatusCodes.UNAUTHORIZED)
           .json({ error: ReasonPhrases.UNAUTHORIZED });
    }
};

module.exports = authenticator;
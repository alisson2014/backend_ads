const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ error: ReasonPhrases.UNAUTHORIZED });
    }

    try {
        const tokenVerify = jwt.verify(authorization, process.env.SECRET_KEY);
        req.user = tokenVerify;
        next();
    } catch (error) {
        return res
           .status(StatusCodes.INTERNAL_SERVER_ERROR)
           .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

module.exports = authenticator;
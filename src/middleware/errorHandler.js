const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 
  
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

module.exports = errorHandler;
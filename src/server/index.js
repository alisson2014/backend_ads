const express = require("express");
const { contactsRouter, usersRouter } = require("./routes");
const server = express();

server.use(express.json());
server.use((req, res, next) => {
    console.info(req.method, req.url, req.body);
    next();
});
server.use("/v1", usersRouter);
server.use("/v1", contactsRouter);

module.exports = server;
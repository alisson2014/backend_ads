const express = require("express");
const { contactsRouter } = require("./routes");
const server = express();

server.use(express.json());
server.use("/v1", contactsRouter);

module.exports = server;
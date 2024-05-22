const { Router } = require("express");
const { createUser, login } = require("../../../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/register", createUser);
usersRouter.post("/login", login);

module.exports = usersRouter;
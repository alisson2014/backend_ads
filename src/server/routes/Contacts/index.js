const { Router } = require("express");
const { 
    createContact, 
    getAllContacts, 
    deleteContact, 
    updateContact 
} = require("../../../controllers/contactsController");
const authenticator = require("../../../middleware/authenticator");
const contactsRouter = Router();

contactsRouter.use(authenticator);
contactsRouter.get("/contato", getAllContacts);
contactsRouter.post("/contato", createContact);
contactsRouter.delete("/contato/:id", deleteContact);
contactsRouter.put("/contato/:id", updateContact);

module.exports = contactsRouter;